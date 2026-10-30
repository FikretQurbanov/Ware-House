import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, ArrowLeft, ArrowRight, Truck, User, Calendar, 
  ShieldCheck, FileText, CreditCard, Lock, AlertCircle, Info, MapPin 
} from 'lucide-react';

export default function BookingWizard() {
  const { 
    selectedListingId, 
    listings, 
    customerItem, 
    setCustomerItem,
    currentUser, 
    createBooking, 
    navigateTo 
  } = useApp();

  const listing = listings.find(l => l.id === selectedListingId) || listings[0];

  // Wizard state: current active step (from 1 to 8)
  // Step 1: Item Details Review
  // Step 2: Storage Space Confirmation
  // Step 3: Dates & Duration
  // Step 4: Delivery Method
  // Step 5: Price Breakdown Review
  // Step 6: Simulated Contract Agreement
  // Step 7: Demo Payment / Confirmation
  // Step 8: Success (redirected to Receipt)
  const [currentStep, setCurrentStep] = useState(3); // Start on Step 3 (dates/duration) since item & listing already selected, but user can freely step back to 1 and 2!

  // Booking Form State
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [durationDays, setDurationDays] = useState(30);

  // Delivery state
  const [deliveryMethod, setDeliveryMethod] = useState('courier'); // 'courier' | 'personal'
  const [courierAddress, setCourierAddress] = useState("Bakı şəhəri, Nəsimi rayonu, Səməd Vurğun küç. 45");
  const [courierSlot, setCourierSlot] = useState("14:00 - 18:00");

  // Optional insurance add-on
  const [includeInsurance, setIncludeInsurance] = useState(true);

  // Simulated Contract Agreement checkbox
  const [contractAgreed, setContractAgreed] = useState(true);

  // End date calculation
  const endDate = useMemo(() => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + Number(durationDays));
    return d.toISOString().split('T')[0];
  }, [startDate, durationDays]);

  // Dynamic Pricing Calculation
  const pricing = useMemo(() => {
    const dailyRate = listing ? listing.pricePerDay : 8.5;
    const storageFee = Number((dailyRate * Number(durationDays)).toFixed(2));
    const courierFee = deliveryMethod === 'courier' ? 25.00 : 0.00;
    const serviceFee = Number((storageFee * 0.05).toFixed(2)); // 5% platform fee
    const insuranceFee = includeInsurance ? (durationDays > 30 ? 15.00 : 10.00) : 0.00;
    const totalAmount = Number((storageFee + courierFee + serviceFee + insuranceFee).toFixed(2));

    return {
      dailyRate,
      storageFee,
      courierFee,
      serviceFee,
      insuranceFee,
      totalAmount,
      currency: "AZN"
    };
  }, [listing, durationDays, deliveryMethod, includeInsurance]);

  const handleConfirmBooking = () => {
    const newBooking = createBooking({
      listingId: listing.id,
      customerId: currentUser?.id || "user-1",
      customerName: currentUser?.name || "Leyla Məmmədova",
      customerPhone: currentUser?.phone || "+994 50 234 56 78",
      customerEmail: currentUser?.email || "leyla@example.com",
      providerId: listing.providerId,
      providerName: listing.providerName,
      providerPhone: listing.providerPhone,
      listingTitle: listing.title,
      storageAddress: `${listing.address}, ${listing.district}, ${listing.city}`,
      storageType: listing.storageType,
      item: { ...customerItem },
      startDate,
      endDate,
      durationDays: Number(durationDays),
      deliveryMethod,
      courierAddress: deliveryMethod === 'courier' ? courierAddress : '',
      courierSlot: deliveryMethod === 'courier' ? courierSlot : '',
      pricing
    });

    // Navigate to Receipt Page
    navigateTo('receipt', { bookingId: newBooking.id });
  };

  const stepsList = [
    { num: 1, title: "Əşya Məlumatları" },
    { num: 2, title: "Məkan Təsdiqi" },
    { num: 3, title: "Tarix və Müddət" },
    { num: 4, title: "Çatdırılma Növü" },
    { num: 5, title: "Xərclər və Qiymət" },
    { num: 6, title: "Rəqəmsal Müqavilə" },
    { num: 7, title: "Təsdiq və Yekun" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigateTo('listing-details', { listingId: listing.id })}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Məkan səhifəsinə qayıt
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Rezervasiya və İcarə Prosesi
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mərhələləri izləyərək saxlanc yerini bron edin (Demo simulyasiyası)
          </p>
        </div>

        {/* Step Indicator Badge */}
        <div className="hidden sm:block text-right">
          <span className="text-xs text-slate-400">Mərhələ</span>
          <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
            {currentStep} / 7
          </div>
        </div>
      </div>

      {/* Visual Stepper bar */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[600px] border-b border-slate-200 dark:border-slate-800 pb-3">
          {stepsList.map(s => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`flex items-center gap-2 text-xs font-bold transition-colors ${
                currentStep === s.num
                  ? 'text-blue-600 dark:text-blue-400'
                  : currentStep > s.num
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === s.num
                  ? 'bg-blue-600 text-white'
                  : currentStep > s.num
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
              }`}>
                {s.num}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content Container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-4 sm:p-8 space-y-6">

        {/* STEP 1: Item Details Review */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              1. Saxlanacaq Əşya Məlumatları
            </h3>
            <p className="text-xs text-slate-500">
              Saxlanc üçün bəyan etdiyiniz əşyaların təsvirini və həcmini yoxlayın:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-slate-400">Əşyanın adı:</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{customerItem.name}</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-slate-400">Kateqoriya:</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">{customerItem.category.replace('_', ' ')}</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-slate-400">Çəki və Həcm:</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {customerItem.weightKg} kq | {customerItem.volumeM3} m³
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl space-y-1">
                <span className="text-slate-400">Ölçülər (U x E x H):</span>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {customerItem.dimensionsCm?.length} x {customerItem.dimensionsCm?.width} x {customerItem.dimensionsCm?.height} sm
                </p>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300">
              Kövrək əşya: <strong>{customerItem.isFragile ? "Bəli (Xüsusi ehtiyatla daşınacaq)" : "Xeyr"}</strong> | 
              İqlim tələbi: <strong>{customerItem.requiredClimate}</strong>
            </div>
          </div>
        )}

        {/* STEP 2: Storage Space Confirmation */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
              2. Seçilmiş Saxlanc Məkanı
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
              <img
                src={listing.images[0]}
                alt=""
                className="w-full sm:w-40 h-28 object-cover rounded-xl"
              />
              <div className="space-y-1.5 flex-1">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{listing.city}, {listing.district}</div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{listing.title}</h4>
                <p className="text-xs text-slate-500">{listing.address}</p>
                <div className="text-xs font-bold text-emerald-600 pt-1">
                  Mövcud tutum: {listing.availableVolume} m³ | Maks. yük: {listing.maxWeight} kq
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Dates & Duration Selection */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              3. İcarə Başlama Tarixi və Müddəti
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Başlanğıc Tarixi
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  İcarə Müddəti (Gün ilə)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={listing.minDurationDays || 1}
                    max={listing.maxDurationDays || 365}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono font-bold"
                  />
                  <span className="text-xs text-slate-500 font-medium">gün</span>
                </div>
              </div>
            </div>

            {/* Quick duration presets */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs text-slate-400">Sürətli müddət:</span>
              {[7, 14, 30, 60, 90, 180].map(days => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setDurationDays(days)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    durationDays === days
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {days === 30 ? "1 ay (30 gün)" : days === 60 ? "2 ay" : days === 90 ? "3 ay" : `${days} gün`}
                </button>
              ))}
            </div>

            {/* Resulting dates banner */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
              <div>
                <span className="text-slate-400">Müqavilənin bitmə tarixi:</span>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{endDate}</div>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Ümumi gün sayı:</span>
                <div className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">{durationDays} gün</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Delivery Method Selection */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-500" />
              4. Çatdırılma və Təhvil Növü
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Courier */}
              <div
                onClick={() => setDeliveryMethod('courier')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliveryMethod === 'courier'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    Tövsiyə olunur
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  DepoTap Kuryer Xidməti (+25.00 ₼)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Kuryerimiz göstərilən ünvandan əşyaları götürür, foto-yoxlanış edir, plomblayır və birbaşa anbara çatdırır.
                </p>
              </div>

              {/* Option B: Personal Drop-off */}
              <div
                onClick={() => setDeliveryMethod('personal')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliveryMethod === 'personal'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Pulsuz (0 ₼)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Şəxsi Təhvil
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Əşyaları təyin olunan saatda şəxsən anbarın ünvanına ({listing.address}) gətirir və təhvil verirsiniz.
                </p>
              </div>
            </div>

            {/* Courier Address Input (if Courier selected) */}
            {deliveryMethod === 'courier' && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Kuryerin Əşyaları Götürəcəyi Ünvan və Saat Aralığı
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      placeholder="Dəqiq ünvan, bina və mənzil"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <select
                      value={courierSlot}
                      onChange={(e) => setCourierSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="09:00 - 13:00">09:00 - 13:00 (Səhər)</option>
                      <option value="14:00 - 18:00">14:00 - 18:00 (Günorta)</option>
                      <option value="18:00 - 21:00">18:00 - 21:00 (Axşam)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Price Breakdown & Transparency */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              5. Şəffaf Qiymət Hesablanması
            </h3>
            <p className="text-xs text-slate-500">
              Bütün xərclər tam açıq göstərilir. Heç bir gizli komissiya yoxdur:
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">
                  Saxlanc Haqqı ({pricing.dailyRate.toFixed(2)} ₼ × {durationDays} gün):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {pricing.storageFee.toFixed(2)} ₼
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">
                  Çatdırılma Haqqı ({deliveryMethod === 'courier' ? 'Ünvandan kuryerlə daşınma' : 'Şəxsi təhvil'}):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {pricing.courierFee.toFixed(2)} ₼
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300">
                  Platforma Xidmət Haqqı (5% texniki xidmət və dəstək):
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {pricing.serviceFee.toFixed(2)} ₼
                </span>
              </div>

              {/* Insurance option toggle */}
              <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300"
                  />
                  <span>Əşyaların Zəmanətli Sığortası (Demo qorunma):</span>
                </label>
                <span className="font-mono font-bold text-slate-900 dark:text-white self-end xs:self-auto">
                  {pricing.insuranceFee.toFixed(2)} ₼
                </span>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-4 border-t-2 border-slate-300 dark:border-slate-700 text-base">
                <span className="font-extrabold text-slate-900 dark:text-white">Ümumi Məbləğ:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    {pricing.totalAmount.toFixed(2)} ₼
                  </span>
                  <div className="text-[10px] text-slate-400">Vergilər daxildir</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300">
              <strong>Demo Xəbərdarlığı:</strong> Bu qiymətlər platforma prototipinin nümayişi üçün hesablanır. Real ödəniş kartı və ya bank köçürməsi tələb olunmur.
            </div>
          </div>
        )}

        {/* STEP 6: Simulated Digital Contract */}
        {currentStep === 6 && (
          <div className="space-y-5 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              6. Rəqəmsal Saxlanc Müqaviləsi və Şərtlər
            </h3>

            <div className="h-64 overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
              <div className="font-bold text-center border-b pb-2 text-slate-900 dark:text-white">
                ELEKTRON SAXLANMA VƏ XİDMƏT MÜQAVİLƏSİ (DTC-2026-PROTOTYPE)
              </div>
              <p>
                <strong>1. Tərəflər:</strong> Bir tərəfdən Saxlanc Sahibi ({listing.providerName}), digər tərəfdən İcarəçi ({currentUser?.name || "Leyla Məmmədova"}), aşağıdakı şərtlər daxilində razılaşırlar:
              </p>
              <p>
                <strong>2. Saxlanc Obyekti:</strong> {listing.address}, {listing.district}, {listing.city}. İqlim növü: {listing.climate?.label}.
              </p>
              <p>
                <strong>3. Müddət və Məbləğ:</strong> {startDate} tarixindən {endDate} tarixinədək ({durationDays} gün). Ümumi xidmət haqqı: {pricing.totalAmount.toFixed(2)} AZN.
              </p>
              <p>
                <strong>4. Əşyaların Qəbulu və Plomblanma:</strong> Əşyalar təhvil götürülərkən xüsusi nömrəli plomb vurulacaq və foto-yoxlanış aktı sistemə əlavə olunacaq.
              </p>
              <p>
                <strong>5. Zərər və Məsuliyyət:</strong> Əşyaların saxlandığı müddətdə anbar sahibi bəyan edilən temperatur və rütubət şəraitinə zəmanət verir.
              </p>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-800 dark:text-slate-200 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <input
                type="checkbox"
                checked={contractAgreed}
                onChange={(e) => setContractAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300"
              />
              <span>
                Yuxarıdakı rəqəmsal müqavilə şərtlərini oxudum, razıyam və elektron təsdiq edirəm.
              </span>
            </label>
          </div>
        )}

        {/* STEP 7: Confirm Booking & Simulation */}
        {currentStep === 7 && (
          <div className="space-y-5 animate-fade-in text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Rezervasiyanı Təsdiq Etməyə Hazırsınız!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Təsdiq düyməsini sıxdıqda unikal 6 rəqəmli kodunuz və QR kodlu elektron qəbziniz yaranacaq.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">Məkan:</span>
                <span className="font-bold">{listing.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">İcarəçi:</span>
                <span className="font-bold">{currentUser?.name || "Leyla Məmmədova"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Müddət:</span>
                <span className="font-bold">{startDate} — {endDate} ({durationDays} gün)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Təhvil:</span>
                <span className="font-bold">{deliveryMethod === 'courier' ? 'Kuryer xidməti' : 'Şəxsi təhvil'}</span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-sm">
                <span>Ödəniləcək Məbləğ:</span>
                <span className="text-blue-600 dark:text-blue-400">{pricing.totalAmount.toFixed(2)} ₼</span>
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={!contractAgreed}
              className={`w-full max-w-md py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all ${
                contractAgreed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 hover:-translate-y-0.5'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              Demo Rezervasiyanı Təsdiq Et və Qəbzi Yarat
            </button>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Geri
            </button>
          ) : <div />}

          {currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              Növbəti Addım
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : null}
        </div>

      </div>
    </div>
  );
}
