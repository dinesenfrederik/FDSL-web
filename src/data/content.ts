import { TrackData, PricingPlan, ClientHubComment } from '../types';

export const TRACKS_DATA: TrackData[] = [
  {
    id: 'track-kingdoms',
    title: 'Kingdoms.mp3',
    fileName: 'Kingdoms.mp3',
    artist: 'FD Sound Labs',
    genre: 'Modern Rock / Metalcore',
    tags: 'FULL MIX & MASTER • PUNCHY DRUM ENHANCEMENT • VOCAL POLISHING',
    tagsDa: 'KOMPLET MIX & MASTER • PUNCHY TROMMER • VOKAL POLERING',
    duration: '3:45',
    durationSeconds: 225,
    bpm: 140,
    sampleRate: '48kHz / 24-bit',
    audioFrequency: 138,
    finalMixSrc: '/audio/Kingdoms.mp3',
    waveformBars: [6, 12, 10, 15, 12, 16, 10, 14, 16, 12, 8, 14, 10, 16, 12, 8, 14, 16, 12, 10, 15, 14, 16, 8]
  },
  {
    id: 'track-bastion',
    title: 'Bastion.mp3',
    fileName: 'Bastion.mp3',
    artist: 'FD Sound Labs',
    genre: 'Melodic Metal / Post-Hardcore',
    tags: 'FULL MIX & MASTER • GUITAR RE-AMPING • WIDE STEREO VOCAL BUS',
    tagsDa: 'KOMPLET MIX & MASTER • GUITAR RE-AMPING • BRED VOKAL-STEREOBUS',
    duration: '4:12',
    durationSeconds: 252,
    bpm: 125,
    sampleRate: '48kHz / 24-bit',
    audioFrequency: 125,
    finalMixSrc: '/audio/Bastion.mp3',
    waveformBars: [4, 8, 12, 14, 10, 16, 12, 8, 14, 16, 10, 6, 12, 16, 14, 10, 16, 12, 8, 14, 16, 10, 12, 8]
  },
  {
    id: 'track-acrid-curse',
    title: 'Acrid - Curse(2).mp3',
    fileName: 'Acrid - Curse(2).mp3',
    artist: 'Acrid',
    genre: 'Symphonic / Extreme Metal',
    tags: 'FULL MIX & MASTER • ORCHESTRAL GLUE • CRACKING SNARE TRANSIENT',
    tagsDa: 'KOMPLET MIX & MASTER • ORKESTER GLUE • SKÆRENDE SNARE TRANSIENT',
    duration: '3:58',
    durationSeconds: 238,
    bpm: 150,
    sampleRate: '96kHz / 24-bit',
    audioFrequency: 145,
    finalMixSrc: '/audio/Acrid - Curse(2).mp3',
    waveformBars: [8, 10, 14, 16, 12, 6, 14, 16, 10, 12, 16, 14, 8, 12, 16, 14, 10, 16, 12, 8, 14, 16, 10, 6]
  },
  {
    id: 'track-prophers-stand-tall',
    title: 'Prophers - Stand Tall(2).mp3',
    fileName: 'Prophers - Stand Tall(2).mp3',
    artist: 'Prophers',
    genre: 'Thrash / Heavy Metal',
    tags: 'FULL MIX & MASTER • FAST DOUBLE-BASS TIGHTENING • GRITTY BASS',
    tagsDa: 'KOMPLET MIX & MASTER • HURTIG DOBBELT-PEDAL KONTROL • RAW BAS',
    duration: '3:20',
    durationSeconds: 200,
    bpm: 165,
    sampleRate: '48kHz / 24-bit',
    audioFrequency: 110,
    finalMixSrc: '/audio/Prophers - Stand Tall(2).mp3',
    waveformBars: [10, 14, 8, 16, 14, 12, 16, 10, 8, 14, 16, 12, 10, 16, 14, 8, 12, 16, 10, 14, 16, 12, 8, 14]
  },
  {
    id: 'track-raised-with-wolves',
    title: 'Raised With Wolves(2).mp3',
    fileName: 'Raised With Wolves(2).mp3',
    artist: 'FD Sound Labs',
    genre: 'Beatdown / Hardcore Metal',
    tags: 'FULL MIX & MASTER • HEAVY SUB-DROP IMPACT • VOCAL AGGRESSION',
    tagsDa: 'KOMPLET MIX & MASTER • TUNG SUB-DROP IMPACT • VOKAL AGGRESSIVITET',
    duration: '4:05',
    durationSeconds: 245,
    bpm: 135,
    sampleRate: '48kHz / 24-bit',
    audioFrequency: 118,
    finalMixSrc: '/audio/Raised With Wolves(2).mp3',
    waveformBars: [6, 12, 16, 14, 10, 16, 12, 8, 14, 16, 10, 14, 16, 12, 8, 14, 16, 10, 6, 12, 16, 14, 10, 16]
  },
  {
    id: 'track-sweaty-palms',
    title: 'Sweaty Palms v3.mp3',
    fileName: 'Sweaty Palms v3.mp3',
    artist: 'FD Sound Labs',
    genre: 'Electronic Rock / Modern Metalcore',
    tags: 'FULL MIX & MASTER • SYNTH INTEGRATION • MULTIBAND SATURATION',
    tagsDa: 'KOMPLET MIX & MASTER • SYNTH INTEGRATION • MULTIBÅNDS MÆTNING',
    duration: '3:15',
    durationSeconds: 195,
    bpm: 130,
    sampleRate: '48kHz / 24-bit',
    audioFrequency: 130,
    finalMixSrc: '/audio/Sweaty Palms v3.mp3',
    waveformBars: [8, 14, 10, 16, 12, 6, 14, 16, 10, 12, 16, 8, 14, 10, 16, 12, 8, 14, 16, 10, 12, 16, 14, 10]
  },
  {
    id: 'track-illuminate-the-sky',
    title: 'Illuminate The Sky(2).mp3',
    fileName: 'Illuminate The Sky(2).mp3',
    artist: 'FD Sound Labs',
    genre: 'Atmospheric / Prog Metal',
    tags: 'FULL MIX & MASTER • SPATIAL REVERB • DYNAMIC CRESCENDO',
    tagsDa: 'KOMPLET MIX & MASTER • RUMKLANG DYBDE • DYNAMISK CRESCENDO',
    duration: '3:40',
    durationSeconds: 220,
    bpm: 118,
    sampleRate: '96kHz / 24-bit',
    audioFrequency: 105,
    finalMixSrc: '/audio/Illuminate The Sky(2).mp3',
    waveformBars: [4, 6, 10, 12, 14, 16, 14, 12, 16, 14, 10, 12, 14, 16, 16, 12, 8, 14, 16, 12, 8, 10, 14, 16]
  }
];

