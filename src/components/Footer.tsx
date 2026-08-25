import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].footer;

  return (
    <footer
      id="footer"
      className="bg-[#0E0E0E] border-t border-[#222228] w-full py-12 px-4 sm:px-8 lg:px-16"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-white font-bold text-lg tracking-wider uppercase font-sans">
          FD SOUND LABS
        </div>

        {/* Center Tagline */}
        <div
          id="footer-copyright"
          className="font-mono-tag text-xs text-[#C6C6C7] text-center md:text-left"
        >
          {t.tagline}
        </div>

        {/* Social / Legal Links */}
        <div className="flex items-center gap-6 font-mono-tag text-xs">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#C6C6C7] hover:text-[#FF9F0A] transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#C6C6C7] hover:text-[#FF9F0A] transition-colors"
          >
            YouTube
          </a>
          <button
            onClick={() => alert(currentLang === 'da' ? 'Privatlivspolitik: Vi behandler alle rå multitracks og personoplysninger 100% fortroligt.' : 'Privacy Policy: All raw audio stems and client data are treated 100% confidentially.')}
            className="text-[#C6C6C7] hover:text-[#FF9F0A] transition-colors cursor-pointer"
          >
            {t.privacy}
          </button>
        </div>
      </div>
    </footer>
  );
};
