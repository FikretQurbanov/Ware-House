import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Warehouse, Search, CalendarCheck, PlusCircle, Sun, Moon, 
  User, LogOut, LogIn, Menu, X, Shield, LayoutDashboard, ChevronDown
} from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { 
    darkMode, 
    toggleDarkMode, 
    currentUser, 
    logout, 
    activePage, 
    navigateTo 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const isProviderOrBoth = currentUser && (currentUser.role === 'provider' || currentUser.role === 'both' || currentUser.role === 'admin');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Warehouse className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DepoTap
              </span>
              <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded">
                Azerbaijan
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'home'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Ana Səhifə
            </button>

            <button
              onClick={() => navigateTo('search')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activePage === 'search'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              Saxlanc Axtar
            </button>

            <button
              onClick={() => navigateTo('customer-dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activePage === 'customer-dashboard'
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Rezervasiyalarım
            </button>

            {isProviderOrBoth && (
              <button
                onClick={() => navigateTo('provider-dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activePage === 'provider-dashboard'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Məkanlarım
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activePage === 'admin-dashboard'
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Shield className="w-4 h-4 text-amber-500" />
                Admin
              </button>
            )}
          </nav>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Açıq rejimə keç" : "Qaranlıq rejimə keç"}
              aria-label="Rejimi dəyiş"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* List Your Space CTA button */}
            <button
              onClick={() => {
                if (isProviderOrBoth) {
                  navigateTo('provider-dashboard');
                } else {
                  navigateTo('provider-dashboard');
                }
              }}
              className="hidden lg:flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Yerini İcarəyə Ver
            </button>

            {/* User Account / Auth buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/30 flex-shrink-0"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize leading-tight">
                      {currentUser.role === 'customer' ? 'Müştəri' : currentUser.role === 'provider' ? 'Sahibkar' : currentUser.role === 'both' ? 'Hər ikisi' : 'Admin'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{currentUser.name}</p>
                      <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => { navigateTo('profile'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <User className="w-4 h-4 text-blue-500" />
                        Profil və Parametrlər
                      </button>

                      <button
                        onClick={() => { navigateTo('customer-dashboard'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <CalendarCheck className="w-4 h-4 text-indigo-500" />
                        Rezervasiyalarım
                      </button>

                      {isProviderOrBoth && (
                        <button
                          onClick={() => { navigateTo('provider-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                          Sahibkar Paneli
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => { navigateTo('admin-dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4 text-amber-500" />
                          Sistem Admin Paneli
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Çıxış Et
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                >
                  Giriş
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Qeydiyyat
                </button>
              </div>
            )}

            {/* Mobile menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
            {!currentUser && (
              <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 flex gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="w-1/2 py-2 text-center text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                >
                  Giriş
                </button>
                <button
                  onClick={() => openAuth('register')}
                  className="w-1/2 py-2 text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm"
                >
                  Qeydiyyat
                </button>
              </div>
            )}
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                activePage === 'home' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              Ana Səhifə
            </button>
            <button
              onClick={() => { navigateTo('search'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                activePage === 'search' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Search className="w-4 h-4" />
              Saxlanc Axtar
            </button>
            <button
              onClick={() => { navigateTo('customer-dashboard'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                activePage === 'customer-dashboard' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Rezervasiyalarım
            </button>

            {isProviderOrBoth && (
              <button
                onClick={() => { navigateTo('provider-dashboard'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                  activePage === 'provider-dashboard' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Məkanlarım
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { navigateTo('admin-dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-amber-600"
              >
                <Shield className="w-4 h-4" />
                Admin Paneli
              </button>
            )}

            <button
              onClick={() => { navigateTo('provider-dashboard'); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Yerini İcarəyə Ver
            </button>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
