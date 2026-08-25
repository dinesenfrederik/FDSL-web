import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, UploadCloud, Link as LinkIcon, Loader2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/content';

interface ContactSectionProps {
  currentLang: Language;
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  selectedService,
  onServiceChange
}) => {
  const t = TRANSLATIONS[currentLang].contact;

  const [formData, setFormData] = useState({
    name: '',
    bandName: '',
    email: '',
    demoLink: '',
    notes: '',
    uploadedFileName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Set default service if none selected
  useEffect(() => {
    if (!selectedService) {
      onServiceChange(t.serviceOptions[0]);
    }
  }, [selectedService, t.serviceOptions, onServiceChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert(currentLang === 'da' ? 'Udfyld venligst navn og email.' : 'Please fill in your name and email.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        uploadedFileName: file.name,
        demoLink: prev.demoLink || `Local file attached: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        uploadedFileName: file.name,
        demoLink: prev.demoLink || `Local file attached: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
      }));
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-[#222228]"
    >
      <div className="relative rounded-3xl bg-[#0D0D11] border border-[#222228] overflow-hidden shadow-2xl p-6 sm:p-12 lg:p-16">
        {/* Ambient Amber Glow */}
        <div className="absolute inset-0 bg-[#FF9F0A]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              id="contact-tag"
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#222228] bg-[#16161A]/50 font-mono-tag text-xs text-[#A1A1A1] tracking-widest uppercase"
            >
              {t.tag}
            </div>

            <h2
              id="contact-headline"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              {t.headline}
            </h2>

            <p
              id="contact-description"
              className="text-[#C6C6C7] text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            >
              {t.description}
            </p>
          </div>

          {/* Form State or Success State */}
          {isSubmitted ? (
            <div className="bg-[#131313] border border-[#FF9F0A]/30 rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#FF9F0A]/20 border border-[#FF9F0A] flex items-center justify-center text-[#FF9F0A] mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-white font-bold text-2xl">
                {t.successTitle}
              </h3>

              <p className="text-[#C6C6C7] text-base max-w-md mx-auto leading-relaxed">
                {t.successDesc}
              </p>

              <div className="bg-[#16161A] rounded-xl p-4 border border-[#222228] w-full max-w-md text-left font-mono-tag text-xs text-[#A1A1A1] mt-2">
                <div className="text-[#FF9F0A] font-bold mb-1">Inquiry Details:</div>
                <div>👤 {formData.name} {formData.bandName ? `(${formData.bandName})` : ''}</div>
                <div>✉️ {formData.email}</div>
                <div>🎛️ {selectedService}</div>
                {formData.demoLink && <div className="truncate">🔗 {formData.demoLink}</div>}
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    bandName: '',
                    email: '',
                    demoLink: '',
                    notes: '',
                    uploadedFileName: ''
                  });
                }}
                className="mt-6 px-6 py-2.5 rounded-full border border-[#222228] text-white hover:border-[#FF9F0A] text-xs font-mono-tag transition-colors cursor-pointer"
              >
                {t.anotherInquiry}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider">
                  {t.nameLabel} <span className="text-[#FF9F0A]">*</span>
                </label>
                <input
                  id="input-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="bg-[#16161A] border border-[#2A2A32] rounded-xl p-4 text-white focus:border-[#FF9F0A] focus:ring-1 focus:ring-[#FF9F0A] outline-none transition-all placeholder:text-[#555]"
                />
              </div>

              {/* Band / Artist Name */}
              <div className="flex flex-col gap-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider">
                  {t.bandLabel}
                </label>
                <input
                  id="input-band"
                  type="text"
                  value={formData.bandName}
                  onChange={(e) => setFormData({ ...formData, bandName: e.target.value })}
                  placeholder={t.bandPlaceholder}
                  className="bg-[#16161A] border border-[#2A2A32] rounded-xl p-4 text-white focus:border-[#FF9F0A] focus:ring-1 focus:ring-[#FF9F0A] outline-none transition-all placeholder:text-[#555]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider">
                  {t.emailLabel} <span className="text-[#FF9F0A]">*</span>
                </label>
                <input
                  id="input-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="bg-[#16161A] border border-[#2A2A32] rounded-xl p-4 text-white focus:border-[#FF9F0A] focus:ring-1 focus:ring-[#FF9F0A] outline-none transition-all placeholder:text-[#555]"
                />
              </div>

              {/* Service Selection Chips */}
              <div className="flex flex-col gap-3 md:col-span-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider">
                  {t.serviceLabel}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {t.serviceOptions.map((opt, idx) => {
                    const isSelected = selectedService === opt;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onServiceChange(opt)}
                        className={`px-4 py-2.5 rounded-full font-mono-tag text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FF9F0A] text-black font-bold shadow-sm ring-1 ring-[#FF9F0A]'
                            : 'border border-[#2A2A32] text-[#C6C6C7] hover:text-white hover:border-[#FF9F0A]/60 bg-[#131313]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Demo / Multitrack Link & Drop Area */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider flex items-center justify-between">
                  <span>{t.linkLabel}</span>
                  <span className="text-[10px] text-[#A1A1A1] font-normal lowercase">Dropbox / Drive / WeTransfer</span>
                </label>

                <div className="relative">
                  <input
                    id="input-link"
                    type="text"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                    placeholder={t.linkPlaceholder}
                    className="w-full bg-[#16161A] border border-[#2A2A32] rounded-xl p-4 text-white focus:border-[#FF9F0A] focus:ring-1 focus:ring-[#FF9F0A] outline-none transition-all placeholder:text-[#555] pr-10"
                  />
                  <LinkIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1A1]" />
                </div>

                {/* Drag & drop helper box */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`mt-1 border border-dashed rounded-xl p-3.5 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? 'border-[#FF9F0A] bg-[#FF9F0A]/10'
                      : 'border-[#222228] bg-[#0A0A0D] hover:border-[#353535]'
                  }`}
                  onClick={() => document.getElementById('multitrack-upload-input')?.click()}
                >
                  <input
                    id="multitrack-upload-input"
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-[#A1A1A1]">
                    <UploadCloud className="w-4 h-4 text-[#FF9F0A]" />
                    <span>
                      {formData.uploadedFileName ? (
                        <span className="text-[#FF9F0A] font-mono-tag">Attached: {formData.uploadedFileName}</span>
                      ) : (
                        <span>Or click to attach sample track directly (WAV / ZIP / MP3)</span>
                      )}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#A1A1A1] mt-1">{t.linkHelp}</p>
              </div>

              {/* Notes / Vision */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-mono-tag text-xs text-[#C6C6C7] uppercase tracking-wider">
                  {t.notesLabel}
                </label>
                <textarea
                  id="input-notes"
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={t.notesPlaceholder}
                  className="bg-[#16161A] border border-[#2A2A32] rounded-xl p-4 text-white focus:border-[#FF9F0A] focus:ring-1 focus:ring-[#FF9F0A] outline-none transition-all placeholder:text-[#555] min-h-[110px]"
                />
              </div>

              {/* Submit CTA */}
              <div className="md:col-span-2 mt-4 flex flex-col gap-4">
                <button
                  id="btn-submit-inquiry"
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button w-full py-4 sm:py-5 rounded-full font-mono-tag text-sm sm:text-base uppercase tracking-widest font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.submitCta}</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[#A1A1A1] text-xs opacity-80">
                  {t.privacyNote}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
