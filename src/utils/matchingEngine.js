// Matching algorithm for matching customer items & criteria with storage listings

export function calculateVolume(lengthCm, widthCm, heightCm) {
  if (!lengthCm || !widthCm || !heightCm) return 0;
  return Number(((lengthCm * widthCm * heightCm) / 1000000).toFixed(2));
}

export function calculateArea(lengthCm, widthCm) {
  if (!lengthCm || !widthCm) return 0;
  return Number(((lengthCm * widthCm) / 10000).toFixed(2));
}

export function evaluateListingMatch(listing, item, filters = {}) {
  const matchReasons = [];
  const rejectionReasons = [];
  let isEligible = true;

  // 1. Evaluate Item Criteria (if item data provided)
  if (item && item.weightKg > 0) {
    // Weight check
    if (listing.maxWeight && item.weightKg > listing.maxWeight) {
      isEligible = false;
      rejectionReasons.push(`Əşyanın çəkisi (${item.weightKg} kq) anbarın maksimal yük həddini (${listing.maxWeight} kq) aşır.`);
    } else {
      matchReasons.push(`Çəki uyğundur: ${item.weightKg} kq (Maksimum ${listing.maxWeight} kq icazə verilir)`);
    }

    // Volume & Area check
    const itemVol = item.volumeM3 || calculateVolume(item.dimensionsCm?.length, item.dimensionsCm?.width, item.dimensionsCm?.height);
    if (listing.availableVolume && itemVol > listing.availableVolume) {
      isEligible = false;
      rejectionReasons.push(`Əşyanın həcmi (${itemVol} m³) boş qalan saxlanc həcmindən (${listing.availableVolume} m³) böyükdür.`);
    } else if (itemVol > 0) {
      matchReasons.push(`Həcm kifayətdir: ${itemVol} m³ tələbə qarşı ${listing.availableVolume} m³ mövcuddur`);
    }

    // Door dimensions check (width & height in cm)
    if (item.dimensionsCm && listing.doorDimensions) {
      const { width, height } = item.dimensionsCm;
      const doorW = listing.doorDimensions.width;
      const doorH = listing.doorDimensions.height;

      // Smallest cross-section check
      const dims = [width, height, item.dimensionsCm.length].sort((a, b) => a - b);
      if (dims[0] > doorW || dims[1] > doorH) {
        isEligible = false;
        rejectionReasons.push(`Əşyanın qabaritləri anbar qapısının giriş ölçülərinə (${doorW}x${doorH} sm) uyğun gəlmir.`);
      } else {
        matchReasons.push(`Qapı keçid ölçüləri (${doorW}x${doorH} sm) rahat giriş üçün tam yetərlidir`);
      }
    }

    // Fragile classification check
    if (item.isFragile) {
      if (!listing.allowFragile) {
        isEligible = false;
        rejectionReasons.push(`Bu məkanda kövrək və həssas əşyaların saxlanmasına icazə verilmir.`);
      } else {
        matchReasons.push(`Həssas və kövrək əşyalar qəbul edilir (${listing.fragileHandlingEquipment || 'Qoruyucu təchizat var'})`);
      }
    }

    // Climate requirement check
    // item.requiredClimate: 'none' | 'ordinary' | 'heated' | 'cooled' | 'heated_and_cooled'
    const climate = listing.climate?.type || 'ordinary';
    if (item.requiredClimate && item.requiredClimate !== 'none') {
      if (item.requiredClimate === 'heated' && !['heated', 'heated_and_cooled'].includes(climate)) {
        isEligible = false;
        rejectionReasons.push(`Qızdırılan mühit tələb olunur, lakin bu məkanda istilik nəzarəti yoxdur.`);
      } else if (item.requiredClimate === 'cooled' && !['cooled', 'heated_and_cooled'].includes(climate)) {
        isEligible = false;
        rejectionReasons.push(`Soyudulan mühit tələb olunur, lakin bu məkanda soyutma/kondisioner yoxdur.`);
      } else if (item.requiredClimate === 'heated_and_cooled' && climate !== 'heated_and_cooled') {
        isEligible = false;
        rejectionReasons.push(`Həm istilik, həm də soyutma (iqlim nəzarəti) tələb edilir.`);
      } else {
        matchReasons.push(`İqlim şəraiti tələbi tam ödəyir: ${listing.climate.label}`);
      }
    }
  }

  // 2. Evaluate Search Filters (if active)
  if (filters.city && filters.city !== "Bütün şəhərlər") {
    if (listing.city.toLowerCase() !== filters.city.toLowerCase()) {
      isEligible = false;
      rejectionReasons.push(`Şəhər uyğun gəlmir (${listing.city} ≠ ${filters.city})`);
    } else {
      matchReasons.push(`Məkan uyğunluğu: ${listing.city}`);
    }
  }

  if (filters.district && filters.district !== "Bütün rayonlar") {
    if (listing.district && !listing.district.toLowerCase().includes(filters.district.toLowerCase())) {
      isEligible = false;
      rejectionReasons.push(`Rayon uyğun gəlmir: ${listing.district}`);
    }
  }

  if (filters.storageType && filters.storageType !== "all") {
    if (listing.storageType !== filters.storageType) {
      isEligible = false;
      rejectionReasons.push(`Saxlanc növü uyğun deyil`);
    }
  }

  if (filters.maxPrice && listing.pricePerDay > Number(filters.maxPrice)) {
    isEligible = false;
    rejectionReasons.push(`Günlük qiymət (${listing.pricePerDay} ₼) büdcənizdən (${filters.maxPrice} ₼) yüksəkdir.`);
  }

  if (filters.durationDays) {
    const days = Number(filters.durationDays);
    if (days < listing.minDurationDays) {
      isEligible = false;
      rejectionReasons.push(`Minimum icarə müddəti ${listing.minDurationDays} gündür (seçilən: ${days} gün).`);
    }
    if (listing.maxDurationDays && days > listing.maxDurationDays) {
      isEligible = false;
      rejectionReasons.push(`Maksimum icarə müddəti ${listing.maxDurationDays} gündür.`);
    }
  }

  if (filters.onlyFragileSuitable && !listing.allowFragile) {
    isEligible = false;
    rejectionReasons.push(`Yalnız kövrək əşyalar qəbul edən məkanlar axtarılır.`);
  }

  if (filters.climateType && filters.climateType !== "all") {
    const lClimate = listing.climate?.type || 'ordinary';
    if (filters.climateType === 'climate_controlled' && !['heated', 'cooled', 'heated_and_cooled'].includes(lClimate)) {
      isEligible = false;
      rejectionReasons.push(`İqlim nəzarətli məkan tələb olunur.`);
    }
  }

  // Calculate Match Score percentage (0 to 100)
  let score = 70;
  if (isEligible) {
    if (listing.featured) score += 10;
    if (listing.rating >= 4.8) score += 10;
    if (listing.climate?.humidityControl) score += 5;
    if (matchReasons.length >= 3) score += 5;
  } else {
    score = 0;
  }

  return {
    isEligible,
    matchScore: Math.min(score, 100),
    matchReasons,
    rejectionReasons
  };
}

// Generate unique 6-character uppercase alphanumeric code using A-Z and 0-9
export function generateBookingCode(existingCodes = []) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude easily confused chars (I, O, 1, 0)
  let code = '';
  let attempts = 0;

  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    attempts++;
  } while (existingCodes.includes(code) && attempts < 100);

  return code;
}
