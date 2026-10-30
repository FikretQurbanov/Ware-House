import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, Database, Users, Box, CalendarCheck, 
  RefreshCw, Trash2, CheckCircle2, AlertTriangle, ArrowRight 
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    listings, 
    bookings, 
    users, 
    deleteListing, 
    updateBookingStatus, 
    resetToDemoDefaults, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'listings' | 'users'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>Sistem İdarəetmə Paneli (Admin)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            DepoTap Platforma Monitorinqi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Bütün aktiv və arxivlənmiş elanlar, müştəri rezervasiyaları və demo bazanın idarə olunması
          </p>
        </div>

        <button
          onClick={resetToDemoDefaults}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Bütün Demo Bazanı Sıfırla
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Ümumi Rezervasiyalar</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{bookings.length}</div>
          <span className="text-[11px] text-blue-500">Aktiv dövriyyə</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Saxlanc Məkanları</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{listings.length}</div>
          <span className="text-[11px] text-emerald-500">{listings.filter(l => l.published).length} aktiv</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Qeydiyyatlı İstifadəçilər</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</div>
          <span className="text-[11px] text-slate-400">Demo profillər</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400 block mb-1">Cəmi Xidmət Həcmi</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {bookings.reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0).toFixed(2)} ₼
          </div>
          <span className="text-[11px] text-slate-400">Platforma dövriyyəsi</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto max-w-full">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'bookings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Rezervasiyalar ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'listings'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Saxlanc Elanları ({listings.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          İstifadəçilər ({users.length})
        </button>
      </div>

      {/* Tab 1: Bookings Management */}
      {activeTab === 'bookings' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500">
              <tr>
                <th className="p-3.5">Kod</th>
                <th className="p-3.5">Müştəri</th>
                <th className="p-3.5">Məkan</th>
                <th className="p-3.5">Tarix Aralığı</th>
                <th className="p-3.5">Məbləğ</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                  <td className="p-3.5 font-mono font-bold text-blue-600">{b.bookingCode}</td>
                  <td className="p-3.5 font-medium">{b.customerName}</td>
                  <td className="p-3.5 max-w-xs truncate">{b.listingTitle}</td>
                  <td className="p-3.5 text-slate-500">{b.startDate} — {b.endDate}</td>
                  <td className="p-3.5 font-mono font-bold">{b.pricing?.totalAmount?.toFixed(2)} ₼</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {b.currentStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => navigateTo('booking-tracking', { bookingId: b.id })}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 text-slate-700 dark:text-slate-200 rounded text-xs font-bold"
                    >
                      Bax
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Listings Management */}
      {activeTab === 'listings' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500">
              <tr>
                <th className="p-3.5">ID</th>
                <th className="p-3.5">Məkan Başlığı</th>
                <th className="p-3.5">Sahibi</th>
                <th className="p-3.5">Ünvan</th>
                <th className="p-3.5">Günlük Qiymət</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {listings.map(l => (
                <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50">
                  <td className="p-3.5 font-mono text-slate-400">{l.id}</td>
                  <td className="p-3.5 font-bold">{l.title}</td>
                  <td className="p-3.5">{l.providerName}</td>
                  <td className="p-3.5 text-slate-500">{l.city}, {l.district}</td>
                  <td className="p-3.5 font-mono font-bold text-blue-600">{l.pricePerDay.toFixed(2)} ₼</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      l.published ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {l.published ? "Dərc edilib" : "Gizli"}
                    </span>
                  </td>
                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => navigateTo('listing-details', { listingId: l.id })}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-xs font-bold"
                    >
                      Bax
                    </button>
                    <button
                      onClick={() => deleteListing(l.id)}
                      className="px-2 py-1 bg-rose-50 text-rose-600 rounded text-xs font-bold hover:bg-rose-100"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500">
              <tr>
                <th className="p-3.5">İstifadəçi</th>
                <th className="p-3.5">E-poçt</th>
                <th className="p-3.5">Telefon</th>
                <th className="p-3.5">Rol</th>
                <th className="p-3.5">Qeydiyyat Tarixi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="p-3.5 font-bold flex items-center gap-2">
                    <img src={u.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-500">{u.email}</td>
                  <td className="p-3.5 text-slate-500">{u.phone}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
