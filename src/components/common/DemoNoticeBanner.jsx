import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, UserCheck, Shield, RefreshCw } from 'lucide-react';

export default function DemoNoticeBanner() {
  const { currentUser, switchUser, users, resetToDemoDefaults } = useApp();

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs sm:text-sm py-2 px-4 shadow-inner no-print">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider">
            Demo Prototip
          </span>
          <span className="hidden md:inline text-blue-100">
            Məlumatlar brauzerinizin yerli yaddaşında (localStorage) saxlanılır. Real ödəniş və ya server tələb olunmur.
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-blue-900/60 backdrop-blur px-2.5 py-1 rounded-full border border-blue-400/30">
            <UserCheck className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-blue-200">Aktiv rol:</span>
            <select
              aria-label="Aktiv demo rol seçimi"
              value={currentUser?.id || ""}
              onChange={(e) => switchUser(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              {users.map(u => (
                <option key={u.id} value={u.id} className="text-slate-900">
                  {u.name} ({u.role === 'customer' ? 'Müştəri' : u.role === 'provider' ? 'Sahibkar' : u.role === 'both' ? 'Hər ikisi' : 'Admin'})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={resetToDemoDefaults}
            title="Məlumatları ilkin vəziyyətə sıfırla"
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-xs transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        </div>
      </div>
    </div>
  );
}
