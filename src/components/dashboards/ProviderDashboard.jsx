import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle2, XCircle, 
  Box, Scale, Thermometer, ShieldCheck, DollarSign, Calendar, 
  MapPin, X, AlertCircle, ArrowRight 
} from 'lucide-react';

export default function ProviderDashboard() {
  const { 
    listings, 
    addListing, 
    updateListing, 
    deleteListing, 
    togglePublishListing, 
    bookings, 
    updateBookingStatus, 
    currentUser, 
    navigateTo 
  } = useApp();

  // Modal state for Create / Edit listing
  const [modalOpen, setModalOpen] = useState(false);
  const [editingListingId, setEditingListingId] = useState(null);

  // Form state
  const defaultFormData = {
    title: "",
    storageType: "saxlanc_otagi",
    city: "Bakı",
    district: "Nərimanov",
    address: "",
    description: "",
    totalArea: 20,
    availableArea: 16,
    availableVolume: 40,
    maxWeight: 3000,
    doorDimensions: { width: 140, height: 220 },
    climateType: "heated_and_cooled",
    climateLabel: "Sabit İstilik və Soyutma",
    humidityControl: true,
    ventilation: true,
    security: ["24/7 Video Nəzarət", "Elektron Giriş", "Mühafizəçi"],
    pricePerDay: 7.50,
    pricePerMonth: 190.00,
    minDurationDays: 3,
    maxDurationDays: 365,
    allowFragile: true,
    fragileHandlingEquipment: "Qoruyucu altlıqlar və xüsusi metal rəflər",
    restrictedItems: ["Yanıcı mayelər", "Toksik maddələr"],
    accessHours: "08:00 - 22:00",
    images: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
  };

  const [formData, setFormData] = useState(defaultFormData);

  // Filter listings belonging to provider (or show all in demo if role is provider/both/admin)
  const providerListings = listings.filter(l => l.providerId === currentUser?.id || currentUser?.role === 'provider' || currentUser?.role === 'both' || currentUser?.role === 'admin');

  // Filter booking requests related to provider's listings
  const providerBookings = bookings.filter(b => b.providerId === currentUser?.id || currentUser?.role === 'provider' || currentUser?.role === 'both' || currentUser?.role === 'admin');

  const openCreateModal = () => {
    setEditingListingId(null);
    setFormData(defaultFormData);
    setModalOpen(true);
  };

  const openEditModal = (listing) => {
    setEditingListingId(listing.id);
    setFormData({
      title: listing.title,
      storageType: listing.storageType,
      city: listing.city,
      district: listing.district,
      address: listing.address,
      description: listing.description,
      totalArea: listing.totalArea,
      availableArea: listing.availableArea,
      availableVolume: listing.availableVolume,
      maxWeight: listing.maxWeight,
      doorDimensions: listing.doorDimensions || { width: 120, height: 210 },
      climateType: listing.climate?.type || "ordinary",
      climateLabel: listing.climate?.label || "Təbii havalandırma",
      humidityControl: listing.climate?.humidityControl || false,
      ventilation: listing.climate?.ventilation || true,
      security: listing.security || ["Kamera"],
      pricePerDay: listing.pricePerDay,
      pricePerMonth: listing.pricePerMonth || listing.pricePerDay * 30,
      minDurationDays: listing.minDurationDays,
      maxDurationDays: listing.maxDurationDays,
      allowFragile: listing.allowFragile,
      fragileHandlingEquipment: listing.fragileHandlingEquipment || "",
      restrictedItems: listing.restrictedItems || ["Yanıcı mayelər"],
      accessHours: listing.accessHours || "24/7",
      images: listing.images || ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"]
    });
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      climate: {
        type: formData.climateType,
        label: formData.climateLabel,
        humidityControl: formData.humidityControl,
        ventilation: formData.ventilation
      }
    };

    if (editingListingId) {
      updateListing(editingListingId, payload);
    } else {
      addListing(payload);
    }
    setModalOpen(false);
  };

  const handleAcceptBooking = (bId) => {
    updateBookingStatus(bId, 'confirmed', 'Anbar sahibi rezervasiyanı təsdiq etdi və yeri ayırdı.');
  };

  const handleRejectBooking = (bId) => {
    updateBookingStatus(bId, 'created', 'Anbar sahibi sorğunu geri qaytardı (Məkan müvəqqəti məşğuldur).');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Sahibkar İdarəetmə Paneli
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Saxlanc sahələrinizi əlavə edin, redaktə edin və daxil olan icarə sorğularını idarə edin
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Yeni Saxlanc Məkanı Əlavə Et
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Aktiv Məkanlar</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {providerListings.filter(l => l.published).length} / {providerListings.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Bütün elanlar aktivdir</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Daxil Olan Sorğular</span>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {providerBookings.length} rezervasiya
          </div>
          <span className="text-[11px] text-slate-400">Son 30 gün üzrə</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Təxmini Aylıq Gəlir</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {providerBookings.reduce((sum, b) => sum + (b.pricing?.totalAmount || 0), 0).toFixed(2)} ₼
          </div>
          <span className="text-[11px] text-slate-400">Simulyasiya edilmiş gəlir</span>
        </div>
      </div>

      {/* Section A: Incoming Booking Requests */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>Daxil Olan Rezervasiya Sorğuları ({providerBookings.length})</span>
        </h2>

        {providerBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providerBookings.map(b => (
              <div
                key={b.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-600 text-xs">
                    Kod: {b.bookingCode}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Status: {b.currentStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{b.listingTitle}</h4>
                  <div className="text-xs text-slate-500">Müştəri: {b.customerName} ({b.customerPhone})</div>
                  <div className="text-xs text-slate-500">Əşya: {b.item?.name} ({b.item?.weightKg} kq)</div>
                  <div className="text-xs text-slate-500">Tarixlər: {b.startDate} — {b.endDate} ({b.durationDays} gün)</div>
                  <div className="text-xs font-bold text-emerald-600 mt-1">Ödəniş: {b.pricing?.totalAmount?.toFixed(2)} ₼</div>
                </div>

                {/* Provider Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  {b.currentStatus === 'contract_pending' || b.currentStatus === 'created' ? (
                    <>
                      <button
                        onClick={() => handleAcceptBooking(b.id)}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Təsdiq Et
                      </button>
                      <button
                        onClick={() => handleRejectBooking(b.id)}
                        className="flex-1 py-1.5 border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        İmtina Et
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigateTo('booking-tracking', { bookingId: b.id })}
                      className="w-full py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>İzləmə Panelinə Keç</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            Hələlik yeni rezervasiya sorğusu yoxdur.
          </div>
        )}
      </div>

      {/* Section B: My Storage Listings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Box className="w-5 h-5 text-blue-500" />
          <span>Mənim Saxlanc Məkanlarım ({providerListings.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providerListings.map(listing => (
            <div
              key={listing.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl border transition-all overflow-hidden flex flex-col justify-between shadow-sm ${
                listing.published ? 'border-slate-200 dark:border-slate-700' : 'border-amber-300 dark:border-amber-900 opacity-60'
              }`}
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                    listing.published ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-900'
                  }`}>
                    {listing.published ? "Dərc Edilib" : "Gizlədilib"}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-xs text-slate-400">{listing.city}, {listing.district}</div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{listing.title}</h3>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Sahə: {listing.availableArea} m² | Həcm: {listing.availableVolume} m³
                  </div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {listing.pricePerDay.toFixed(2)} ₼ <span className="text-xs font-normal text-slate-500">/ gün</span>
                  </div>
                </div>
              </div>

              {/* Management actions: Edit, Toggle Publish, Delete */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2">
                <button
                  onClick={() => togglePublishListing(listing.id)}
                  className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
                  title={listing.published ? "Dərcdən çıxar" : "Dərc et"}
                >
                  {listing.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => openEditModal(listing)}
                  className="flex-1 py-1.5 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Redaktə Et
                </button>

                <button
                  onClick={() => deleteListing(listing.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Elanı sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create or Edit Listing Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingListingId ? "Saxlanc Məkanını Redaktə Et" : "Yeni Saxlanc Məkanı Əlavə Et"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Elanın Başlığı</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Məs: Nərimanovda İqlim Nəzarətli Şəxsi Saxlanc Otağı"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Saxlanc Növü</label>
                  <select
                    value={formData.storageType}
                    onChange={(e) => setFormData({ ...formData, storageType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="saxlanc_otagi">Fərdi Saxlanc Otağı / Box</option>
                    <option value="qaraj">Qaraj Sahəsi</option>
                    <option value="anbar">Logistika Anbarı</option>
                    <option value="konteyner">Dəniz Konteyneri</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Şəhər və Rayon</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    >
                      <option value="Bakı">Bakı</option>
                      <option value="Sumqayıt">Sumqayıt</option>
                      <option value="Gəncə">Gəncə</option>
                    </select>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="Rayon"
                      className="px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dəqiq Ünvan</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Məs: Təbriz küçəsi 44, Metro Nərimanov yaxınlığı"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Məkanın Təsviri</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Məkanın vəziyyəti, kimlər üçün uyğun olduğu..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Area, Volume, Max Weight, Price */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Boş Sahə (m²)</label>
                  <input
                    type="number"
                    value={formData.availableArea}
                    onChange={(e) => setFormData({ ...formData, availableArea: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Boş Həcm (m³)</label>
                  <input
                    type="number"
                    value={formData.availableVolume}
                    onChange={(e) => setFormData({ ...formData, availableVolume: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Maks. Yük (kq)</label>
                  <input
                    type="number"
                    value={formData.maxWeight}
                    onChange={(e) => setFormData({ ...formData, maxWeight: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Günlük Qiymət (₼)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold text-blue-600"
                  />
                </div>
              </div>

              {/* Climate & Fragile handling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">İqlim / Temperatur Rejimi</label>
                  <select
                    value={formData.climateType}
                    onChange={(e) => setFormData({ ...formData, climateType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    <option value="ordinary">Otaq temperaturu / Təbii</option>
                    <option value="heated">Qızdırılan sahə</option>
                    <option value="cooled">Soyudulan / Kondisionerli</option>
                    <option value="heated_and_cooled">Sabit İqlim Nəzarəti (20-22°C)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allowFragile}
                      onChange={(e) => setFormData({ ...formData, allowFragile: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-bold text-slate-700 dark:text-slate-300">Kövrək əşyaların qəbuluna icazə verilir</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Ləğv Et
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md"
                >
                  {editingListingId ? "Dəyişiklikləri Yadda Saxla" : "Məkanı Dərc Et"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
