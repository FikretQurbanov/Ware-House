import React from 'react';
import { useApp } from '../../context/AppContext';
import ListingCard from '../search/ListingCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RecommendedListings() {
  const { listings, navigateTo } = useApp();

  const publishedListings = listings.filter(l => l.published);
  const featured = publishedListings.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Ən Çox Tələb Olunan Məkanlar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Tövsiyə Edilən Saxlanc Sahələri
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Yüksək reytinqə və 24/7 mühafizəyə malik ən etibarlı məkanlar
            </p>
          </div>

          <button
            onClick={() => navigateTo('search')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 self-start sm:self-auto"
          >
            Bütün məkanlara bax ({publishedListings.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              customerItem={null}
              searchFilters={{}}
              showMatchDetails={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
