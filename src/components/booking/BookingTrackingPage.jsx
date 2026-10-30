import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, Circle, Clock, Truck, ShieldCheck, Box, 
  ArrowLeft, FileText, Camera, Lock, RefreshCw, AlertCircle, 
  ExternalLink, ChevronRight, User, MapPin 
} from 'lucide-react';

export default function BookingTrackingPage() {
  const { 
    selectedBookingId, 
    bookings, 
    updateBookingStatus, 
    updateHandoverInspection,
    currentUser, 
    navigateTo 
  } = useApp();

  const booking = bookings.find(b => b.id === selectedBookingId) || bookings[0];

  // Local state for interactive inspection checklist editing
  const [checklistState, setChecklistState] = useState(
    booking?.handoverDetails?.checklist || [
      { label: "Qablaşdırma bütövdür və zədələnməyib", checked: true },
      { label: "Kövrək əşya xəbərdarlıq nişanı yapışdırılıb", checked: true },
      { label: "Çəki və həcm bəyan edilən parametrlərə uyğundur", checked: true },
      { label: "Təhlükəsizlik plombları vurulub", checked: true }
    ]
  );
  const [sealNumberInput, setSealNumberInput] = useState(booking?.handoverDetails?.sealNumber || "AZ-PL-8841");
  const [notesInput, setNotesInput] = useState(booking?.handoverDetails?.inspectionNotes || "");

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Rezervasiya tapılmadı.</p>
        <button onClick={() => navigateTo('customer-dashboard')} className="mt-4 text-blue-600 font-bold">
          Rezervasiyalarıma qayıt
        </button>
      </div>
    );
  }

  // Full 10 status timeline steps definition
  const allTimelineStages = [
    { key: "created", title: "Rezervasiya yaradıldı", desc: "Müraciət onlayn qeydə alındı" },
    { key: "contract_pending", title: "Rəqəmsal müqavilə razılaşdırıldı", desc: "Elektron şərtlər təsdiq olundu" },
    { key: "confirmed", title: "Rezervasiya təsdiqləndi", desc: "Anbar sahibi məkanı ayırdı" },
    { 
      key: "scheduled", 
      title: booking.deliveryMethod === 'courier' ? "Kuryer daşınması planlandı" : "Şəxsi təhvil vaxtı təyin edildi", 
      desc: booking.deliveryMethod === 'courier' ? `Kuryer saat ${booking.courierSlot || '14:00-18:00'} aralığında ünvana gələcək` : "Müştəri əşyaları anbara gətirəcək" 
    },
    { key: "inspected", title: "Əşya yoxlanıldı və sənədləşdirildi", desc: "Foto-yoxlanış və plomb tətbiq edildi" },
    { key: "received_at_storage", title: "Əşya anbara çatdırıldı", desc: "Anbarda qəbul zonasına daxil oldu" },
    { key: "item_stored", title: "Əşya aktiv saxlanılır", desc: "Məkan 24/7 qorunur və iqlimə nəzarət edilir" },
    { key: "return_requested", title: "Qaytarılma tələb edildi", desc: "Müştəri əşyaların geri verilməsini istədi" },
    { key: "returned", title: "Əşya müştəriyə təhvil verildi", desc: "Plomb açıldı və təhvil-təslim aktı imzalandı" },
    { key: "completed", title: "Rezervasiya tamamlandı", desc: "Bütün xidmətlər uğurla yekunlaşdı" }
  ];

  // Find index of current status
  const currentStatusIndex = allTimelineStages.findIndex(s => s.key === booking.currentStatus);

  // Status transitions
  const handleAdvanceStatus = (nextStatus, note) => {
    updateBookingStatus(booking.id, nextStatus, note);
  };

  const handleSaveInspection = () => {
    updateHandoverInspection(booking.id, {
      sealNumber: sealNumberInput,
      checklist: checklistState,
      inspectionNotes: notesInput,
      inspectionDate: new Date().toLocaleString('az-AZ')
    });
  };

  const toggleChecklistItem = (idx) => {
    const updated = [...checklistState];
    updated[idx].checked = !updated[idx].checked;
    setChecklistState(updated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('customer-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Panelə qayıt
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Rezervasiya İzləməsi #{booking.bookingCode}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {allTimelineStages[currentStatusIndex]?.title || booking.currentStatus}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {booking.listingTitle} ({booking.storageAddress})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigateTo('receipt', { bookingId: booking.id })}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Elektron Qəbz
          </button>
          <button
            onClick={() => navigateTo('contract', { bookingId: booking.id })}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            Müqavilə
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Timeline & Handover Inspection */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Visual 10-Stage Status Timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>10 Mərhələli Saxlanc və Daşınma Qrafiki</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentStatusIndex + 1} / 10
              </span>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              {allTimelineStages.map((stage, idx) => {
                const isPassed = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                const isFuture = idx > currentStatusIndex;

                // Match with logged event if passed
                const loggedEvent = booking.timeline?.find(t => t.status === stage.key);

                return (
                  <div key={stage.key} className="relative group">
                    {/* Circle icon */}
                    <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-800 transition-all ${
                      isPassed
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}>
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isCurrent ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <Circle className="w-2.5 h-2.5 fill-current" />
                      )}
                    </div>

                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                        <h4 className={`text-sm font-bold ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400'
                            : isPassed
                            ? 'text-slate-800 dark:text-slate-200'
                            : 'text-slate-400'
                        }`}>
                          {stage.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {loggedEvent?.date || (isCurrent ? 'Hazırda aktivdir' : '')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {loggedEvent?.desc || stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Item Handover & Inspection Documentation Workflow */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Təhvil-Təslim və Plomblanma Sənədləşməsi
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Plomb №: {booking.handoverDetails?.sealNumber || sealNumberInput}
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Yoxlanış Siyahısı (Checklist):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {checklistState.map((chk, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={chk.checked}
                      onChange={() => toggleChecklistItem(i)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300"
                    />
                    <span className={chk.checked ? "text-slate-800 dark:text-slate-200 font-medium" : "text-slate-400"}>
                      {chk.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Inspection Notes & Seal input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Təhlükəsizlik Plomb Nömrəsi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={sealNumberInput}
                    onChange={(e) => setSealNumberInput(e.target.value)}
                    placeholder="Məs: AZ-PL-8841"
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Yoxlanışı Həyata Keçirən
                </label>
                <input
                  type="text"
                  readOnly
                  value={booking.handoverDetails?.inspectedBy || "DepoTap Kuryer Nəzarətçisi"}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Yoxlanış Qeydləri və İlkin Vəziyyət
              </label>
              <textarea
                rows="2"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Məs: Əşyaların qablaşdırması bütövdür, plomb tətbiq edildi."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Condition Photo Gallery */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-blue-500" />
                İlkin Vəziyyəti Əks Etdirən Foto Qalereya
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80"
                    alt="Qablaşdırılmış mebel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-28 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop&q=80"
                    alt="Plomblanmış qutular"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-28 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 text-xs gap-1">
                  <Camera className="w-5 h-5 text-slate-400" />
                  <span>Foto arxiv</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveInspection}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Yoxlanış Aktını Yadda Saxla
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Interactive Control Actions (Depends on Role & Current Status) */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-md space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Status İdarəetmə Paneli
            </h3>
            <p className="text-xs text-slate-500">
              Demo mühitində rezervasiyanın növbəti mərhələlərə keçidini sınaqdan keçirin:
            </p>

            {/* Role indicator */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs flex items-center justify-between">
              <span className="text-blue-800 dark:text-blue-300">Cari Rol:</span>
              <span className="font-bold text-blue-900 dark:text-blue-200 uppercase">
                {currentUser?.role === 'customer' ? 'Müştəri' : currentUser?.role === 'provider' ? 'Anbar Sahibi' : 'Hər İkisi / Admin'}
              </span>
            </div>

            {/* Dynamic Action Buttons based on Current Status */}
            <div className="space-y-2.5">
              {booking.currentStatus === 'created' && (
                <button
                  onClick={() => handleAdvanceStatus('contract_pending', 'Rəqəmsal müqavilə şərtləri razılaşdırıldı.')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Müqaviləni Təsdiqlə
                </button>
              )}

              {booking.currentStatus === 'contract_pending' && (
                <button
                  onClick={() => handleAdvanceStatus('confirmed', 'Anbar sahibi rezervasiyanı təsdiq etdi.')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Anbar Sahibi Kimi Təsdiqlə
                </button>
              )}

              {booking.currentStatus === 'confirmed' && (
                <button
                  onClick={() => handleAdvanceStatus('scheduled', booking.deliveryMethod === 'courier' ? 'Kuryer vaxtı təyin edildi.' : 'Şəxsi təhvil vaxtı təsdiqləndi.')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Təhvil / Kuryer Vaxtını Təyin Et
                </button>
              )}

              {booking.currentStatus === 'scheduled' && (
                <button
                  onClick={() => handleAdvanceStatus('inspected', 'Əşyalar ünvanda yoxlanıldı, foto-akt tərtib edildi və plomblanma aparıldı.')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Yoxlanışı və Plomblamanı Təsdiqlə
                </button>
              )}

              {booking.currentStatus === 'inspected' && (
                <button
                  onClick={() => handleAdvanceStatus('received_at_storage', 'Əşyalar anbara çatdırıldı və qəbul edildi.')}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Anbara Qəbulu Qeydə Al
                </button>
              )}

              {booking.currentStatus === 'received_at_storage' && (
                <button
                  onClick={() => handleAdvanceStatus('item_stored', 'Əşyalar xüsusi rəflərə yerləşdirildi və aktiv saxlanc rejiminə keçirildi.')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Aktiv Saxlanca Keçir
                </button>
              )}

              {booking.currentStatus === 'item_stored' && (
                <button
                  onClick={() => handleAdvanceStatus('return_requested', 'Müştəri əşyaların geri qaytarılmasını tələb etdi.')}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Əşyaların Geri Qaytarılmasını Tələb Et
                </button>
              )}

              {booking.currentStatus === 'return_requested' && (
                <button
                  onClick={() => handleAdvanceStatus('returned', 'Plomb açıldı, əşyalar müştəriyə bütöv şəkildə təhvil verildi.')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Müştəriyə Təhvil Verildiyini Təsdiqlə
                </button>
              )}

              {booking.currentStatus === 'returned' && (
                <button
                  onClick={() => handleAdvanceStatus('completed', 'Rezervasiya uğurla tamamlandı. Tərəflər arasında heç bir iddia yoxdur.')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Rezervasiyanı Tamamla
                </button>
              )}

              {booking.currentStatus === 'completed' && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center">
                  ✓ Rezervasiya tam yekunlaşıb.
                </div>
              )}
            </div>

            {/* Quick reset status to initial state */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => updateBookingStatus(booking.id, 'created', 'Status ilkin mərhələyə qaytarıldı.')}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Statusu İlkin Mərhələyə Qaytar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
