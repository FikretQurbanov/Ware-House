import React from 'react';
import { Truck, ShieldCheck, FileText, CheckCircle2, Lock, Camera, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FeatureHighlights() {
  const { navigateTo } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Courier Delivery Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Qapıdan Qapıya Xidmət</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              Ağır əşyalarla vaxt itirməyin — Kuryerimiz ünvandan götürüb anbara yerləşdirir
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Mebel, texnika və ya arxiv qutularını daşımaq üçün maşın axtarmağa ehtiyac yoxdur. DepoTap-ın təlim keçmiş kuryer komandası əşyalarınızı qapınızda təhvil alır, çəkir, qablaşdırır və təhlükəsiz şəkildə seçdiyiniz anbara çatdırır.
            </p>
            <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Rahat vaxt aralığı seçimi (səhər və ya günortadan sonra)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Kuryerin təhvil zamanı əşyanın ilkin vizual vəziyyətini arxivləməsi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Əşyaların qaytarılması zamanı yenidən qapınıza çatdırılma</span>
              </li>
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
              alt="Anbar və kuryer çatdırılması"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-xs font-mono uppercase text-blue-400">DepoTap Ekspres Kuryer</div>
                <div className="text-base font-bold">Bakı və Abşeron üzrə operativ çatdırılma</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Item Protection & Handover Inspection Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
            <img
              src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&auto=format&fit=crop&q=80"
              alt="Mühafizə və plomblanma"
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <div className="text-xs font-mono uppercase text-emerald-400">Təhlükəsizlik Zəmanəti</div>
                <div className="text-base font-bold">Unikal nömrəli təhlükəsizlik plombu və foto arxiv</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Əşyaların Mühafizəsi və Plomblanma</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              Hər bir əşya təhvil verilərkən nömrəli təhlükəsizlik lenti ilə möhürlənir
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Müştərinin iştirakı ilə əşyanın cari vəziyyəti foto ilə sənədləşdirilir, qutular möhkəm təhlükəsizlik plombları (məs: AZ-PL-8841) ilə bağlanır. Bu plomb yalnız əşya müştəriyə qaytarılarkən onun gözü qarşısında açılır.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <Camera className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Foto Yoxlanış Aktı</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Əvvəlcədən mövcud cızıqlar və qablaşdırma arxivlənir.</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Unikal Plomb Nömrəsi</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Rəqəmsal müqavilədə və qəbzdə qeyd olunan plomb.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Digital Storage Agreement Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Şəffaf Rəqəmsal Müqavilələr</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
              Hər rezervasiyada hər iki tərəfin hüquq və öhdəliklərini əks etdirən rəsmi saziş
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Rezervasiya təsdiqlənən anda sistem tərəfindən elektron müqavilə formalaşdırılır. Obyektin dəqiq ünvanı, qiymət cədvəli, temperatur öhdəlikləri, ləğvetmə və zərər ödənişi qaydaları hər iki tərəf üçün əlçatan olur.
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-blue-900 dark:text-blue-200">Nümunə Rəqəmsal Müqaviləni İncələyin</div>
                <div className="text-[11px] text-blue-700 dark:text-blue-300">Standart 8 maddəlik saxlanc və daşınma razılaşması</div>
              </div>
              <button
                onClick={() => navigateTo('contract', { bookingId: 'booking-01' })}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Müqaviləyə Bax
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg font-mono text-xs text-slate-600 dark:text-slate-300 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold">
              <span>SƏNƏD: DTC-2026-8891</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px] bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                ELEKTRON İMZALANIB
              </span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div><strong>İCARƏDAR:</strong> Elmir Qasımov (VÖEN: 140*****91)</div>
              <div><strong>İCARƏÇİ:</strong> Leyla Məmmədova (FİN: 5K8***2)</div>
              <div><strong>OBYEKT:</strong> Təbriz küçəsi 44, Bakı (Boks № 14)</div>
              <div><strong>İQLLİM:</strong> Sabit İstilik və Soyutma (20°C - 22°C)</div>
              <div><strong>PLOMB:</strong> AZ-PL-8841 (Toxunulmaz)</div>
            </div>
            <div className="pt-2 text-[10px] text-slate-400 italic">
              * Bu sənəd DepoTap platforması vasitəsilə tərtib olunmuş elektron sazişin vizual nümunəsidir.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
