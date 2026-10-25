import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarCheck, Clock, MapPin, Truck, ArrowRight, 
  FileText, ShieldCheck, Plus, Package, ExternalLink 
} from 'lucide-react';

export default function CustomerDashboard() {
  const { 
    bookings, 
    currentUser, 
    navigateTo, 
    openSimulatedEmail 
  } = useApp();

  // Filter bookings for current user (or show all demo customer bookings if demo mode)
  const userBookings = bookings.filter(b => b.customerId === currentUser?.id || currentUser?.role === 'admin' || !b.customerId);

  const statusLabels = {
    created: { label: "Rezervasiya yaradıldı", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
    contract_pending: { label: "Müqavilə təsdiqlənməsi", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
    confirmed: { label: "Təsdiqləndi", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
    scheduled: { label: "Təhvil planlandı", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
    inspected: { label: "Plomblanma aparıldı", color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
    received_at_storage: { label: "Anbara çatdı", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
    item_stored: { label: "Aktiv saxlanılır", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
    return_requested: { label: "Qaytarılma istənildi", color: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
    returned: { label: "Təhvil verildi", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
    completed: { label: "Tamamlandı", color: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Rezervasiyalarım və Saxlanc İzləməsi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            İcarəyə götürdüyünüz saxlanc yerləri, qəbzlər və kuryer daşınma statusları
          </p>
        </div>

        <button
          onClick={() => navigateTo('search')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Yeni Saxlanc Yeri Tap
        </button>
      </div>

      {/* Bookings List */}
      {userBookings.length > 0 ? (
        <div className="space-y-4">
          {userBookings.map(b => {
            const st = statusLabels[b.currentStatus] || { label: b.currentStatus, color: "bg-slate-100 text-slate-700" };

            return (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-base">
                      #{b.bookingCode}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${st.color}`}>
                      {st.label}
                    </span>
                    <span className="text-xs text-slate-400">
                      {b.startDate} — {b.endDate} ({b.durationDays} gün)
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {b.listingTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      {b.storageAddress}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      {b.item?.name} ({b.item?.weightKg} kq)
                    </span>
                    <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                      Ümumi: {b.pricing?.totalAmount?.toFixed(2)} ₼
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
                  <button
                    onClick={() => openSimulatedEmail(b)}
                    className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    title="Simulyasiya edilmiş E-poçt bildirişini aç"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigateTo('receipt', { bookingId: b.id })}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Qəbz & QR
                  </button>

                  <button
                    onClick={() => navigateTo('contract', { bookingId: b.id })}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Müqavilə
                  </button>

                  <button
                    onClick={() => navigateTo('booking-tracking', { bookingId: b.id })}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-1"
                  >
                    <span>Statusu İzlə</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
          <CalendarCheck className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Hələ heç bir aktiv rezervasiyanız yoxdur
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Əşyalarınızı təhlükəsiz şəkildə saxlamaq üçün mövcud anbar və saxlanc otaqlarını nəzərdən keçirin.
          </p>
          <button
            onClick={() => navigateTo('search')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Saxlanc Yerləri Axtarışına Başla
          </button>
        </div>
      )}
    </div>
  );
}
