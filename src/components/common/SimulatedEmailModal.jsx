import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, X, CheckCircle, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function SimulatedEmailModal() {
  const { simulatedEmail, closeSimulatedEmail, navigateTo } = useApp();
  if (!simulatedEmail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Email Header Simulation */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Simulyasiya edilmiş E-poçt Bildirişi
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                DepoTap: Rezervasiya Təsdiqi #{simulatedEmail.bookingCode}
              </h3>
            </div>
          </div>
          <button
            onClick={closeSimulatedEmail}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <div><strong className="text-slate-700 dark:text-slate-300">Kimdən:</strong> bildiris@depotap.az (DepoTap Rəsmi Bildirişlər)</div>
          <div><strong className="text-slate-700 dark:text-slate-300">Kimə:</strong> {simulatedEmail.customerEmail || 'leyla@example.com'}</div>
          <div><strong className="text-slate-700 dark:text-slate-300">Tarix:</strong> {new Date().toLocaleString('az-AZ')}</div>
        </div>

        {/* Email Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-base">
            <CheckCircle className="w-5 h-5" />
            Hörmətli {simulatedEmail.customerName}, rezervasiyanız uğurla qeydə alındı!
          </div>

          <p>
            Əşyalarınız üçün seçdiyiniz <strong>{simulatedEmail.listingTitle}</strong> məkanında rezervasiya rəsmiləşdirildi.
            Aşağıda rezervasiyanızın əsas detalları və qəbz məlumatları qeyd olunmuşdur.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span className="text-slate-500 dark:text-slate-400">Unikal Rezervasiya Kodu:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-base">{simulatedEmail.bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Müqavilə №:</span>
              <span className="font-medium">{simulatedEmail.contractId || 'DTC-2026-8891'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">İcarə Müddəti:</span>
              <span className="font-medium">{simulatedEmail.startDate} — {simulatedEmail.endDate} ({simulatedEmail.durationDays} gün)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Təhvil növü:</span>
              <span className="font-medium">{simulatedEmail.deliveryMethod === 'courier' ? 'Kuryer xidməti ilə daşınma' : 'Şəxsi təhvil'}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 text-base font-bold text-slate-900 dark:text-white">
              <span>Ümumi Məbləğ:</span>
              <span className="text-blue-600 dark:text-blue-400">{simulatedEmail.pricing?.totalAmount?.toFixed(2) || '311.68'} ₼</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-xl text-xs text-amber-800 dark:text-amber-300">
            <strong>Qeyd:</strong> Bu mesaj frontend prototipinin e-poçt simulyasiyasıdır. Real istehsalat mühitində bu məktub transactional email xidmətləri (SendGrid, Mailgun, AWS SES) vasitəsilə göndəriləcək.
          </div>
        </div>

        {/* Email Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              closeSimulatedEmail();
              navigateTo('receipt', { bookingId: simulatedEmail.id });
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Rəsmi Qəbzi Aç
          </button>
          <button
            onClick={closeSimulatedEmail}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm transition-colors"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  );
}
