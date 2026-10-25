import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, Star, ShieldCheck, Thermometer, Box, Scale, 
  Calendar, Clock, CheckCircle2, AlertTriangle, ArrowLeft, 
  UserCheck, Shield, Lock, Truck, ChevronRight 
} from 'lucide-react';
import { evaluateListingMatch } from '../../utils/matchingEngine';

export default function ListingDetailsPage() {
  const { 
    selectedListingId, 
    listings, 
    customerItem, 
    searchFilters, 
    navigateTo 
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const listing = listings.find(l => l.id === selectedListingId) || listings[0];
  const matchResult = evaluateListingMatch(listing, customerItem, searchFilters);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Məkan tapılmadı.</p>
        <button onClick={() => navigateTo('search')} className="mt-4 text-blue-600 font-bold">
          Axtarışa qayıt
        </button>
      </div>
    );
  }

  const storageTypeLabels = {
    saxlanc_otagi: "Fərdi Saxlanc Otağı",
    qaraj: "Qaraj Sahəsi",
    anbar: "Logistika Anbarı",
    konteyner: "Dəniz Konteyneri"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('search')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Saxlanc axtarışına qayıt
        </button>
      </div>

      {/* Main Grid: Details Left, Booking CTA Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Photos, Specs, Description, Security */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-lg">
                {storageTypeLabels[listing.storageType] || listing.storageType}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {listing.rating.toFixed(1)} ({listing.reviewCount} rəy)
              </span>
              {listing.featured && (
                <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold px-2.5 py-1 rounded-lg">
                  Seçilmiş Məkan
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {listing.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-2">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>{listing.address}, {listing.district}, {listing.city}</span>
            </div>
          </div>

          {/* Photos Gallery */}
          <div className="space-y-3">
            <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-md">
              <img
                src={listing.images[activePhotoIdx] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            {listing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activePhotoIdx === idx
                        ? 'border-blue-600 scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Matching Engine Check for Customer Item */}
          <div className={`p-5 rounded-2xl border ${
            matchResult.isEligible
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-700/60">
              <span className="text-sm font-bold flex items-center gap-2">
                {matchResult.isEligible ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-900 dark:text-emerald-200">
                      Əşyanız bu məkana tam uyğundur (%{matchResult.matchScore})
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-900 dark:text-rose-200">
                      Diqqət: Bəzi parametrlər uyğun gəlmir
                    </span>
                  </>
                )}
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-xs">
              {matchResult.isEligible ? (
                matchResult.matchReasons.map((r, i) => (
                  <div key={i} className="text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5">
                    <span className="font-bold">✓</span>
                    <span>{r}</span>
                  </div>
                ))
              ) : (
                matchResult.rejectionReasons.map((r, i) => (
                  <div key={i} className="text-rose-800 dark:text-rose-300 flex items-start gap-1.5">
                    <span className="font-bold">✕</span>
                    <span>{r}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Məkan Haqqında Ətraflı
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Space Specifications Grid */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Texniki Parametrlər və Tutum
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block mb-1">Ümumi / Boş Sahə</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {listing.totalArea} m² / <strong className="text-blue-600 dark:text-blue-400">{listing.availableArea} m²</strong>
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block mb-1">Mövcud Həcm</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {listing.availableVolume} m³
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block mb-1">Maksimal Çəki</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {listing.maxWeight} kq
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl">
                <span className="text-slate-400 block mb-1">Qapı Giriş Ölçüsü</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {listing.doorDimensions?.width}x{listing.doorDimensions?.height} sm
                </span>
              </div>
            </div>
          </div>

          {/* Climate & Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Climate */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Thermometer className="w-4 h-4 text-blue-500" />
                <span>İqlim və Temperatur Şəraiti</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {listing.climate?.label}
              </p>
              <ul className="text-xs space-y-1.5 text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Rütubət nəzarəti: {listing.climate?.humidityControl ? "Var (Quru mühit)" : "Standart"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Ventilyasiya: {listing.climate?.ventilation ? "Daimi hava dövriyyəsi" : "Təbii"}
                </li>
              </ul>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Təhlükəsizlik və Giriş</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
                {listing.security.map((sec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rules & Restricted Items */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Qadağan Edilmiş Əşyalar və Xüsusi Qaydalar
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {listing.restrictedItems.map((res, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-800 text-amber-800 dark:text-amber-300 text-xs border border-amber-200 dark:border-amber-800">
                  ✕ {res}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 pt-1">
              * Qiymətli metal, zərgərlik və ya xüsusi lisenziya tələb edən əşyalar üçün qabaqcadan razılaşma mütləqdir.
            </p>
          </div>

          {/* Host info card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg">
                {listing.providerName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {listing.providerName}
                  </h4>
                  <span className="p-0.5 bg-blue-100 text-blue-600 rounded" title="Təsdiqlənmiş Sahibkar">
                    <UserCheck className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Əlaqə: {listing.providerPhone} | Cavab müddəti: 1 saat ərzində
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 justify-end">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {listing.providerRating || 4.9}
              </div>
              <div className="text-[11px] text-slate-400">Reytinq</div>
            </div>
          </div>

        </div>

        {/* Right Col: Sticky Booking CTA & Calculator */}
        <div>
          <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-6">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400">İcarə qiyməti</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {listing.pricePerDay.toFixed(2)} ₼
                </span>
                <span className="text-xs text-slate-500 font-medium">/ gün</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Aylıq təxmini tarif: ~{listing.pricePerMonth?.toFixed(2) || (listing.pricePerDay * 30).toFixed(2)} ₼
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Minimum icarə:</span>
                <span className="font-bold">{listing.minDurationDays} gün</span>
              </div>
              <div className="flex justify-between">
                <span>Maksimum icarə:</span>
                <span className="font-bold">{listing.maxDurationDays} gün</span>
              </div>
              <div className="flex justify-between">
                <span>Giriş rejimi:</span>
                <span className="font-bold">{listing.accessHours || "24/7"}</span>
              </div>
              <div className="flex justify-between">
                <span>Depozit tələbi:</span>
                <span className="font-bold text-emerald-600">Yoxdur (0 ₼)</span>
              </div>
            </div>

            {/* Quick action button */}
            <button
              onClick={() => navigateTo('booking-checkout', { listingId: listing.id })}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Rezervasiyaya Başla</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-[11px] text-blue-800 dark:text-blue-300 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                DepoTap Zəmanəti daxildir:
              </div>
              <div>• Kuryerlə ünvandan götürülmə imkanı</div>
              <div>• Təhlükəsizlik plombu və foto-yoxlanış</div>
              <div>• İkitərəfli rəsmi rəqəmsal müqavilə</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
