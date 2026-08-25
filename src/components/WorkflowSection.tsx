import React, { useState } from 'react';
import { Check, Plus, MessageSquare, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, INITIAL_CLIENT_COMMENTS } from '../data/content';

interface WorkflowSectionProps {
  currentLang: Language;
  onGetStarted: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ currentLang, onGetStarted }) => {
  const t = TRANSLATIONS[currentLang].workflow;
  const [activeStage, setActiveStage] = useState(2); // First draft
  const [comments, setComments] = useState(INITIAL_CLIENT_COMMENTS);
  const [selectedCommentId, setSelectedCommentId] = useState<string>('c1');
  const [newCommentText, setNewCommentText] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const activeComment = comments.find((c) => c.id === selectedCommentId) || comments[0];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newId = `c-${Date.now()}`;
    const newComment = {
      id: newId,
      timestamp: '01:50',
      author: 'You (Client)',
      textEn: newCommentText,
      textDa: newCommentText,
      positionPercent: 48,
      resolved: false
    };

    setComments((prev) => [...prev, newComment]);
    setSelectedCommentId(newId);
    setNewCommentText('');
    setIsAddingComment(false);
  };

  return (
    <section
      id="workflow"
      className="py-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto border-t border-[#222228]"
    >
      <div className="relative rounded-3xl bg-[#0D0D11] border border-[#222228] overflow-hidden shadow-2xl">
        {/* Ambient Amber Glow */}
        <div className="absolute inset-0 bg-[#FF9F0A]/5 blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
          {/* Left Column: Explanatory Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#222228]">
            <div
              id="workflow-tag"
              className="flex items-center gap-2 mb-6 font-mono-tag text-xs text-[#A1A1A1] tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF9F0A] animate-pulse" />
              <span>{t.tag}</span>
            </div>

            <h2
              id="workflow-headline"
              className="text-3xl sm:text-4xl md:text-[40px] font-bold text-white leading-tight mb-4"
            >
              {t.headline}
            </h2>

            <p
              id="workflow-description"
              className="text-[#C6C6C7] text-base sm:text-lg leading-relaxed mb-10"
            >
              {t.description}
            </p>

            {/* 3 Step List */}
            <div className="flex flex-col gap-8 mb-12">
              {t.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 group cursor-default">
                  <div className="text-[#FF9F0A] font-mono-tag font-bold text-base opacity-75 group-hover:opacity-100 transition-opacity pt-0.5">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF9F0A] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[#C6C6C7] text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="workflow-cta-btn"
              onClick={onGetStarted}
              className="cta-button w-fit px-8 py-4 rounded-full font-mono-tag text-sm uppercase tracking-wider font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <span>{t.cta}</span>
            </button>
          </div>

          {/* Right Column: Interactive Client Portal Simulation */}
          <div className="p-6 sm:p-10 lg:p-12 bg-[#0A0A0D] flex items-center justify-center flex-col">
            <div className="w-full max-w-lg rounded-2xl border border-[#222228] bg-[#131313] overflow-hidden shadow-2xl flex flex-col">
              {/* Window Title Bar */}
              <div className="h-10 bg-[#1C1C1E] border-b border-[#222228] flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="text-[11px] font-mono-tag text-[#A1A1A1]">
                  portal.fdsoundlabs.com
                </div>
                <div className="w-10" />
              </div>

              {/* Window Body */}
              <div className="p-6 flex flex-col gap-6">
                {/* Project Info Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold text-base sm:text-lg">
                      {t.mockup.title}
                    </h4>
                    <div className="text-[#C6C6C7] font-mono-tag text-xs mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF9F0A]" />
                      <span>{t.mockup.status}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tag bg-[#16161A] text-[#FF9F0A] border border-[#2A2A32] px-2.5 py-1 rounded-full">
                    Aarhus Session #249
                  </span>
                </div>

                {/* Ingest Validation Checklist */}
                <div className="border border-dashed border-[#FF9F0A]/30 bg-[#FF9F0A]/5 rounded-lg p-3.5 flex flex-wrap gap-2 justify-center font-mono-tag text-xs text-[#FF9F0A]">
                  <span className="px-2.5 py-1 bg-[#131313] rounded border border-[#FF9F0A]/20">
                    ✓ 120 BPM
                  </span>
                  <span className="px-2.5 py-1 bg-[#131313] rounded border border-[#FF9F0A]/20">
                    ✓ 48kHz / 24-bit
                  </span>
                  <span className="px-2.5 py-1 bg-[#131313] rounded border border-[#FF9F0A]/20">
                    ✓ {t.mockup.stemsSynced}
                  </span>
                </div>

                {/* Interactive Waveform with Comments */}
                <div className="border border-[#222228] rounded-xl p-4 bg-[#0A0A0D] relative mt-2">
                  {/* Active Comment Bubble with Arrow */}
                  {activeComment && (
                    <div
                      className="absolute -top-4 bg-[#FF9F0A] text-black font-mono-tag text-[11px] font-semibold px-3 py-1.5 rounded shadow-xl z-20 whitespace-nowrap transition-all duration-300"
                      style={{
                        left: `${activeComment.positionPercent}%`,
                        transform: 'translateX(-30%)'
                      }}
                    >
                      <span>{activeComment.timestamp} - {currentLang === 'da' ? activeComment.textDa : activeComment.textEn}</span>
                      <div className="absolute -bottom-1 left-4 w-2 h-2 bg-[#FF9F0A] transform rotate-45" />
                    </div>
                  )}

                  {/* Waveform Visualizer */}
                  <div className="h-16 flex items-end justify-center w-full overflow-hidden opacity-90 relative pt-2">
                    {/* Animated Playhead line */}
                    <div className="absolute top-0 bottom-0 w-px bg-white z-10 animate-playhead">
                      <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow" />
                    </div>

                    {/* Interactive Marker Pins */}
                    {comments.map((comment) => (
                      <button
                        key={comment.id}
                        onClick={() => setSelectedCommentId(comment.id)}
                        className={`absolute top-1 z-15 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all cursor-pointer ${
                          selectedCommentId === comment.id
                            ? 'bg-white text-black ring-2 ring-[#FF9F0A] scale-125'
                            : 'bg-[#FF9F0A] text-black hover:scale-110'
                        }`}
                        style={{ left: `${comment.positionPercent}%` }}
                        title={`${comment.author}: ${currentLang === 'da' ? comment.textDa : comment.textEn}`}
                      >
                        <MessageSquare className="w-2.5 h-2.5 fill-black" />
                      </button>
                    ))}

                    {/* Waveform bars */}
                    <div className="flex items-end justify-between w-full h-full gap-1">
                      {[4, 8, 6, 12, 10, 14, 8, 16, 12, 6, 10, 4, 8, 6, 12, 10, 14, 8, 16, 12, 8, 14, 10, 16].map(
                        (h, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-xs bg-[#FF9F0A]/60"
                            style={{ height: `${h * 3.2}px` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Comment Picker / Add interactive comment */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono-tag text-[#A1A1A1]">
                    <span>Select revision note:</span>
                    <button
                      onClick={() => setIsAddingComment(!isAddingComment)}
                      className="text-[#FF9F0A] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{isAddingComment ? 'Cancel' : 'Add custom note'}</span>
                    </button>
                  </div>

                  {isAddingComment ? (
                    <form onSubmit={handleAddComment} className="flex gap-2">
                      <input
                        type="text"
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder={t.mockup.commentPlaceholder}
                        className="flex-1 bg-[#16161A] border border-[#2A2A32] rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#FF9F0A] outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-[#FF9F0A] text-black text-xs font-bold font-mono-tag cursor-pointer"
                      >
                        Post
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {comments.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCommentId(c.id)}
                          className={`text-[11px] font-mono-tag px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                            selectedCommentId === c.id
                              ? 'bg-[#FF9F0A]/20 border-[#FF9F0A] text-[#FF9F0A] font-semibold'
                              : 'bg-[#16161A] border-[#222228] text-[#C6C6C7] hover:border-[#353535]'
                          }`}
                        >
                          📍 {c.timestamp} ({c.author.split(' ')[0]})
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Progress Stepper Timeline */}
                <div className="mt-2 pt-4 border-t border-[#222228]">
                  <div className="relative flex justify-between items-center w-full px-2 mb-2">
                    {/* Background track */}
                    <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-[#222228] z-0" />
                    {/* Active progress */}
                    <div
                      className="absolute left-2 top-1/2 -translate-y-1/2 h-px bg-[#FF9F0A] z-0 transition-all duration-300"
                      style={{ width: `${(activeStage / 4) * 100}%` }}
                    />

                    {t.mockup.stages.map((stage, idx) => {
                      const isComplete = idx < activeStage;
                      const isCurrent = idx === activeStage;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveStage(idx)}
                          className={`relative z-10 rounded-full flex items-center justify-center text-[9px] font-bold transition-all cursor-pointer ${
                            isComplete
                              ? 'w-4 h-4 bg-[#FF9F0A] text-black'
                              : isCurrent
                              ? 'w-5 h-5 bg-[#FF9F0A] text-black animate-amber-pulse'
                              : 'w-4 h-4 bg-[#222228] border border-[#353535] text-[#A1A1A1]'
                          }`}
                          title={`Stage ${idx + 1}: ${stage}`}
                        >
                          {isComplete ? <Check className="w-2.5 h-2.5" /> : idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stage Labels */}
                  <div className="flex justify-between font-mono-tag text-[9px] text-[#C6C6C7] text-center uppercase tracking-wider">
                    {t.mockup.stages.map((stage, idx) => (
                      <div
                        key={idx}
                        className={`w-1/5 ${
                          idx === activeStage ? 'text-[#FF9F0A] font-bold' : idx > activeStage ? 'opacity-40' : ''
                        }`}
                      >
                        {stage}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p
              id="workflow-disclaimer"
              className="text-[#A1A1A1] text-xs mt-4 text-center opacity-70 max-w-sm"
            >
              {t.mockup.indicativeNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
