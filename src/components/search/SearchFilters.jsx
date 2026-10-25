import React from 'react';
import { useApp } from '../../context/AppContext';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

export default function SearchFilters() {
  const { searchFilters, setSearchFilters } = useApp();

  const handleReset = () => {
    setSearchFilters({
      city: "Bütün şəhərlər",
      district: "Bütün rayonlar",
      storageType: "all",
      maxPrice: "",
      durationDays: 30,
      climateType: "all",
      onlyFragileSuitable: false
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          <span>Axtarış Filtrləri</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Sıfırla
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* City Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Şəhər
          </label>
          <select
            value={searchFilters.city}
            onChange={(e) => setSearchFilters({ ...searchFilters, city: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Bütün şəhərlər">Bütün şəhərlər</option>
            <option value="Bakı">Bakı</option>
            <option value="Sumqayıt">Sumqayıt</option>
            <option value="Gəncə">Gəncə</option>
          </select>
        </div>

        {/* District Filter (if Baku) */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Rayon / Ərazi
          </label>
          <select
            value={searchFilters.district}
            onChange={(e) => setSearchFilters({ ...searchFilters, district: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Bütün rayonlar">Bütün rayonlar</option>
            <option value="Nərimanov">Nərimanov</option>
            <option value="Yasamal">Yasamal</option>
            <option value="Xətai">Xətai</option>
            <option value="Binəqədi">Binəqədi</option>
            <option value="Səbail">Səbail</option>
          </select>
        </div>

        {/* Max Daily Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Maksimal Günlük Qiymət (₼)
          </label>
          <input
            type="number"
            placeholder="Məs: 20"
            value={searchFilters.maxPrice || ""}
            onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: e.target.value })}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Duration Days */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Planlaşdırılan İcarə Müddəti (gün)
          </label>
          <input
            type="number"
            min="1"
            value={searchFilters.durationDays || 30}
            onChange={(e) => setSearchFilters({ ...searchFilters, durationDays: Number(e.target.value) || 1 })}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        {/* Climate control toggle */}
        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={searchFilters.climateType === 'climate_controlled'}
            onChange={(e) => setSearchFilters({
              ...searchFilters,
              climateType: e.target.checked ? 'climate_controlled' : 'all'
            })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Yalnız İqlim Nəzarətli (İstilik/Soyutma olan)</span>
        </label>

        {/* Fragile suitable only */}
        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={searchFilters.onlyFragileSuitable}
            onChange={(e) => setSearchFilters({
              ...searchFilters,
              onlyFragileSuitable: e.target.checked
            })}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Yalnız Kövrək Əşya Qəbul Edən</span>
        </label>
      </div>
    </div>
  );
}
