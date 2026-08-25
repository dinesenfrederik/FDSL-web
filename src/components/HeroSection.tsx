import React from 'react';
import { Zap, RefreshCw, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface HeroSectionProps {
  currentLang: Language;
  onClaimSample: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onClaimSample }) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section
      id="hero-section"
      className="min-h-[85vh] flex flex-col justify-center items-center text-center w-full relative overflow-hidden bg-[#000000] pt-28 pb-20 px-4 sm:px-8 lg:px-16"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, #FF9F0A 0%, rgba(255, 159, 10, 0.15) 45%, transparent 70%)'
        }}
      />

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Main Headline */}
        <h1
          id="hero-headline"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.08] max-w-4xl"
        >
          {t.headline}
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subheadline"
          className="text-[#C6C6C7] text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          {t.subheadline}
        </p>

        {/* Primary Hero CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <button
            id="hero-claim-btn"
            onClick={onClaimSample}
            className="cta-button px-8 sm:px-10 py-4 sm:py-5 rounded-full font-mono-tag text-sm sm:text-base uppercase tracking-wider font-bold shadow-lg cursor-pointer"
          >
            {t.claimCta}
          </button>
        </div>

        {/* Value Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[#C6C6C7] font-mono-tag text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF9F0A]" />
            <span>{t.badges.turnaround}</span>
          </div>

          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#FF9F0A]" />
            <span>{t.badges.revisions}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF9F0A]" />
            <span>{t.badges.guarantee}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
