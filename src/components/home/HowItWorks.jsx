import React from 'react';
import { Box, Search, Truck, KeyRound, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HowItWorks() {
  const { navigateTo } = useApp();

  const steps = [
    {
      step: "01",
      icon: <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Əşyanızı Təsvir Edin",
      desc: "Nə saxlamaq istədiyinizi, təxmini çəki, həcm və temperatur tələblərini daxil edin. Ağıllı alqoritmimiz ən uyğun yeri təklif edəcək."
    },
    {
      step: "02",
      icon: <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Məkanı Seçin və Razılaşın",
      desc: "Şəkillərə, reytinqlərə, təhlükəsizlik və iqlim imkanlarına baxın. Müddəti və büdcənizə uyğun qiyməti seçin."
    },
    {
      step: "03",
      icon: <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Təhvil və Ya Kuryer Daşınması",
      desc: "Əşyanı şəxsən gətirin və ya DepoTap Kuryer xidmətini sifariş edin. Əşyalar yoxlanılır, foto-akt tərtib edilir və plomblanır."
    },
    {
      step: "04",
      icon: <KeyRound className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "24/7 Nəzarət və Qaytarılma",
      desc: "Əşyalarınızın statusunu onlayn izləyin. İstədiyiniz vaxt bir kliklə geri qaytarılma sifarişi verin."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
            Sadə və Şəffaf Proses
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            DepoTap Necə İşləyir?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Əşyalarınızı saxlatmaq heç vaxt bu qədər asan, təhlükəsiz və rəqəmsal olmamışdı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {st.icon}
                </div>
                <span className="text-2xl font-black text-slate-200 dark:text-slate-700 font-mono">
                  {st.step}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                {st.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('search')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            İndi axtarışa başla
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
