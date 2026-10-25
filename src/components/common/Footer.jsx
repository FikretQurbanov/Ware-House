import React from 'react';
import { useApp } from '../../context/AppContext';
import { Warehouse, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Warehouse className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">DepoTap</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Azərbaycanın ilk onlayn saxlanc və anbar icarəsi bazarı. Boş qalan qaraj, anbar və otaqları ehtiyacı olan insanlarla birləşdiririk.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Rəqəmsal Müqavilə və Plomblanmış Daşınma</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platforma</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Ana Səhifə
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('search')} className="hover:text-white transition-colors">
                  Saxlanc Yerləri Axtarışı
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('provider-dashboard')} className="hover:text-white transition-colors">
                  Öz Yerini İcarəyə Ver
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('customer-dashboard')} className="hover:text-white transition-colors">
                  Rezervasiyaları İzlə
                </button>
              </li>
            </ul>
          </div>

          {/* Support and legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Kömək və Hüquqi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Tez-tez Verilən Suallar (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Bizimlə Əlaqə
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Rəqəmsal Saxlanc Müqaviləsi Şərtləri
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Məxfilik və Təhlükəsizlik
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Əlaqə</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Bakı şəhəri, Nizami küçəsi 142</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>+994 (12) 555-4321</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>destek@depotap.az</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© 2026 DepoTap. Bütün hüquqlar qorunur. (Frontend Prototip)</p>
          <div className="flex items-center gap-1">
            <span>Fedora Linux mühitində React və Vite ilə yaradıldı</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
