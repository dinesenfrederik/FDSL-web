import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { PRICING_PLANS, TRANSLATIONS } from '../data/content';

interface PricingSectionProps {
  currentLang: Language;
  onSelectService: (serviceName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentLang,
  onSelectService
}) => {
  const t = TRANSLATIONS[currentLang].pricing;
  const [currencyMode, setCurrencyMode] = useState<'AUTO' | 'EUR' | 'DKK'>('AUTO');

  const activeCurrency =
    currencyMode === 'AUTO' ? (currentLang === 'da' ? 'DKK' : 'EUR') : currencyMode;

  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-[#222228]"
    >
      {/* Section Header */}
      <div className="text-center mb-14 max-w-3xl mx-auto">
        <div
          id="pricing-tag"
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#222228] bg-[#16161A]/50 font-mono-tag text-xs text-[#A1A1A1] tracking-widest uppercase"
        >
          {t.tag}
        </div>

        <h2
          id="pricing-headline"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
        >
          {t.headline}
        </h2>

        <p
          id="pricing-description"
          className="text-[#C6C6C7] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6"
        >
          {t.description}
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center gap-2 bg-[#131313] p-1 rounded-full border border-[#222228] font-mono-tag text-xs">
          <span className="text-[#A1A1A1] pl-2 pr-1">{t.currencyToggle}:</span>
          <button
            onClick={() => setCurrencyMode('EUR')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeCurrency === 'EUR'
                ? 'bg-[#FF9F0A] text-black font-bold'
                : 'text-[#C6C6C7] hover:text-white'
            }`}
          >
            EUR (€)
          </button>
          <button
            onClick={() => setCurrencyMode('DKK')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeCurrency === 'DKK'
                ? 'bg-[#FF9F0A] text-black font-bold'
                : 'text-[#C6C6C7] hover:text-white'
            }`}
          >
            DKK (kr.)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
        {PRICING_PLANS.map((plan) => {
          const name = currentLang === 'da' ? plan.nameDa : plan.name;
          const subtitle = currentLang === 'da' ? plan.subtitleDa : plan.subtitleEn;
          const price = activeCurrency === 'DKK' ? plan.priceDkk : plan.priceEur;
          const rateUnit = currentLang === 'da' ? plan.rateUnitDa : plan.rateUnitEn;
          const features = currentLang === 'da' ? plan.featuresDa : plan.featuresEn;
          const cta = currentLang === 'da' ? plan.ctaDa : plan.ctaEn;

          return (
            <div
              key={plan.id}
              id={`pricing-card-${plan.id}`}
              className="surface-card rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,159,10,0.2)] relative group"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-2xl mb-2 flex items-center justify-between">
                  <span>{name}</span>
                  {plan.popular && (
                    <span className="text-[10px] font-mono-tag uppercase tracking-wider bg-[#FF9F0A]/15 text-[#FF9F0A] border border-[#FF9F0A]/30 px-2.5 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </h3>
                <p className="text-[#C6C6C7] text-sm leading-relaxed">{subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-6 border-b border-[#222228]">
                <div className="text-[#FF9F0A] text-4xl sm:text-5xl font-extrabold tracking-tight font-sans">
                  {price}
                </div>
                <div className="text-[#C6C6C7] text-xs uppercase tracking-widest mt-1.5 font-mono-tag">
                  {rateUnit}
                </div>
              </div>

              {/* Feature List */}
              <ul className="flex flex-col gap-4 mb-10 flex-grow">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#e2e2e2]">
                    <CheckCircle2 className="w-5 h-5 text-[#FF9F0A] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                id={`btn-select-${plan.id}`}
                onClick={() => onSelectService(name)}
                className="w-full py-4 rounded-full border border-[#FF9F0A]/40 text-[#FF9F0A] font-mono-tag text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-[#FF9F0A] hover:text-black transition-all shadow-sm flex items-center justify-center gap-2 group-hover:border-[#FF9F0A] cursor-pointer"
              >
                <span>{cta}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Guarantee & Extra Revision Note */}
      <div className="max-w-2xl mx-auto text-center">
        <p
          id="pricing-guarantee-note"
          className="text-[#A1A1A1] text-xs opacity-80 leading-relaxed font-sans"
        >
          {t.guaranteeNote}
        </p>
      </div>
    </section>
  );
};
