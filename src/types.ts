export type Language = 'en' | 'da';

export interface TrackData {
  id: string;
  title: string;
  fileName: string;
  artist: string;
  genre: string;
  tags: string;
  tagsDa: string;
  duration: string;
  durationSeconds: number;
  bpm: number;
  sampleRate: string;
  waveformBars: number[];
  audioFrequency: number;
  finalMixSrc?: string;
  preMixSrc?: string;
  descriptionEn?: string;
  descriptionDa?: string;
}

export interface ClientHubComment {
  id: string;
  timestamp: string;
  author: string;
  textEn: string;
  textDa: string;
  positionPercent: number;
  resolved: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameDa: string;
  subtitleEn: string;
  subtitleDa: string;
  priceEur: string;
  priceDkk: string;
  rateUnitEn: string;
  rateUnitDa: string;
  featuresEn: string[];
  featuresDa: string[];
  ctaEn: string;
  ctaDa: string;
  popular?: boolean;
}
