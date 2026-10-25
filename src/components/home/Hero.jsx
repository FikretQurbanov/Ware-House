import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, PlusCircle, ShieldCheck, Truck, FileCheck, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const { navigateTo, searchFilters, setSearchFilters } = useApp();

  const handleQuickSearch = (e) => {
    e.preventDefault();
    navigateTo('search');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide border border-blue-200 dark:border-blue-800">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Azərbaycanın Etibarlı Saxlanc Şəbəkəsi</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Əşyalarınız üçün <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">təhlükəsiz saxlanc yeri</span> tapın və ya boş yerinizi icarəyə verin
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Qaraj, anbar və fərdi otaqları asanlıqla icarələyin. Ünvandan kuryerlə qəbul, rəqəmsal müqavilə və təhlükəsizlik plombları ilə rahatlığınız təmin olunur.
          </p>

          {/* 2 Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('search')}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Saxlanc Yeri Axtar
            </button>
            <button
              onClick={() => navigateTo('provider-dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Öz Yerini İcarəyə Ver
            </button>
          </div>
        </div>

        {/* Quick Search & Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700 p-3 sm:p-4 backdrop-blur">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 px-1">
                Şəhər / Rayon
              </label>
              <select
                value={searchFilters.city}
                onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Bütün şəhərlər">Bütün şəhərlər (Bakı, Sumqayıt...)</option>
                <option value="Bakı">Bakı</option>
                <option value="Sumqayıt">Sumqayıt</option>
                <option value="Gəncə">Gəncə</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 px-1">
                Saxlanc Növü
              </label>
              <select
                value={searchFilters.storageType}
                onChange={(e) => setSearchFilters({ ...searchFilters, storageType: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="all">Bütün növlər</option>
                <option value="saxlanc_otagi">Fərdi Saxlanc Otağı / Box</option>
                <option value="qaraj">Qaraj Sahəsi</option>
                <option value="anbar">Kommersiya Anbarı</option>
                <option value="konteyner">Mühafizəli Konteyner</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 px-4 font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Məkanları Tap
              </button>
            </div>
          </form>
        </div>

        {/* 3 Pillar Highlights below hero */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Kuryer Daşınması</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Əşyalar birbaşa qapınızdan təhvil götürülür.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Plomblanmış Qoruma</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Xüsusi nömrəli təhlükəsizlik plombları və foto-akt.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Rəqəmsal Müqavilə</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hər iki tərəf üçün aydın elektron şərtlər və qəbz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
