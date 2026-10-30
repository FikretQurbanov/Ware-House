import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, ShieldCheck, Printer, ArrowLeft, CheckCircle2, 
  AlertTriangle, Lock, User, MapPin, Calendar, Clock 
} from 'lucide-react';

export default function DigitalContractPage() {
  const { 
    selectedBookingId, 
    bookings, 
    navigateTo 
  } = useApp();

  const booking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Müqavilə tapılmadı.</p>
        <button onClick={() => navigateTo('home')} className="mt-4 text-blue-600 font-bold">
          Ana səhifəyə qayıt
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={() => navigateTo('receipt', { bookingId: booking.id })}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Qəbzə qayıt
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            Müqaviləni Çap Et
          </button>
        </div>
      </div>

      {/* Contract Document Card */}
      <div 
        id="printable-receipt"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 sm:p-8 md:p-12 space-y-8 font-serif transition-colors text-slate-800 dark:text-slate-200"
      >
        {/* Header */}
        <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-sans text-xs font-bold tracking-wider mb-1">
            RƏQƏMSAL SAXLANMA VƏ İCARƏ MÜQAVİLƏSİ
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Müqavilə № {booking.contractId || "DTC-2026-8891"}
          </h1>
          <p className="font-sans text-xs text-slate-500">
            Tərtib olunma tarixi: {booking.contractSignedAt || new Date().toLocaleString('az-AZ')}
          </p>
        </div>

        {/* Prototype Legal Disclaimer Notice */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl font-sans text-xs text-amber-800 dark:text-amber-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Mühüm Hüquqi Xəbərdarlıq (Demo Prototip):</span>
          </div>
          <p>
            Bu rəqəmsal saziş və plomblanma sənədləşməsi frontend prototipinin imkanlarını nümayiş etdirmək üçün tərtib olunmuşdur və rəsmi hüquqi öhdəlik daşımır. Real tətbiqdə dövlət reyestri, rəsmi elektron imza (ASAN İmza / SİMA) və sertifikatlaşdırılmış notariat mexanizmləri tələb edilir.
          </p>
        </div>

        {/* Article 1: Parties */}
        <div className="space-y-3">
          <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-1">
            Maddə 1. Tərəflər
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs leading-relaxed">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="font-bold text-slate-500 uppercase block">1.1. Saxlanc Sahibi (İcarədar):</span>
              <p><strong>Ad / Şirkət:</strong> {booking.providerName}</p>
              <p><strong>Əlaqə Telefonu:</strong> {booking.providerPhone}</p>
              <p><strong>Rol:</strong> Təsdiqlənmiş Məkan Sahibi</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
              <span className="font-bold text-slate-500 uppercase block">1.2. Əşya Sahibi (İcarəçi):</span>
              <p><strong>Ad və Soyad:</strong> {booking.customerName}</p>
              <p><strong>Əlaqə Telefonu:</strong> {booking.customerPhone}</p>
              <p><strong>E-poçt:</strong> {booking.customerEmail}</p>
            </div>
          </div>
        </div>

        {/* Article 2: Storage Object & Conditions */}
        <div className="space-y-3 font-sans text-xs leading-relaxed">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-1">
            Maddə 2. Saxlanc Obyekti və Bəyan Edilən Şərait
          </h3>
          <p>
            <strong>2.1. Ünvan:</strong> {booking.storageAddress} ({booking.listingTitle}).
          </p>
          <p>
            <strong>2.2. Obyektin Növü:</strong> {booking.storageType === 'saxlanc_otagi' ? 'Fərdi Saxlanc Otağı' : booking.storageType === 'qaraj' ? 'Qaraj Sahəsi' : 'Anbar Sahəsi'}.
          </p>
          <p>
            <strong>2.3. Bəyan Edilmiş İqlim Rejimi:</strong> Əşyaların saxlandığı sahədə təbii ventilyasiya və ya sabit temperatur şəraiti Saxlanc Sahibi tərəfindən təmin edilir.
          </p>
        </div>

        {/* Article 3: Item Description and Seal */}
        <div className="space-y-3 font-sans text-xs leading-relaxed">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-1">
            Maddə 3. Əşyanın Təsviri və Plomblanma Rejimi
          </h3>
          <p>
            <strong>3.1. Əşyanın Adı və Təyinatı:</strong> {booking.item?.name}.
          </p>
          <p>
            <strong>3.2. Çəki və Qabaritlər:</strong> Çəkisi təxminən {booking.item?.weightKg} kq, həcmi {booking.item?.volumeM3} m³.
          </p>
          <p>
            <strong>3.3. Kövrəklik Vəziyyəti:</strong> {booking.item?.isFragile ? "Kövrək əşya kimi bəyan edilmişdir və xüsusi diqqət tələb edir." : "Standart dözümlü əşyadır."}
          </p>
          <p>
            <strong>3.4. Təhlükəsizlik Plombu:</strong> Əşyalar təhvil alınarkən <strong>{booking.handoverDetails?.sealNumber || 'AZ-PL-8841'}</strong> nömrəli təhlükəsizlik lenti ilə möhürlənmişdir. Plomb yalnız icarə müddətinin sonunda Müştərinin iştirakı ilə sökülə bilər.
          </p>
        </div>

        {/* Article 4: Period and Price */}
        <div className="space-y-3 font-sans text-xs leading-relaxed">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-1">
            Maddə 4. İcarə Müddəti, Çatdırılma və Ödəniş Cədvəli
          </h3>
          <p>
            <strong>4.1. Müddət:</strong> {booking.startDate} tarixindən {booking.endDate} tarixinədək (Cəmi: {booking.durationDays} təqvim günü).
          </p>
          <p>
            <strong>4.2. Çatdırılma Metodu:</strong> {booking.deliveryMethod === 'courier' ? 'DepoTap Kuryer Xidməti vasitəsilə ünvandan götürülmə' : 'Şəxsi nəqliyyatla ünvana təhvil'}.
          </p>
          <p>
            <strong>4.3. Maliyyə Cədvəli:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Saxlanc haqqı: {booking.pricing?.storageFee?.toFixed(2)} AZN</li>
            <li>Çatdırılma haqqı: {booking.pricing?.courierFee?.toFixed(2)} AZN</li>
            <li>Platforma dəstək və xidmət haqqı: {booking.pricing?.serviceFee?.toFixed(2)} AZN</li>
            <li>Sığorta təminatı: {booking.pricing?.insuranceFee?.toFixed(2)} AZN</li>
            <li><strong>Yekun Məbləğ: {booking.pricing?.totalAmount?.toFixed(2)} AZN</strong></li>
          </ul>
        </div>

        {/* Article 5: Responsibilities, Damage and Cancellation */}
        <div className="space-y-3 font-sans text-xs leading-relaxed">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b pb-1">
            Maddə 5. Tərəflərin Məsuliyyəti, Zərərin Qeydə Alınması və Ləğv Şərtləri
          </h3>
          <p>
            <strong>5.1.</strong> İcarəçi məkan daxilində yanar, partlayıcı, toksik və ya qanunsuz maddələrin saxlanmayacağını təsdiq edir.
          </p>
          <p>
            <strong>5.2.</strong> Əşyanın qaytarılması zamanı plomb zədələnməyibsə, əşyaların toxunulmaz və bütöv təhvil verildiyi qəbul edilir.
          </p>
          <p>
            <strong>5.3.</strong> Əgər çatdırılma və ya saxlanc zamanı hər hansı zədələnmə baş verərsə, ilkin foto-yoxlanış aktı əsas götürülərək araşdırma aparılır.
          </p>
          <p>
            <strong>5.4. Ləğv qaydası:</strong> Rezervasiya başlanğıc tarixinə ən az 24 saat qalmış ləğv edilərsə, məbləğ tam şəkildə geri qaytarılır.
          </p>
        </div>

        {/* Electronic Signatures Footer */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 font-sans text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">İcarədar Tərəfindən:</span>
            <div className="font-bold text-slate-800 dark:text-slate-200">{booking.providerName}</div>
            <div className="text-emerald-600 font-mono text-[11px] flex flex-wrap items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Elektron Təsdiq Edilib (DepoTap ID: PRV-9921)</span>
            </div>
            <div className="text-[10px] text-slate-400">İmza Tarixi: {booking.contractSignedAt}</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-slate-400 block uppercase font-bold text-[10px]">İcarəçi Tərəfindən:</span>
            <div className="font-bold text-slate-800 dark:text-slate-200">{booking.customerName}</div>
            <div className="text-emerald-600 font-mono text-[11px] flex flex-wrap items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Elektron İmzalanıb (Demo Təsdiq)</span>
            </div>
            <div className="text-[10px] text-slate-400">İmza Tarixi: {booking.contractSignedAt}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
