import React from 'react';
import { useApp } from './context/AppContext';
import DemoNoticeBanner from './components/common/DemoNoticeBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import SimulatedEmailModal from './components/common/SimulatedEmailModal';

// Home components
import Hero from './components/home/Hero';
import HowItWorks from './components/home/HowItWorks';
import FeatureHighlights from './components/home/FeatureHighlights';
import RecommendedListings from './components/home/RecommendedListings';

// Search & Listings
import SearchResultsView from './components/search/SearchResultsView';
import ListingDetailsPage from './components/listing/ListingDetailsPage';

// Booking & Contracts
import BookingWizard from './components/booking/BookingWizard';
import ReceiptPage from './components/booking/ReceiptPage';
import DigitalContractPage from './components/booking/DigitalContractPage';
import BookingTrackingPage from './components/booking/BookingTrackingPage';

// Dashboards
import CustomerDashboard from './components/dashboards/CustomerDashboard';
import ProviderDashboard from './components/dashboards/ProviderDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import ProfilePage from './components/dashboards/ProfilePage';
import { FAQPage, ContactPage } from './components/common/StaticPages';

export default function App() {
  const { activePage } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Top Demo Notice Banner */}
      <DemoNoticeBanner />

      {/* Main Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <RecommendedListings />
            <HowItWorks />
            <FeatureHighlights />
          </>
        )}

        {activePage === 'search' && <SearchResultsView />}
        {activePage === 'listing-details' && <ListingDetailsPage />}
        {activePage === 'booking-checkout' && <BookingWizard />}
        {activePage === 'receipt' && <ReceiptPage />}
        {activePage === 'contract' && <DigitalContractPage />}
        {activePage === 'booking-tracking' && <BookingTrackingPage />}
        {activePage === 'customer-dashboard' && <CustomerDashboard />}
        {activePage === 'provider-dashboard' && <ProviderDashboard />}
        {activePage === 'admin-dashboard' && <AdminDashboard />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'faq' && <FAQPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating System Modals & Toasts */}
      <SimulatedEmailModal />
      <Toast />
    </div>
  );
}
