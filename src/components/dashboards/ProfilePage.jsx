import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, Mail, Phone, MapPin, Shield, CheckCircle2, 
  AlertCircle, Save, RefreshCw, Key 
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile, users, switchUser } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    city: currentUser?.city || "Bakı",
    role: currentUser?.role || "customer",
    bio: currentUser?.bio || ""
  });

  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFeedbackMsg("Ad və e-poçt xanaları mütləq doldurulmalıdır.");
      return;
    }
    updateProfile(formData);
    setFeedbackMsg("Profil məlumatları uğurla yeniləndi və localStorage-da yadda saxlanıldı.");
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          İstifadəçi Profili və Parametrlər
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Şəxsi məlumatlarınızı redaktə edin və aktiv hesab rolunuzu təyin edin
        </p>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Settings Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Avatar & Quick info */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-700">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
            alt=""
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {currentUser?.name}
            </h3>
            <p className="text-xs text-slate-400">
              Qeydiyyat tarixi: {currentUser?.createdAt || "2024-01-15"} | Status: Demo İstifadəçi
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Ad və Soyad
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                E-poçt Ünvanı
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Əlaqə Telefonu
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Şəhər
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Bakı">Bakı</option>
                <option value="Sumqayıt">Sumqayıt</option>
                <option value="Gəncə">Gəncə</option>
              </select>
            </div>
          </div>

          {/* Account Role Selector */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Hesabın Əsas Rolu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.role === 'customer'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === 'customer'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="hidden"
                />
                <span className="font-bold text-slate-900 dark:text-white block">Müştəri</span>
                <span className="text-[11px] text-slate-500">Yalnız saxlanc yeri axtaran</span>
              </label>

              <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.role === 'provider'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={formData.role === 'provider'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="hidden"
                />
                <span className="font-bold text-slate-900 dark:text-white block">Sahibkar</span>
                <span className="text-[11px] text-slate-500">Məkanlarını icarəyə verən</span>
              </label>

              <label className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                formData.role === 'both'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40'
                  : 'border-slate-200 dark:border-slate-700'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="both"
                  checked={formData.role === 'both'}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="hidden"
                />
                <span className="font-bold text-slate-900 dark:text-white block">Hər İkisi</span>
                <span className="text-[11px] text-slate-500">Həm axtaran, həm icarəyə verən</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Haqqında Qısa Məlumat (Bio)
            </label>
            <textarea
              rows="2"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Yadda Saxla
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
