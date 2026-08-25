import React, { useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AudioShowcase } from './components/AudioShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SampleMixModal } from './components/SampleMixModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('da');
  const [selectedService, setSelectedService] = useState<string>('Gratis Test-Mix');
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    if (lang === 'da') {
      if (selectedService.includes('Sample') || selectedService.includes('Test')) {
        setSelectedService('Gratis Test-Mix');
      }
    } else {
      if (selectedService.includes('Test') || selectedService.includes('Sample')) {
        setSelectedService('Free Sample Mix');
      }
    }
  };

  const handleSelectServiceFromPricing = (serviceName: string) => {
    setSelectedService(serviceName);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimSample = () => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      setIsSampleModalOpen(true);
    } else {
      setSelectedService(currentLang === 'da' ? 'Gratis Test-Mix' : 'Free Sample Mix');
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsSampleModalOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#e2e2e2] selection:bg-[#FF9F0A] selection:text-black flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          currentLang={currentLang}
          onClaimSample={handleClaimSample}
        />

        {/* 2. Audio Showcase with A/B Comparison */}
        <AudioShowcase currentLang={currentLang} />

        {/* 3. Digital Client Hub Workflow */}
        <WorkflowSection
          currentLang={currentLang}
          onGetStarted={() => {
            const contactEl = document.getElementById('contact');
            if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Transparent Pricing */}
        <PricingSection
          currentLang={currentLang}
          onSelectService={handleSelectServiceFromPricing}
        />

        {/* 5. Contact / Booking Form */}
        <ContactSection
          currentLang={currentLang}
          selectedService={selectedService}
          onServiceChange={(service) => setSelectedService(service)}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Quick Sample Mix Modal */}
      <SampleMixModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
