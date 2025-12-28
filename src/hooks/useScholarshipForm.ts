import { useState, useCallback, useEffect } from 'react';
import { ScholarshipData, ScholarshipJson, defaultScholarshipData } from '@/types/scholarship';

const STORAGE_KEY = 'scholarship-form-data';

function loadFromStorage(): ScholarshipData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading from localStorage:', e);
  }
  return null;
}

function saveToStorage(data: ScholarshipData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

export function useScholarshipForm(initialData: ScholarshipData = defaultScholarshipData) {
  const [data, setData] = useState<ScholarshipData>(() => {
    const stored = loadFromStorage();
    return stored || initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  // Sync JSON fields to other related sections
  const updateJson = useCallback((field: keyof ScholarshipJson, value: string | boolean) => {
    setData(prev => {
      const newData = {
        ...prev,
        json: { ...prev.json, [field]: value }
      };

      // Sync title to SEO, Hero, and OG
      if (field === 'title' && typeof value === 'string') {
        newData.seo = { ...newData.seo, title: value, ogTitle: value };
        newData.hero = { ...newData.hero, title: value };
      }

      // Sync description to SEO and OG
      if (field === 'description' && typeof value === 'string') {
        newData.seo = { ...newData.seo, description: value, ogDescription: value };
        newData.hero = { ...newData.hero, description: value };
      }

      // Sync slug to canonical URL and OG URL
      if (field === 'slug' && typeof value === 'string') {
        const canonicalUrl = `https://angoscholar.vercel.app/bolsas/${value}.html`;
        newData.seo = { ...newData.seo, canonicalUrl, ogUrl: canonicalUrl };
      }

      // Sync country to quickInfo
      if (field === 'country' && typeof value === 'string') {
        newData.quickInfo = { ...newData.quickInfo, country: value };
      }

      // Sync country_code to quickInfo flag URL
      if (field === 'country_code' && typeof value === 'string') {
        newData.quickInfo = { ...newData.quickInfo, countryFlag: `/flags/${value}.svg` };
      }

      // Sync level to quickInfo
      if (field === 'level' && typeof value === 'string') {
        newData.quickInfo = { ...newData.quickInfo, level: value };
        // Also update hero badge with country and level
        const country = newData.json.country || 'País';
        newData.hero = { ...newData.hero, badge: `${country} • ${value}` };
      }

      // Sync deadline to quickInfo
      if (field === 'deadline' && typeof value === 'string') {
        newData.quickInfo = { ...newData.quickInfo, deadline: value };
      }

      // Sync funding to quickInfo
      if (field === 'funding' && typeof value === 'string') {
        newData.quickInfo = { ...newData.quickInfo, funding: value };
      }

      // Sync image_url to SEO OG image and hero thumbnail
      if (field === 'image_url' && typeof value === 'string') {
        const fullImageUrl = value.startsWith('http') ? value : `https://angoscholar.vercel.app${value}`;
        newData.seo = { ...newData.seo, ogImage: fullImageUrl, twitterImage: fullImageUrl };
        newData.hero = { ...newData.hero, thumbnailUrl: value };
      }

      return newData;
    });
  }, []);

  const updateSeo = useCallback((field: keyof ScholarshipData['seo'], value: string) => {
    setData(prev => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }));
  }, []);

  const updateHero = useCallback((field: keyof ScholarshipData['hero'], value: string) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  }, []);

  const updateQuickInfo = useCallback((field: keyof ScholarshipData['quickInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      quickInfo: { ...prev.quickInfo, [field]: value }
    }));
  }, []);

  const updateAbout = useCallback((paragraphs: string[]) => {
    setData(prev => ({
      ...prev,
      about: { paragraphs }
    }));
  }, []);

  const updateHostInstitution = useCallback((description: string) => {
    setData(prev => ({
      ...prev,
      hostInstitution: { description }
    }));
  }, []);

  const updateEligibleCountries = useCallback((description: string) => {
    setData(prev => ({
      ...prev,
      eligibleCountries: { description }
    }));
  }, []);

  const updateCoverage = useCallback((items: ScholarshipData['coverage']['items']) => {
    setData(prev => ({
      ...prev,
      coverage: { items }
    }));
  }, []);

  const updateStudyAreas = useCallback((areas: string[]) => {
    setData(prev => ({
      ...prev,
      studyAreas: areas
    }));
  }, []);

  const updateEligibility = useCallback((criteria: string[]) => {
    setData(prev => ({
      ...prev,
      eligibility: criteria
    }));
  }, []);

  const updateRequiredDocuments = useCallback((documents: string[]) => {
    setData(prev => ({
      ...prev,
      requiredDocuments: documents
    }));
  }, []);

  const updateTimeline = useCallback((timeline: ScholarshipData['timeline']) => {
    setData(prev => ({
      ...prev,
      timeline
    }));
  }, []);

  const updateApplicationProcess = useCallback((steps: string[]) => {
    setData(prev => ({
      ...prev,
      applicationProcess: steps
    }));
  }, []);

  const updateTips = useCallback((tips: string[]) => {
    setData(prev => ({
      ...prev,
      tips
    }));
  }, []);

  const updateAdvantages = useCallback((advantages: ScholarshipData['advantages']) => {
    setData(prev => ({
      ...prev,
      advantages
    }));
  }, []);

  const updateFaq = useCallback((faq: ScholarshipData['faq']) => {
    setData(prev => ({
      ...prev,
      faq
    }));
  }, []);

  const updateFinalConsiderations = useCallback((paragraphs: string[]) => {
    setData(prev => ({
      ...prev,
      finalConsiderations: paragraphs
    }));
  }, []);

  const updateCta = useCallback((field: keyof ScholarshipData['cta'], value: string) => {
    setData(prev => ({
      ...prev,
      cta: { ...prev.cta, [field]: value }
    }));
  }, []);

  const resetData = useCallback(() => {
    setData(defaultScholarshipData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    data,
    setData,
    updateJson,
    updateSeo,
    updateHero,
    updateQuickInfo,
    updateAbout,
    updateHostInstitution,
    updateEligibleCountries,
    updateCoverage,
    updateStudyAreas,
    updateEligibility,
    updateRequiredDocuments,
    updateTimeline,
    updateApplicationProcess,
    updateTips,
    updateAdvantages,
    updateFaq,
    updateFinalConsiderations,
    updateCta,
    resetData,
  };
}
