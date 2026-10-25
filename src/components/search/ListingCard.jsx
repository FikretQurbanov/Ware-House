import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, Star, ShieldCheck, Thermometer, Box, Scale, 
  CheckCircle2, XCircle, ArrowRight 
} from 'lucide-react';
import { evaluateListingMatch } from '../../utils/matchingEngine';

export default function ListingCard({ listing, customerItem, searchFilters, showMatchDetails = false }) {
  const { navigateTo } = useApp();

  // Evaluate matching with customer item if available
  const matchResult = evaluateListingMatch(listing, customerItem, searchFilters);

  const storageTypeLabels = {
    saxlanc_otagi: "Fərdi Otaq / Boks",
    qaraj: "Qaraj Sahəsi",
    anbar: "Logistika Anbarı",
    konteyner: "Dəniz Konteyneri"
  };

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-lg group ${
      showMatchDetails && !matchResult.isEligible
        ? 'opacity-70 border-rose-300 dark:border-rose-900/50 bg-rose-50/10'
        : 'border-slate-200/90 dark:border-slate-700/80 hover:-translate-y-1'
    }`}>
      {/* Image & Badges Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={listing.images[0] || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Type badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
            {storageTypeLabels[listing.storageType] || listing.storageType}
          </span>
          {listing.featured && (
            <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-1 rounded-lg">
              Tövsiyə olunan
            </span>
          )}
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-slate-100 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{listing.rating.toFixed(1)}</span>
          <span className="text-slate-400 text-[10px]">({listing.reviewCount})</span>
        </div>

        {/* Price tag over image bottom */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-xs text-slate-500 dark:text-slate-400">Günlük tarif</div>
          <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 leading-tight">
            {listing.pricePerDay.toFixed(2)} ₼ <span className="text-xs font-normal text-slate-500">/ gün</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            <span className="truncate">{listing.city}, {listing.district}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('listing-details', { listingId: listing.id })}
            className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {listing.title}
          </h3>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">Boş Sahə</span>
              <span className="font-bold flex items-center gap-1">
                <Box className="w-3 h-3 text-blue-500" />
                {listing.availableArea} m²
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">Boş Həcm</span>
              <span className="font-bold">
                {listing.availableVolume} m³
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">Maks Yük</span>
              <span className="font-bold flex items-center gap-1">
                <Scale className="w-3 h-3 text-slate-400" />
                {listing.maxWeight} kq
              </span>
            </div>
          </div>

          {/* Climate & Security tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50">
              <Thermometer className="w-3 h-3 text-blue-500" />
              {listing.climate?.label ? listing.climate.label.split('(')[0] : 'Standart'}
            </span>
            {listing.allowFragile && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Kövrək əşyaya uyğun
              </span>
            )}
          </div>

          {/* Matching Engine Explanation Chips (if search context) */}
          {showMatchDetails && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Uyğunluq göstəricisi:</span>
                {matchResult.isEligible ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    %{matchResult.matchScore} Tam Uyğundur
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    Uyğun Deyil
                  </span>
                )}
              </div>

              {matchResult.isEligible ? (
                <div className="space-y-1">
                  {matchResult.matchReasons.slice(0, 2).map((r, i) => (
                    <div key={i} className="text-[11px] text-emerald-700 dark:text-emerald-300 flex items-start gap-1">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {matchResult.rejectionReasons.slice(0, 2).map((r, i) => (
                    <div key={i} className="text-[11px] text-rose-700 dark:text-rose-300 flex items-start gap-1">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Action Button */}
        <div className="pt-2">
          <button
            onClick={() => navigateTo('listing-details', { listingId: listing.id })}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              showMatchDetails && !matchResult.isEligible
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
            }`}
          >
            <span>Ətraflı Bax və İcarələ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