export const INITIAL_CLIENT_COMMENTS: ClientHubComment[] = [
  {
    id: 'c1',
    timestamp: '01:24',
    author: 'Mark (Drums)',
    textEn: 'More punch on the kick here.',
    textDa: 'Mere punch på stortrommen her.',
    positionPercent: 28,
    resolved: false
  },
  {
    id: 'c2',
    timestamp: '02:40',
    author: 'Sara (Vocals)',
    textEn: 'Bring out the scream doubles in stereo left/right.',
    textDa: 'Giv mere bredde på vokal-dubleringerne i omkvædet.',
    positionPercent: 62,
    resolved: false
  },
  {
    id: 'c3',
    timestamp: '03:10',
    author: 'Jonas (Guitar)',
    textEn: 'Solo reverb tail cuts off slightly early.',
    textDa: 'Guitarsoloens delay klinger en smule for brat af.',
    positionPercent: 78,
    resolved: true
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'full-production-mix',
    name: 'Full Production Mix',
    nameDa: 'Full Production Mix',
    subtitleEn: 'Complete mixing tailored for rock and metal.',
    subtitleDa: 'Komplet mixing skræddersyet til rock og metal.',
    priceEur: '€337.50',
    priceDkk: '2.500 DKK',
    rateUnitEn: '/ track (incl. VAT) • Discount for 3+ tracks',
    rateUnitDa: '/ sang (inkl. moms) • Rabat ved 3+ sange',
    featuresEn: [
      'Complete multitrack mix & streaming-ready master',
      'Professional editing of vocals, drums & other instruments included',
      '5 consolidated revision rounds via the client portal',
      '100% satisfaction guarantee'
    ],
    featuresDa: [
      'Komplet multitrack mix & streaming-ready master',
      'Professionel redigering af vokaler, trommer & andre instrumenter inkluderet',
      '5 konsoliderede revisionsrunder via kundeportalen',
      '100% tilfredshedsgaranti'
    ],
    ctaEn: 'Book Mix →',
    ctaDa: 'Book Mix →',
    popular: true
  },
  {
    id: 'studio-tracking',
    name: 'Studio Tracking',
    nameDa: 'Studio Tracking',
    subtitleEn: 'Recording in comfortable and optimized recording studio in Aarhus.',
    subtitleDa: 'Indspilning i behageligt og optimeret lydstudie i Aarhus.',
    priceEur: '€418.75',
    priceDkk: '3.125 DKK',
    rateUnitEn: '/ day (incl. VAT)',
    rateUnitDa: '/ dag (inkl. moms)',
    featuresEn: [
      'Professional recording of vocals, guitar, bass and synths',
      'Software optimized environment and professional monitoring',
      'Raw multitracks exported and prepared directly for further mixing',
      'Comfortable, creative setting without time pressure'
    ],
    featuresDa: [
      'Professionel indspilning af vokaler, guitar, bas og synths',
      'Software optimeret miljø og professionel monitorering',
      'Rå multitracks eksporteret og klargjort direkte til videre mixing',
      'Behagelige, kreative rammer uden tidspres'
    ],
    ctaEn: 'Book Studio Time →',
    ctaDa: 'Book Studietid →'
  }
];

