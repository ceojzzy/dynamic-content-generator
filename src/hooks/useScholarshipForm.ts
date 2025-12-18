import { useState, useCallback } from 'react';
import { ScholarshipData, ScholarshipJson, defaultScholarshipData } from '@/types/scholarship';

export function useScholarshipForm(initialData: ScholarshipData = defaultScholarshipData) {
  const [data, setData] = useState<ScholarshipData>(initialData);

  const updateJson = useCallback((field: keyof ScholarshipJson, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      json: { ...prev.json, [field]: value }
    }));
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
