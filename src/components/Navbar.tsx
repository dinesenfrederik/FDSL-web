import React, { useState } from 'react';
import { Menu, X, Disc3 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSampleModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSampleModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang].nav;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="top-nav"
      className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-xl border-b border-[#222228] transition-all duration-200"
    >
      <div className="flex justify-between items-center px-4 sm:px-8 lg:px-16 py-4 max-w-7xl mx-auto">
        {/* Brand */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F0A] rounded-md"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16161A] border border-[#2A2A32] flex items-center justify-center group-hover:border-[#FF9F0A] transition-colors">
            <Disc3 className="w-4 h-4 text-[#FF9F0A] animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <span className="text-white font-bold uppercase tracking-wider text-[15px] font-sans">
            {t.brand}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-[15px]">
          <button
            onClick={() => scrollToSection('showcase')}
            id="nav-link-showcase"
            className="text-white font-semibold hover:text-[#FF9F0A] transition-colors cursor-pointer"
          >
            {t.showcase}
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            id="nav-link-workflow"
            className="text-[#C6C6C7] hover:text-white transition-colors cursor-pointer"
          >
            {t.workflow}
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            id="nav-link-pricing"
            className="text-[#C6C6C7] hover:text-white transition-colors cursor-pointer"
          >
            {t.pricing}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            id="nav-link-contact"
            className="text-[#C6C6C7] hover:text-white transition-colors cursor-pointer"
          >
            {t.contact}
          </button>
        </div>

        {/* Right Section: Language Toggle & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-[#16161A] p-1 rounded-full border border-[#222228] font-mono-tag text-xs">
            <button
              id="btn-lang-en"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-[#FF9F0A] text-black font-bold shadow-sm'
                  : 'text-[#A1A1A1] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              id="btn-lang-da"
              onClick={() => onLanguageChange('da')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                currentLang === 'da'
                  ? 'bg-[#FF9F0A] text-black font-bold shadow-sm'
                  : 'text-[#A1A1A1] hover:text-white'
              }`}
            >
              DA
            </button>
          </div>

          {/* Primary CTA */}
          <button
            id="nav-cta-sample-btn"
            onClick={onOpenSampleModal}
            className="cta-button px-5 py-2 rounded-full font-mono-tag text-xs uppercase tracking-wider font-bold shadow-sm cursor-pointer"
          >
            {t.cta}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="flex items-center bg-[#16161A] p-0.5 rounded-full border border-[#222228] font-mono-tag text-[10px]">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded-full ${
                currentLang === 'en' ? 'bg-[#FF9F0A] text-black font-bold' : 'text-[#A1A1A1]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('da')}
              className={`px-2 py-0.5 rounded-full ${
                currentLang === 'da' ? 'bg-[#FF9F0A] text-black font-bold' : 'text-[#A1A1A1]'
              }`}
            >
              DA
            </button>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white bg-[#16161A] border border-[#222228] rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-6 pt-2 bg-[#0D0D11] border-b border-[#222228] flex flex-col gap-4">
          <button
            onClick={() => scrollToSection('showcase')}
            className="text-left text-white py-2 font-medium border-b border-[#1A1A22]"
          >
            {t.showcase}
          </button>
          <button
            onClick={() => scrollToSection('workflow')}
            className="text-left text-[#C6C6C7] py-2 font-medium border-b border-[#1A1A22]"
          >
            {t.workflow}
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-left text-[#C6C6C7] py-2 font-medium border-b border-[#1A1A22]"
          >
            {t.pricing}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left text-[#C6C6C7] py-2 font-medium border-b border-[#1A1A22]"
          >
            {t.contact}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSampleModal();
            }}
            className="cta-button w-full py-3 rounded-full font-mono-tag text-xs uppercase tracking-wider font-bold text-center mt-2"
          >
            {t.cta}
          </button>
        </div>
      )}
    </nav>
  );
};
