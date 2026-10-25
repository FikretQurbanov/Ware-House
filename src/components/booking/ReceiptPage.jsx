import React from 'react';
import { useApp } from '../../context/AppContext';
import { generateQRCodeSVG } from '../../utils/qrCode';
import { 
  Printer, Mail, ArrowRight, CheckCircle2, ShieldCheck, 
  MapPin, Calendar, Clock, FileText, Download, Share2, ArrowLeft 
} from 'lucide-react';

export default function ReceiptPage() {
  const { 
    selectedBookingId, 
    bookings, 
    openSimulatedEmail, 
    navigateTo 
  } = useApp();

  const booking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Qəbz məlumatı tapılmadı.</p>
        <button onClick={() => navigateTo('home')} className="mt-4 text-blue-600 font-bold">
          Ana səhifəyə qayıt
        </button>
      </div>
    );
  }

  // Generate QR Code SVG
  const qrVerificationUrl = `https://depotap.az/verify/${booking.bookingCode}`;
  const qr = generateQRCodeSVG(qrVerificationUrl, 160);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Action Bar (hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <button
          onClick={() => navigateTo('customer-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Rezervasiyalarıma qayıt
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openSimulatedEmail(booking)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold transition-colors"
          >
            <Mail className="w-4 h-4" />
            E-poçt Qəbzini Gör (Simulyasiya)
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-xs font-bold shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            Çap Et / PDF Yadda Saxla
          </button>
        </div>
      </div>

      {/* Printable Receipt Container */}
      <div 
        id="printable-receipt" 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-10 space-y-8 transition-colors"
      >
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
                DT
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">DepoTap Qəbzi</h2>
                <span className="text-xs text-slate-400">Rəsmi Onlayn Saxlanc Rezervasiyası</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              Verilmə tarixi: {booking.contractSignedAt || new Date().toLocaleString('az-AZ')}
            </p>
          </div>

          {/* QR Code and Code Box */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div 
              className="bg-white p-2 rounded-xl shadow-inner flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: qr.svgString }}
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Rezervasiya Kodu
              </span>
              <div className="text-2xl font-mono font-extrabold text-blue-600 dark:text-blue-400 tracking-wider">
                {booking.bookingCode}
              </div>
              <span className="text-[10px] text-slate-400 block">
                Müqavilə: {booking.contractId}
              </span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                TƏSDİQLƏNİB
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Customer & Provider */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Tərəflər və Əlaqə
            </h4>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <div><strong className="text-slate-700 dark:text-slate-200">Müştəri:</strong> {booking.customerName}</div>
              <div><strong className="text-slate-700 dark:text-slate-200">Telefon:</strong> {booking.customerPhone}</div>
              <div><strong className="text-slate-700 dark:text-slate-200">Anbar Sahibi:</strong> {booking.providerName}</div>
              <div><strong className="text-slate-700 dark:text-slate-200">Sahibkar Əlaqə:</strong> {booking.providerPhone}</div>
            </div>
          </div>

          {/* Storage Details */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Saxlanc Obyekti və Müddət
            </h4>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <div><strong className="text-slate-700 dark:text-slate-200">Məkan:</strong> {booking.listingTitle}</div>
              <div><strong className="text-slate-700 dark:text-slate-200">Ünvan:</strong> {booking.storageAddress}</div>
              <div><strong className="text-slate-700 dark:text-slate-200">Müddət:</strong> {booking.startDate} — {booking.endDate} ({booking.durationDays} gün)</div>
              <div>
                <strong className="text-slate-700 dark:text-slate-200">Təhvil növü:</strong> {booking.deliveryMethod === 'courier' ? 'DepoTap Kuryer Xidməti' : 'Şəxsi Təhvil'}
              </div>
            </div>
          </div>
        </div>

        {/* Item Specifications */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Bəyan Edilən Əşya və Təhlükəsizlik
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 block">Əşyanın adı:</span>
              <strong className="text-slate-800 dark:text-slate-200">{booking.item?.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Çəki və Həcm:</span>
              <strong className="text-slate-800 dark:text-slate-200">{booking.item?.weightKg} kq ({booking.item?.volumeM3} m³)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Təhlükəsizlik Plombu:</span>
              <strong className="text-blue-600 dark:text-blue-400 font-mono">{booking.handoverDetails?.sealNumber || 'AZ-PL-8841'}</strong>
            </div>
          </div>
        </div>

        {/* Price Breakdown Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Maliyyə Hesabatı və Xərclər
          </h4>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Xidmətin Təsviri</th>
                  <th className="p-3 font-semibold text-center">Müddət / Say</th>
                  <th className="p-3 font-semibold text-right">Tarif</th>
                  <th className="p-3 font-semibold text-right">Cəmi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-medium">Saxlanc Sahəsinin İcarəsi</td>
                  <td className="p-3 text-center">{booking.durationDays} gün</td>
                  <td className="p-3 text-right">{booking.pricing?.dailyRate?.toFixed(2)} ₼/gün</td>
                  <td className="p-3 text-right font-mono font-bold">{booking.pricing?.storageFee?.toFixed(2)} ₼</td>
                </tr>
                {booking.deliveryMethod === 'courier' && (
                  <tr>
                    <td className="p-3 font-medium">Kuryer Daşınması (Qapıdan qəbul)</td>
                    <td className="p-3 text-center">1 səfər</td>
                    <td className="p-3 text-right">25.00 ₼</td>
                    <td className="p-3 text-right font-mono font-bold">25.00 ₼</td>
                  </tr>
                )}
                <tr>
                  <td className="p-3 font-medium">Platforma Xidmət və Dəstək Haqqı (5%)</td>
                  <td className="p-3 text-center">-</td>
                  <td className="p-3 text-right">5%</td>
                  <td className="p-3 text-right font-mono font-bold">{booking.pricing?.serviceFee?.toFixed(2)} ₼</td>
                </tr>
                {booking.pricing?.insuranceFee > 0 && (
                  <tr>
                    <td className="p-3 font-medium">Zəmanətli Əşya Qorunması və Sığortası</td>
                    <td className="p-3 text-center">Paket</td>
                    <td className="p-3 text-right">{booking.pricing?.insuranceFee?.toFixed(2)} ₼</td>
                    <td className="p-3 text-right font-mono font-bold">{booking.pricing?.insuranceFee?.toFixed(2)} ₼</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/50 font-bold border-t border-slate-200 dark:border-slate-800">
                <tr>
                  <td colSpan="3" className="p-3 text-right text-sm text-slate-900 dark:text-white">
                    Yekun Ödənilmiş Məbləğ:
                  </td>
                  <td className="p-3 text-right text-base text-blue-600 dark:text-blue-400 font-mono">
                    {booking.pricing?.totalAmount?.toFixed(2)} ₼
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Legal & Prototype Disclosure Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1.5">
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Təhlükəsizlik və Doğrulama Şərtləri:</span>
          </div>
          <p>
            Bu qəbz və QR kod müştərinin rezervasiya hüququnu və plomblanmış əşyanın təhvil-təslim statusunu təsdiqləyir.
            Əşyanı təhvil verərkən və ya geri alarkən bu 6 simvollu unikal kodu (<strong>{booking.bookingCode}</strong>) və ya QR kodu təqdim edin.
          </p>
          <p className="italic text-slate-400">
            * Qeyd: Bu sənəd DepoTap frontend prototipi tərəfindən generasiya edilmiş nümunəvi elektron qəbzdir. Real istehsalat mühitində kodlar server tərəfindən unikal olaraq generasiya edilir və kriptoqrafik imzalanır.
          </p>
        </div>

      </div>

      {/* Post-receipt Navigation CTA (hidden when printing) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 no-print">
        <div>
          <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">
            Əşyalarınızın Statusunu İzləmək İstəyirsiniz?
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
            Kuryer təhvilindən anbara daxilolmaya qədər bütün 10 statusu real vaxtda izləyin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('contract', { bookingId: booking.id })}
            className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
          >
            Rəqəmsal Müqaviləyə Bax
          </button>
          <button
            onClick={() => navigateTo('booking-tracking', { bookingId: booking.id })}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <span>Statusu İzlə</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
