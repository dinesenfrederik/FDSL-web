import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, Send, Music2 } from 'lucide-react';
import { Language } from '../types';

interface SampleMixModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const SampleMixModal: React.FC<SampleMixModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [name, setName] = useState('');
  const [band, setBand] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D0D11] border border-[#222228] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#A1A1A1] hover:text-white bg-[#16161A] rounded-full border border-[#222228] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isDone ? (
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FF9F0A]/20 border border-[#FF9F0A] flex items-center justify-center text-[#FF9F0A]">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {currentLang === 'da' ? 'Test-mix anmodning sendt!' : 'Free Sample Mix Requested!'}
            </h3>
            <p className="text-[#C6C6C7] text-sm leading-relaxed max-w-sm">
              {currentLang === 'da'
                ? 'Jeg mixer et 45-60 sekunders udsnit af jeres råspor og sender det tilbage inden for 3-4 hverdage.'
                : 'I will mix a 45-60 second section of your raw stems and return an album-ready sample within 3-4 days.'}
            </p>
            <button
              onClick={onClose}
              className="cta-button mt-4 px-6 py-2.5 rounded-full font-mono-tag text-xs font-bold uppercase cursor-pointer"
            >
              {currentLang === 'da' ? 'Luk' : 'Done'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#FF9F0A] font-mono-tag text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{currentLang === 'da' ? '100% GRATIS OG UFORPLIGTENDE' : '100% FREE & RISK-FREE'}</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {currentLang === 'da' ? 'Få et gratis test-mix' : 'Claim Your Free Sample Mix'}
            </h3>

            <p className="text-[#C6C6C7] text-sm mb-6 leading-relaxed">
              {currentLang === 'da'
                ? 'Hør hvordan jeres eget track kan lyde med high-impact mixing, før I træffer en beslutning.'
                : 'Hear how your own track sounds with high-impact modern rock/metal punch before making any commitments.'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase">
                  {currentLang === 'da' ? 'Navn' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentLang === 'da' ? 'Dit navn' : 'Your name'}
                  className="w-full mt-1 bg-[#16161A] border border-[#2A2A32] rounded-xl p-3 text-sm text-white focus:border-[#FF9F0A] outline-none"
                />
              </div>

              <div>
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase">
                  {currentLang === 'da' ? 'Band / Artist' : 'Band / Artist'}
                </label>
                <input
                  type="text"
                  value={band}
                  onChange={(e) => setBand(e.target.value)}
                  placeholder={currentLang === 'da' ? 'Bandnavn' : 'Band name'}
                  className="w-full mt-1 bg-[#16161A] border border-[#2A2A32] rounded-xl p-3 text-sm text-white focus:border-[#FF9F0A] outline-none"
                />
              </div>

              <div>
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentLang === 'da' ? 'din@email.dk' : 'your@email.com'}
                  className="w-full mt-1 bg-[#16161A] border border-[#2A2A32] rounded-xl p-3 text-sm text-white focus:border-[#FF9F0A] outline-none"
                />
              </div>

              <div>
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase">
                  {currentLang === 'da' ? 'Link til multitrack / demo' : 'Link to raw stems / demo'} *
                </label>
                <input
                  type="text"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Dropbox, WeTransfer, Google Drive..."
                  className="w-full mt-1 bg-[#16161A] border border-[#2A2A32] rounded-xl p-3 text-sm text-white focus:border-[#FF9F0A] outline-none"
                />
              </div>

              <button
                type="submit"
                className="cta-button mt-2 w-full py-3.5 rounded-full font-mono-tag text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{currentLang === 'da' ? 'Anmod om test-mix' : 'Send Sample Request'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
