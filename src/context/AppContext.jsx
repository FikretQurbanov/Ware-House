import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, INITIAL_LISTINGS, INITIAL_BOOKINGS } from '../data/mockData';
import { generateBookingCode } from '../utils/matchingEngine';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Theme State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('depotap_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('depotap_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('depotap_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // 2. Users & Current User
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('depotap_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('depotap_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default: Leyla (Customer)
  });

  useEffect(() => {
    localStorage.setItem('depotap_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('depotap_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Quick switch role / user helper for prototype demo
  const switchUser = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      showToast(`İstifadəçi dəyişdirildi: ${found.name} (${found.role})`, 'info');
    }
  };

  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      showToast(`Xoş gəlmisiniz, ${user.name}!`, 'success');
      return { success: true };
    }
    return { success: false, error: "Daxil edilmiş e-poçt ünvanı ilə istifadəçi tapılmadı." };
  };

  const register = (userData) => {
    const exists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      return { success: false, error: "Bu e-poçt ünvanı artıq qeydiyyatdan keçib." };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+994 50 000 00 00",
      city: userData.city || "Bakı",
      role: userData.role || "customer",
      bio: userData.bio || "Yeni qeydiyyatdan keçmiş istifadəçi.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    showToast("Qeydiyyat uğurla tamamlandı!", "success");
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("Hesabdan çıxış edildi.", "info");
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    showToast("Profil məlumatları yeniləndi.", "success");
  };

  // 3. Listings State
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('depotap_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  useEffect(() => {
    localStorage.setItem('depotap_listings', JSON.stringify(listings));
  }, [listings]);

  const addListing = (newListingData) => {
    const id = `listing-${Date.now()}`;
    const newListing = {
      ...newListingData,
      id,
      providerId: currentUser?.id || "user-2",
      providerName: currentUser?.name || "Elmir Qasımov",
      providerPhone: currentUser?.phone || "+994 55 876 54 32",
      providerRating: 5.0,
      published: true,
      reviewCount: 0,
      rating: 5.0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setListings(prev => [newListing, ...prev]);
    showToast("Yeni saxlanc məkanı uğurla əlavə edildi və dərc olundu!", "success");
    return newListing;
  };

  const updateListing = (id, updatedFields) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    showToast("Elan məlumatları yeniləndi.", "success");
  };

  const deleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
    showToast("Elan silindi.", "info");
  };

  const togglePublishListing = (id) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.published;
        showToast(nextState ? "Elan təkrar dərc edildi." : "Elan dərcdən çıxarıldı.", "info");
        return { ...item, published: nextState };
      }
      return item;
    }));
  };

  // 4. Bookings State
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('depotap_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem('depotap_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (bookingData) => {
    const existingCodes = bookings.map(b => b.bookingCode);
    const uniqueCode = generateBookingCode(existingCodes);
    const id = `booking-${Date.now()}`;
    const contractId = `DTC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      ...bookingData,
      id,
      bookingCode: uniqueCode,
      contractId,
      contractSignedAt: new Date().toLocaleString('az-AZ'),
      contractStatus: "signed_electronically",
      currentStatus: "created",
      timeline: [
        {
          status: "created",
          date: new Date().toLocaleString('az-AZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          title: "Rezervasiya yaradıldı",
          desc: "Müştəri rezervasiya sorğusunu təsdiqlədi."
        },
        {
          status: "contract_pending",
          date: new Date().toLocaleString('az-AZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          title: "Rəqəmsal müqavilə imzalandı",
          desc: "Tərəflər demo saxlanc şərtlərini təsdiqlədi."
        }
      ],
      handoverDetails: {
        sealNumber: `AZ-PL-${Math.floor(1000 + Math.random() * 9000)}`,
        inspectedBy: bookingData.deliveryMethod === 'courier' ? "DepoTap Kuryer Nəzarətçisi" : "Şəxsi təhvil (Müştəri və Sahibi)",
        inspectionDate: "Gözlənilir",
        checklist: [
          { label: "Qablaşdırma bütövdür və zədələnməyib", checked: false },
          { label: "Kövrək əşya xəbərdarlıq nişanı yapışdırılıb", checked: false },
          { label: "Çəki və həcm bəyan edilən parametrlərə uyğundur", checked: false },
          { label: "Təhlükəsizlik plombları vurulub", checked: false }
        ],
        inspectionNotes: "Təhvil görüşü zamanı yoxlanılacaq.",
        photos: bookingData.item?.photos || []
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedBookingId(newBooking.id);
    showToast(`Rezervasiya uğurla tamamlandı! Kod: ${uniqueCode}`, "success");
    return newBooking;
  };

  const updateBookingStatus = (bookingId, nextStatus, customDesc = null) => {
    const statusTitles = {
      created: "Rezervasiya yaradıldı",
      contract_pending: "Rəqəmsal müqavilə razılaşdırıldı",
      confirmed: "Rezervasiya təsdiqləndi",
      scheduled: "Təhvil / Kuryer vaxtı planlandı",
      inspected: "Əşya yoxlanıldı və sənədləşdirildi",
      received_at_storage: "Əşya anbara daxil oldu",
      item_stored: "Əşya aktiv saxlanılır",
      return_requested: "Qaytarılma tələb edildi",
      returned: "Əşya müştəriyə təhvil verildi",
      completed: "Rezervasiya uğurla tamamlandı"
    };

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const dateStr = new Date().toLocaleString('az-AZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const newEntry = {
          status: nextStatus,
          date: dateStr,
          title: statusTitles[nextStatus] || nextStatus,
          desc: customDesc || `Status ${statusTitles[nextStatus] || nextStatus} olaraq yeniləndi.`
        };
        return {
          ...b,
          currentStatus: nextStatus,
          timeline: [...b.timeline, newEntry]
        };
      }
      return b;
    }));

    showToast(`Status yeniləndi: ${statusTitles[nextStatus] || nextStatus}`, "info");
  };

  const updateHandoverInspection = (bookingId, updatedDetails) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          handoverDetails: {
            ...b.handoverDetails,
            ...updatedDetails
          }
        };
      }
      return b;
    }));
    showToast("Təhvil və yoxlanış aktı sənədləşdirildi.", "success");
  };

  // 5. Navigation & Selection State
  const [activePage, setActivePage] = useState('home');
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Customer item query (Wizard / Search state)
  const [customerItem, setCustomerItem] = useState({
    name: "Qonaq otağı mebeli və arxiv qutuları",
    category: "mebel_ve_ev",
    weightKg: 120,
    dimensionsCm: { length: 160, width: 80, height: 90 },
    volumeM3: 1.15,
    isFragile: true,
    requiredClimate: "ordinary", // none, ordinary, heated, cooled, heated_and_cooled
    notes: "Qutuların üzərində nömrələnmə var.",
    photos: []
  });

  // Search filters
  const [searchFilters, setSearchFilters] = useState({
    city: "Bütün şəhərlər",
    district: "Bütün rayonlar",
    storageType: "all",
    maxPrice: "",
    durationDays: 30,
    climateType: "all",
    onlyFragileSuitable: false
  });

  // 6. Toast & Simulated Email Notification Modal
  const [toast, setToast] = useState(null);
  const [simulatedEmail, setSimulatedEmail] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openSimulatedEmail = (booking) => {
    setSimulatedEmail(booking);
  };

  const closeSimulatedEmail = () => {
    setSimulatedEmail(null);
  };

  // Reset to default demo state
  const resetToDemoDefaults = () => {
    localStorage.removeItem('depotap_listings');
    localStorage.removeItem('depotap_bookings');
    localStorage.removeItem('depotap_users');
    localStorage.removeItem('depotap_current_user');
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setListings(INITIAL_LISTINGS);
    setBookings(INITIAL_BOOKINGS);
    showToast("Bütün demo məlumatlar ilkin vəziyyətə qaytarıldı.", "info");
  };

  const navigateTo = (page, params = {}) => {
    if (params.listingId) setSelectedListingId(params.listingId);
    if (params.bookingId) setSelectedBookingId(params.bookingId);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        users,
        currentUser,
        switchUser,
        login,
        register,
        logout,
        updateProfile,
        listings,
        addListing,
        updateListing,
        deleteListing,
        togglePublishListing,
        bookings,
        createBooking,
        updateBookingStatus,
        updateHandoverInspection,
        activePage,
        setActivePage,
        navigateTo,
        selectedListingId,
        setSelectedListingId,
        selectedBookingId,
        setSelectedBookingId,
        customerItem,
        setCustomerItem,
        searchFilters,
        setSearchFilters,
        toast,
        showToast,
        simulatedEmail,
        openSimulatedEmail,
        closeSimulatedEmail,
        resetToDemoDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
