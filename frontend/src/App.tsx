import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useAuthQueries';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import GallerySection from './components/GallerySection';
import DonateSection from './components/DonateSection';
import ContactSection from './components/ContactSection';
import GeometricDivider from './components/GeometricDivider';
import Footer from './components/Footer';
import ProfileSetupModal from './components/ProfileSetupModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppContent() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <main>
        <HeroSection />
        <GeometricDivider />
        <AboutSection />
        <GeometricDivider />
        <ServicesSection />
        <GeometricDivider />
        <AnnouncementsSection />
        <GeometricDivider />
        <GallerySection />
        <GeometricDivider />
        <DonateSection />
        <GeometricDivider />
        <ContactSection />
      </main>

      <Footer />

      {showProfileSetup && <ProfileSetupModal open={showProfileSetup} />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
