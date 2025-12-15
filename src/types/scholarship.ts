// JSON structure for scholarship listing/cards
export interface ScholarshipJson {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  country: string;
  country_code: string;
  level: string;
  level_en: string;
  deadline: string;
  funding: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export interface ScholarshipData {
  // JSON metadata (for listing)
  json: ScholarshipJson;
  
  // SEO & OG Tags
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
  };
  
  // Quick Info
  quickInfo: {
    country: string;
    countryFlag: string;
    level: string;
    deadline: string;
    funding: string;
  };
  
  // About Section
  about: {
    paragraphs: string[];
  };
  
  // Host Institution
  hostInstitution: {
    description: string;
  };
  
  // Eligible Countries
  eligibleCountries: {
    description: string;
  };
  
  // Coverage
  coverage: {
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  
  // Study Areas
  studyAreas: string[];
  
  // Eligibility Criteria
  eligibility: string[];
  
  // Timeline
  timeline: Array<{
    stage: string;
    date: string;
  }>;
  
  // Application Process
  applicationProcess: string[];
  
  // Tips
  tips: string[];
  
  // Advantages
  advantages: Array<{
    title: string;
    description: string;
  }>;
  
  // FAQ
  faq: Array<{
    question: string;
    answer: string;
  }>;
  
  // Final Considerations
  finalConsiderations: string[];
  
  // CTA
  cta: {
    title: string;
    description: string;
    applyUrl: string;
    applyText: string;
    whatsappUrl: string;
    whatsappText: string;
  };
}

export const defaultScholarshipData: ScholarshipData = {
  json: {
    id: '',
    slug: '',
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    country: '',
    country_code: '',
    level: 'Mestrado',
    level_en: "Master's",
    deadline: '',
    funding: 'Bolsa Completa',
    image_url: '/images/og-exemplo.jpg',
    featured: false,
    created_at: new Date().toISOString().split('T')[0],
  },
  seo: {
    title: "Bolsa de Estudo 2025/2026 - Mestrado | AngoScholar",
    description: "Candidata-te a esta bolsa para fazer o teu mestrado totalmente financiado.",
    keywords: "bolsa de estudo, mestrado, Angola, scholarship",
    canonicalUrl: "https://angoscholar.com/bolsas/exemplo.html",
    ogTitle: "Bolsa de Estudo 2025/2026 - Mestrado Totalmente Financiado",
    ogDescription: "Candidata-te a esta bolsa para fazer o teu mestrado totalmente financiado.",
    ogImage: "https://angoscholar.com/images/og-exemplo.jpg",
    ogUrl: "https://angoscholar.com/bolsas/exemplo.html",
    twitterTitle: "Bolsa de Estudo 2025/2026 - Mestrado",
    twitterDescription: "Candidata-te a esta bolsa para fazer o teu mestrado totalmente financiado.",
    twitterImage: "https://angoscholar.com/images/og-exemplo.jpg",
  },
  hero: {
    badge: "País • Nível",
    title: "Nome da Bolsa 2025/2026",
    description: "Descrição breve da bolsa de estudo e seus principais benefícios.",
    thumbnailUrl: "/images/og-exemplo.jpg",
    thumbnailAlt: "Nome da Bolsa - Estudar no Exterior",
  },
  quickInfo: {
    country: "País",
    countryFlag: "/flags/xx.svg",
    level: "Mestrado",
    deadline: "Data Limite",
    funding: "100% Financiado",
  },
  about: {
    paragraphs: [
      "Descrição detalhada sobre a bolsa de estudo, sua história e missão.",
      "Informações adicionais sobre o programa e seus objetivos.",
    ],
  },
  hostInstitution: {
    description: "Descrição das universidades e instituições parceiras do programa.",
  },
  eligibleCountries: {
    description: "Informações sobre os países elegíveis para esta bolsa de estudo.",
  },
  coverage: {
    items: [
      { title: "Propinas universitárias", description: "Cobertura total das propinas do programa" },
      { title: "Subsídio mensal", description: "Para despesas de vida" },
      { title: "Passagens aéreas", description: "Ida e volta" },
      { title: "Alojamento", description: "Apoio para alojamento" },
    ],
  },
  studyAreas: [
    "Área de Estudo 1",
    "Área de Estudo 2",
    "Área de Estudo 3",
  ],
  eligibility: [
    "Critério de elegibilidade 1",
    "Critério de elegibilidade 2",
    "Critério de elegibilidade 3",
  ],
  timeline: [
    { stage: "Abertura de candidaturas", date: "Data 1" },
    { stage: "Prazo de candidatura", date: "Data 2" },
    { stage: "Resultados", date: "Data 3" },
  ],
  applicationProcess: [
    "Passo 1 do processo de candidatura",
    "Passo 2 do processo de candidatura",
    "Passo 3 do processo de candidatura",
  ],
  tips: [
    "Dica importante 1",
    "Dica importante 2",
  ],
  advantages: [
    { title: "Vantagem 1", description: "Descrição da vantagem" },
    { title: "Vantagem 2", description: "Descrição da vantagem" },
  ],
  faq: [
    { question: "Pergunta frequente 1?", answer: "Resposta à pergunta 1." },
    { question: "Pergunta frequente 2?", answer: "Resposta à pergunta 2." },
  ],
  finalConsiderations: [
    "Consideração final sobre a bolsa.",
  ],
  cta: {
    title: "Pronto para se candidatar?",
    description: "Acede ao portal oficial para começar a tua candidatura.",
    applyUrl: "https://exemplo.com/apply",
    applyText: "Candidatar-se Agora",
    whatsappUrl: "https://wa.me/244999999999",
    whatsappText: "Participar no WhatsApp",
  },
};
