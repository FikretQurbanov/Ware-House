import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { calculateVolume, calculateArea } from '../../utils/matchingEngine';
import { 
  Package, Scale, Maximize2, ShieldAlert, Thermometer, 
  Upload, Sparkles, Check, Info, FileText 
} from 'lucide-react';

export default function ItemDescriptorWizard({ onSearch }) {
  const { customerItem, setCustomerItem } = useApp();
  const [photoSimulationName, setPhotoSimulationName] = useState(
    customerItem.photos?.length > 0 ? "mebel_ve_eshyalar.jpg" : ""
  );

  const handleDimensionChange = (key, val) => {
    const num = Math.max(0, Number(val) || 0);
    const updatedDims = {
      ...customerItem.dimensionsCm,
      [key]: num
    };
    const newVol = calculateVolume(updatedDims.length, updatedDims.width, updatedDims.height);
    setCustomerItem(prev => ({
      ...prev,
      dimensionsCm: updatedDims,
      volumeM3: newVol
    }));
  };

  const handleSimulatedPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoSimulationName(file.name);
      // Use sample realistic image
      setCustomerItem(prev => ({
        ...prev,
        photos: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"]
      }));
    }
  };

  const applyPreset = (preset) => {
    setCustomerItem({
      ...customerItem,
      ...preset,
      volumeM3: calculateVolume(preset.dimensionsCm.length, preset.dimensionsCm.width, preset.dimensionsCm.height)
    });
  };

  const presets = [
    {
      name: "Qonaq otağı mebeli və 4 qutu çini",
      category: "mebel_ve_ev",
      weightKg: 180,
      dimensionsCm: { length: 200, width: 90, height: 85 },
      isFragile: true,
      requiredClimate: "heated_and_cooled",
      notes: "Çini qablar və bahalı taxta mebel"
    },
    {
      name: "2 ədəd dağ velosipedi və qış təkərləri",
      category: "idman_ve_avto",
      weightKg: 65,
      dimensionsCm: { length: 180, width: 70, height: 110 },
      isFragile: false,
      requiredClimate: "ordinary",
      notes: "Təmiz quru mühit yetərlidir"
    },
    {
      name: "Maliyyə arxivi (35 karton qovluq qutusu)",
      category: "sened_ve_arxiv",
      weightKg: 110,
      dimensionsCm: { length: 140, width: 80, height: 120 },
      isFragile: true,
      requiredClimate: "heated",
      notes: "Rütubətsiz və quru saxlanc mütləqdir"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
              <Package className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Saxlanacaq Əşyanın Təsviri və Parametrləri
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Əşyanın dəqiq ölçüləri və xüsusiyyətləri yalnız tam uyğun gələn anbarların tapılması üçün istifadə olunur.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Hazır nümunələr:
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-700 dark:hover:bg-blue-900/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors border border-slate-200 dark:border-slate-600"
            >
              {idx === 0 ? "Mebel & Çini" : idx === 1 ? "Velosipedlər" : "Sənəd Arxivi"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Item Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Əşyanın Adı və ya Qısa Təsviri
          </label>
          <input
            type="text"
            value={customerItem.name}
            onChange={(e) => setCustomerItem({ ...customerItem, name: e.target.value })}
            placeholder="Məs: 2 divan, 6 qutu qab-qacaq və televizor"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Kateqoriya
          </label>
          <select
            value={customerItem.category}
            onChange={(e) => setCustomerItem({ ...customerItem, category: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Dimensions & Weight Grid */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-blue-500" />
            Ölçülər və Çəki Hesablaması
          </span>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-normal">
            Həcm və sahə avtomatik hesablanır
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Uzunluq (sm)
            </label>
            <input
              type="number"
              min="1"
              value={customerItem.dimensionsCm?.length || ""}
              onChange={(e) => handleDimensionChange('length', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              En (sm)
            </label>
            <input
              type="number"
              min="1"
              value={customerItem.dimensionsCm?.width || ""}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Hündürlük (sm)
            </label>
            <input
              type="number"
              min="1"
              value={customerItem.dimensionsCm?.height || ""}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Çəki (kq)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={customerItem.weightKg || ""}
                onChange={(e) => setCustomerItem({ ...customerItem, weightKg: Number(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
              <span className="absolute right-2.5 top-2 text-xs text-slate-400">kq</span>
            </div>
          </div>
        </div>

        {/* Calculated Volume & Area tags */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
          <div className="px-3 py-1.5 rounded-lg bg-blue-100/60 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-medium">
            Tələb olunan həcm: <strong className="text-blue-700 dark:text-blue-300 font-mono text-sm">{customerItem.volumeM3 || 0} m³</strong>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium">
            Təxmini döşəmə sahəsi: <strong className="font-mono text-sm">
              {calculateArea(customerItem.dimensionsCm?.length, customerItem.dimensionsCm?.width)} m²
            </strong>
          </div>
        </div>
      </div>

      {/* Fragility & Climate Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Fragile check */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
          <input
            type="checkbox"
            id="fragile-check"
            checked={customerItem.isFragile}
            onChange={(e) => setCustomerItem({ ...customerItem, isFragile: e.target.checked })}
            className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
          />
          <div>
            <label htmlFor="fragile-check" className="text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Kövrək və ya xüsusi qayğı tələb edən əşyadır
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              İşarələnsə, yalnız xüsusi rəfləri və ehtiyatlı təhvil təchizatı olan məkanlar seçiləcək.
            </p>
          </div>
        </div>

        {/* Climate condition */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Thermometer className="w-4 h-4 text-blue-500" />
            Tələb olunan Saxlanc Şəraiti
          </label>
          <select
            value={customerItem.requiredClimate}
            onChange={(e) => setCustomerItem({ ...customerItem, requiredClimate: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="none">Xüsusi temperatur tələbi yoxdur (Qaraj/Konteyner də uyğundur)</option>
            <option value="ordinary">Otaq temperaturu (Təbii quru mühit)</option>
            <option value="heated">Qızdırılan sahə (Qışda donmadan qorunma)</option>
            <option value="cooled">Soyudulan / Kondisionerli sahə (Yayda sərin mühit)</option>
            <option value="heated_and_cooled">Sabit İqlim Nəzarəti (Həm istilik, həm də soyutma 20-22°C)</option>
          </select>
        </div>
      </div>

      {/* Optional Notes & Photo simulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Əlavə Qeydlər (İxtiyari)
          </label>
          <input
            type="text"
            value={customerItem.notes || ""}
            onChange={(e) => setCustomerItem({ ...customerItem, notes: e.target.value })}
            placeholder="Məs: Qutuların üst-üstə qoyulması qadağandır"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Əşyanın Şəkli (Foto-akt simulyasiyası)
          </label>
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-xs text-slate-600 dark:text-slate-300 transition-colors">
              <Upload className="w-4 h-4 text-blue-500" />
              <span>{photoSimulationName || "Şəkil yüklə və ya fayl seç"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatedPhotoUpload}
                className="hidden"
              />
            </label>
            {photoSimulationName && (
              <span className="p-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
