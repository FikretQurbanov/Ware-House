import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ItemDescriptorWizard from './ItemDescriptorWizard';
import SearchFilters from './SearchFilters';
import ListingCard from './ListingCard';
import { evaluateListingMatch } from '../../utils/matchingEngine';
import { CheckCircle2, AlertOctagon, HelpCircle, Layers } from 'lucide-react';

export default function SearchResultsView() {
  const { listings, customerItem, searchFilters } = useApp();
  const [activeTab, setActiveTab] = useState('eligible'); // 'eligible' | 'all'

  const published = listings.filter(l => l.published);

  // Partition listings into eligible vs ineligible based on customer item & criteria
  const evaluated = published.map(listing => {
    const evalResult = evaluateListingMatch(listing, customerItem, searchFilters);
    return {
      listing,
      ...evalResult
    };
  });

  const eligibleListings = evaluated.filter(e => e.isEligible);
  const ineligibleListings = evaluated.filter(e => !e.isEligible);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Ağıllı Saxlanc Yeri Axtarışı və Uyğunlaşdırma
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Əşyanızın parametrlərini qeyd edin — platforma hər bir anbarın qapı ölçüsünü, çəki limitini və iqlim şəraitini yoxlayaraq ən uyğun olanları təqdim edəcək.
        </p>
      </div>

      {/* Step 1: Item Descriptor Wizard */}
      <ItemDescriptorWizard />

      {/* Step 2: Advanced Search Filters */}
      <SearchFilters />

      {/* Step 3: Match Results Section */}
      <div className="space-y-6 pt-4">
        {/* Results summary bar with Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Nəticələr: {eligibleListings.length} uyğun məkan tapıldı</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Əşyanız ({customerItem.weightKg} kq, {customerItem.volumeM3} m³) üçün tam uyğun gələn məkanlar aşağıda sıralanıb.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('eligible')}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-center transition-all ${
                activeTab === 'eligible'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Yalnız Uyğun Olanlar ({eligibleListings.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 sm:py-1.5 rounded-lg text-center transition-all ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Bütün Məkanlar ({published.length})
            </button>
          </div>
        </div>

        {/* List of Eligible Listings */}
        {eligibleListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eligibleListings.map(item => (
              <ListingCard
                key={item.listing.id}
                listing={item.listing}
                customerItem={customerItem}
                searchFilters={searchFilters}
                showMatchDetails={true}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <AlertOctagon className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Daxil edilən parametrlərə uyğun anbar tapılmadı
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Zəhmət olmasa tələb olunan çəki, həcm və ya filtr parametrlərini yumşaldın (məsələn, şəhər filtrini "Bütün şəhərlər" olaraq dəyişin).
            </p>
          </div>
        )}

        {/* Ineligible Listings (shown if user views 'all') */}
        {activeTab === 'all' && ineligibleListings.length > 0 && (
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" />
                <span>Tələblərə Uyğun Gəlməyən Məkanlar ({ineligibleListings.length})</span>
              </h3>
              <p className="text-xs text-slate-500">
                Bu məkanlar əşyanızın çəkisi, qabaritləri və ya tələb etdiyiniz şərait ilə uyğunlaşmır və tövsiyə edilmir.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ineligibleListings.map(item => (
                <ListingCard
                  key={item.listing.id}
                  listing={item.listing}
                  customerItem={customerItem}
                  searchFilters={searchFilters}
                  showMatchDetails={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