export const TRANSLATIONS = {
  en: {
    nav: {
      brand: 'FD SOUND LABS',
      showcase: 'Showcase',
      workflow: 'Workflow',
      pricing: 'Pricing',
      contact: 'Contact',
      cta: 'Get Free Sample Mix'
    },
    hero: {
      headline: 'Album-Ready Punch for Modern Rock & Metal.',
      subheadline: 'High-impact remote mixing & studio tracking crafted to cut through the noise.',
      claimCta: 'CLAIM YOUR FREE SAMPLE MIX',
      badges: {
        turnaround: '3-4 day turnaround',
        revisions: '5 revisions (included in paid work)',
        guarantee: '100% satisfaction guarantee'
      }
    },
    showcase: {
      tag: 'PORTFOLIO • A/B COMPARISON',
      headline: 'The sound speaks for itself.',
      description: 'No polished sales pitches. Compare the raw recordings directly with the finished master mix, and hear exactly how your track can sound with the right balance, punch, and clarity.',
      preMix: '[ Pre-mix (Not available) ]',
      preMixDisabledTooltip: 'Raw pre-mix audio files will be uploaded shortly.',
      finalMix: '[ Final mix ]',
      nowPlaying: 'Now playing album-ready master mix'
    },
    workflow: {
      tag: 'DIGITAL CLIENT HUB • BUILT FOR SPEED',
      headline: 'No more email clutter. Total overview & control.',
      description: "At FD Sound Labs, there's a fully integrated mixing portal designed to save you hours of back-and-forth communication, and give you full transparency from first upload to finished project.",
      steps: [
        {
          num: '01',
          title: 'Smart Upload Validation',
          desc: 'Drag-and-drop your WAV/AIFF stems. Automated checklists verify your BPM, sample rate, and track naming instantly.'
        },
        {
          num: '02',
          title: 'Time-coded Revisions & Feedback',
          desc: "Place corrections directly on the visual waveform (e.g. '01:42 - give the snare more smack') and gather all band members' notes in one place."
        },
        {
          num: '03',
          title: 'Live Tracking & Instant Delivery',
          desc: 'Track progress in real-time. Approve and pay for the final mix and unlock instant download of 24-bit masters.'
        }
      ],
      cta: 'Contact me & Get started →',
      mockup: {
        title: 'Kingdoms.mp3 (Final Mix)',
        status: 'Status: In progress (Revision 1/5)',
        stemsSynced: '16 tracks synchronized',
        commentPlaceholder: 'Add feedback marker on waveform...',
        indicativeNote: 'This is an indicative visual presentation and not the current version of the client hub.',
        stages: ['Upload', 'Editing', 'First Draft', 'Revision', 'Done']
      }
    },
    pricing: {
      tag: 'TRANSPARENT PRICING • NO HIDDEN FEES',
      headline: 'Fixed project prices. No surprises.',
      description: 'No more confusing hourly rates and studio stress. Fixed agreed prices, professional editing and 5 revision rounds included.',
      currencyToggle: 'Display in',
      guaranteeNote: '100% Satisfaction Guarantee: If, contrary to expectations, we completely miss the desired direction after 5 revision rounds, your deposit will be fully refunded. Extra revision rounds can be purchased for €83.75 incl. VAT.'
    },
    contact: {
      tag: 'START YOUR PROJECT • RISK-FREE',
      headline: 'Ready to elevate your sound?',
      description: 'Fill out the form below, or send your raw multitracks directly. I will get back to you within 24 hours.',
      nameLabel: 'Name / Contact Person',
      namePlaceholder: 'Your name',
      bandLabel: 'Band / Artist Name',
      bandPlaceholder: 'Band name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      serviceLabel: 'What do you need?',
      serviceOptions: [
        'Free Sample Mix',
        'Full Production Mix',
        'Studio Tracking',
        'Tracking & Full Mix',
        'Other / Questions'
      ],
      linkLabel: 'Link to raw tracks / demo',
      linkPlaceholder: 'Dropbox, WeTransfer, Google Drive link...',
      linkHelp: 'Please upload an uncompressed WAV file or multitrack zip.',
      notesLabel: 'Tell me briefly about the project / Notes',
      notesPlaceholder: 'Describe your vision, reference tracks, guitar tunings, or deadline...',
      submitCta: 'Send inquiry →',
      submitting: 'Submitting inquiry...',
      privacyNote: 'I treat your material 100% confidentially. No spam, only direct dialogue.',
      successTitle: 'Inquiry Received!',
      successDesc: "Thanks for reaching out! I will inspect your track details and get back to you within 24 hours.",
      anotherInquiry: 'Send another request'
    },
    footer: {
      tagline: '© 2026 FD SOUND LABS. Aarhus, Denmark. Engineered for impact.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      studioLocation: 'Studio in Aarhus, Denmark'
    }
  },
  da: {
    nav: {
      brand: 'FD SOUND LABS',
      showcase: 'Portefølje',
      workflow: 'Workflow',
      pricing: 'Priser',
      contact: 'Kontakt',
      cta: 'Få gratis test-mix'
    },
    hero: {
      headline: 'Produktion med power til moderne rock & metal.',
      subheadline: 'High-impact mixing og studio-tracking skabt til at skære igennem støjen.',
      claimCta: 'FÅ DIT GRATIS TEST-MIX',
      badges: {
        turnaround: '3-4 dages levering',
        revisions: '5 revisioner (inkluderet i betalt arbejde)',
        guarantee: '100% tilfredshedsgaranti'
      }
    },
    showcase: {
      tag: 'PORTEFØLJE • A/B SAMMENLIGNING',
      headline: 'Lyden taler for sig selv.',
      description: 'Ingen polerede salgstaler. Sammenlign de rå optagelser direkte med det færdige master-mix, og hør præcis hvordan dit nummer kan lyde med den rette balance, punch og klarhed.',
      preMix: '[ Før-mix (Ikke tilgængelig) ]',
      preMixDisabledTooltip: 'Rå før-mix lydfiler uploades snarest.',
      finalMix: '[ Færdigt mix ]',
      nowPlaying: 'Afspiller nu færdigt album-ready master-mix'
    },
    workflow: {
      tag: 'DIGITAL KUNDE-HUB • BYGGET TIL HASTIGHED',
      headline: 'Slut med e-mail rod. Total overblik & kontrol.',
      description: 'Hos FD Sound Labs er der en fuldt integreret mixing-portal designet til at spare dig timer af frem-og-tilbage kommunikation, og give dig fuld gennemsigtighed fra første upload til færdigt projekt.',
      steps: [
        {
          num: '01',
          title: 'Smart Upload Validering',
          desc: 'Træk-og-slip dine WAV/AIFF stems. Automatiserede tjeklister verificerer dit BPM, sample rate og track-navngivning med det samme.'
        },
        {
          num: '02',
          title: 'Tidskodede Revisioner & Feedback',
          desc: "Sæt rettelser direkte på den visuelle bølgeform (f.eks. '01:42 – giv snaren mere smæk') og saml alle bandmedlemmers noter ét sted."
        },
        {
          num: '03',
          title: 'Live Tracking & Øjeblikkelig Levering',
          desc: 'Følg fremskridt i realtid. Godkend og betal for det endelige mix og lås op for øjeblikkelig download af 24-bit masters.'
        }
      ],
      cta: 'Kontakt mig & Kom i gang →',
      mockup: {
        title: 'Kingdoms.mp3 (Final Mix)',
        status: 'Status: I gang (Revision 1/5)',
        stemsSynced: '16 spor synkroniseret',
        commentPlaceholder: 'Tilføj tidsstemplet feedback på bølgeformen...',
        indicativeNote: 'Dette er en vejledende visuel præsentation og ikke den aktuelle version af kunde-hubben.',
        stages: ['Upload', 'Redigering', 'Første Udkast', 'Revision', 'Færdig']
      }
    },
    pricing: {
      tag: 'GENNEMSKUELIGE PRISER • INGEN SKJULTE GEBYRER',
      headline: 'Faste projektpriser. Ingen overraskelser.',
      description: 'Slut med uoverskuelige timepriser og studiestress. Faste aftalte priser, professionel redigering og 5 revisionsrunder inkluderet.',
      currencyToggle: 'Vis i',
      guaranteeNote: '100% Tilfredshedsgaranti: Rammer vi mod forventning helt forbi den ønskede retning efter 5 revisionsrunder, refunderes dit depositum fuldt ud. Ekstra revisionsrunder kan tilkøbes for 625 DKK inkl. moms.'
    },
    contact: {
      tag: 'START DIT PROJEKT • RISK-FREE',
      headline: 'Klar til at løfte dit lydbillede?',
      description: 'Udfyld formularen herunder, eller send dine rå multitracks direkte. Jeg vender tilbage inden for 24 timer.',
      nameLabel: 'Navn / Kontaktperson',
      namePlaceholder: 'Dit navn',
      bandLabel: 'Band- / Artistnavn',
      bandPlaceholder: 'Bandnavn',
      emailLabel: 'Email',
      emailPlaceholder: 'din@email.dk',
      serviceLabel: 'Hvad har I brug for?',
      serviceOptions: [
        'Gratis Test-Mix',
        'Full Production Mix',
        'Studio Tracking',
        'Tracking & Full Mix',
        'Andet / Spørgsmål'
      ],
      linkLabel: 'Link til råspor / demo',
      linkPlaceholder: 'Dropbox, WeTransfer, Google Drive link...',
      linkHelp: 'Upload gerne en ukomprimeret WAV-fil eller multitrack-zip.',
      notesLabel: 'Fortæl kort om projektet / Noter',
      notesPlaceholder: 'Beskriv jeres vision, referencenumre, guitartuning eller deadline...',
      submitCta: 'Send henvendelse →',
      submitting: 'Sender henvendelse...',
      privacyNote: 'Vi behandler dit materiale 100% fortroligt. Ingen spam, kun direkte dialog.',
      successTitle: 'Henvendelse modtaget!',
      successDesc: 'Tak for din besked! Jeg gennemgår jeres spor og vender tilbage inden for 24 timer.',
      anotherInquiry: 'Send ny henvendelse'
    },
    footer: {
      tagline: '© 2026 FD SOUND LABS. Aarhus, Danmark. Engineered for impact.',
      privacy: 'Privatlivspolitik',
      terms: 'Vilkår & Betingelser',
      studioLocation: 'Lydstudie i Aarhus, Danmark'
    }
  }
};
