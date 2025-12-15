import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScholarshipData } from '@/types/scholarship';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Globe,
  Image,
  FileText,
  Building,
  MapPin,
  DollarSign,
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  Lightbulb,
  Star,
  HelpCircle,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  Plus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface ScholarshipFormProps {
  data: ScholarshipData;
  updateSeo: (field: keyof ScholarshipData['seo'], value: string) => void;
  updateHero: (field: keyof ScholarshipData['hero'], value: string) => void;
  updateQuickInfo: (field: keyof ScholarshipData['quickInfo'], value: string) => void;
  updateAbout: (paragraphs: string[]) => void;
  updateHostInstitution: (description: string) => void;
  updateEligibleCountries: (description: string) => void;
  updateCoverage: (items: ScholarshipData['coverage']['items']) => void;
  updateStudyAreas: (areas: string[]) => void;
  updateEligibility: (criteria: string[]) => void;
  updateTimeline: (timeline: ScholarshipData['timeline']) => void;
  updateApplicationProcess: (steps: string[]) => void;
  updateTips: (tips: string[]) => void;
  updateAdvantages: (advantages: ScholarshipData['advantages']) => void;
  updateFaq: (faq: ScholarshipData['faq']) => void;
  updateFinalConsiderations: (paragraphs: string[]) => void;
  updateCta: (field: keyof ScholarshipData['cta'], value: string) => void;
}

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FormSection({ title, icon, children, defaultOpen = false }: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="form-section">
      <CollapsibleTrigger className="w-full">
        <div className="form-section-title cursor-pointer hover:text-primary transition-colors">
          {icon}
          <span className="flex-1 text-left">{title}</span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export function ScholarshipForm({
  data,
  updateSeo,
  updateHero,
  updateQuickInfo,
  updateAbout,
  updateHostInstitution,
  updateEligibleCountries,
  updateCoverage,
  updateStudyAreas,
  updateEligibility,
  updateTimeline,
  updateApplicationProcess,
  updateTips,
  updateAdvantages,
  updateFaq,
  updateFinalConsiderations,
  updateCta,
}: ScholarshipFormProps) {
  const addArrayItem = (arr: string[], setter: (arr: string[]) => void) => {
    setter([...arr, '']);
  };

  const updateArrayItem = (arr: string[], index: number, value: string, setter: (arr: string[]) => void) => {
    const newArr = [...arr];
    newArr[index] = value;
    setter(newArr);
  };

  const removeArrayItem = (arr: string[], index: number, setter: (arr: string[]) => void) => {
    setter(arr.filter((_, i) => i !== index));
  };

  return (
    <ScrollArea className="h-full scrollbar-thin">
      <div className="space-y-4 p-6">
        {/* SEO & OG Tags */}
        <FormSection title="SEO & Open Graph" icon={<Globe className="w-5 h-5 text-primary" />} defaultOpen={true}>
          <FormField label="Título da Página">
            <Input
              value={data.seo.title}
              onChange={(e) => updateSeo('title', e.target.value)}
              placeholder="Bolsa de Estudo 2025/2026 | AngoScholar"
            />
          </FormField>
          <FormField label="Meta Descrição">
            <Textarea
              value={data.seo.description}
              onChange={(e) => updateSeo('description', e.target.value)}
              placeholder="Descrição para motores de busca..."
              rows={2}
            />
          </FormField>
          <FormField label="Keywords">
            <Input
              value={data.seo.keywords}
              onChange={(e) => updateSeo('keywords', e.target.value)}
              placeholder="bolsa, estudo, mestrado, angola"
            />
          </FormField>
          <FormField label="URL Canónica">
            <Input
              value={data.seo.canonicalUrl}
              onChange={(e) => updateSeo('canonicalUrl', e.target.value)}
              placeholder="https://angoscholar.com/bolsas/..."
            />
          </FormField>
          <FormField label="OG Título">
            <Input
              value={data.seo.ogTitle}
              onChange={(e) => updateSeo('ogTitle', e.target.value)}
            />
          </FormField>
          <FormField label="OG Descrição">
            <Textarea
              value={data.seo.ogDescription}
              onChange={(e) => updateSeo('ogDescription', e.target.value)}
              rows={2}
            />
          </FormField>
          <FormField label="OG Imagem URL">
            <Input
              value={data.seo.ogImage}
              onChange={(e) => updateSeo('ogImage', e.target.value)}
              placeholder="https://angoscholar.com/images/..."
            />
          </FormField>
        </FormSection>

        {/* Hero Section */}
        <FormSection title="Hero & Imagem Principal" icon={<Image className="w-5 h-5 text-primary" />}>
          <FormField label="Badge (ex: 'Reino Unido • Mestrado')">
            <Input
              value={data.hero.badge}
              onChange={(e) => updateHero('badge', e.target.value)}
            />
          </FormField>
          <FormField label="Título Principal">
            <Input
              value={data.hero.title}
              onChange={(e) => updateHero('title', e.target.value)}
              placeholder="Bolsa Chevening 2025/2026"
            />
          </FormField>
          <FormField label="Descrição do Hero">
            <Textarea
              value={data.hero.description}
              onChange={(e) => updateHero('description', e.target.value)}
              rows={2}
            />
          </FormField>
          <FormField label="URL da Imagem Thumbnail">
            <Input
              value={data.hero.thumbnailUrl}
              onChange={(e) => updateHero('thumbnailUrl', e.target.value)}
            />
          </FormField>
          <FormField label="Alt da Imagem">
            <Input
              value={data.hero.thumbnailAlt}
              onChange={(e) => updateHero('thumbnailAlt', e.target.value)}
            />
          </FormField>
        </FormSection>

        {/* Quick Info */}
        <FormSection title="Informações Rápidas" icon={<FileText className="w-5 h-5 text-primary" />}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="País">
              <Input
                value={data.quickInfo.country}
                onChange={(e) => updateQuickInfo('country', e.target.value)}
              />
            </FormField>
            <FormField label="URL da Bandeira">
              <Input
                value={data.quickInfo.countryFlag}
                onChange={(e) => updateQuickInfo('countryFlag', e.target.value)}
                placeholder="/flags/gb.svg"
              />
            </FormField>
            <FormField label="Nível de Estudo">
              <Input
                value={data.quickInfo.level}
                onChange={(e) => updateQuickInfo('level', e.target.value)}
              />
            </FormField>
            <FormField label="Prazo">
              <Input
                value={data.quickInfo.deadline}
                onChange={(e) => updateQuickInfo('deadline', e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Financiamento">
            <Input
              value={data.quickInfo.funding}
              onChange={(e) => updateQuickInfo('funding', e.target.value)}
            />
          </FormField>
        </FormSection>

        {/* About */}
        <FormSection title="Sobre a Bolsa" icon={<Building className="w-5 h-5 text-primary" />}>
          {data.about.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Textarea
                value={p}
                onChange={(e) => updateArrayItem(data.about.paragraphs, i, e.target.value, updateAbout)}
                placeholder={`Parágrafo ${i + 1}...`}
                rows={2}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.about.paragraphs, i, updateAbout)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.about.paragraphs, updateAbout)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Parágrafo
          </Button>
        </FormSection>

        {/* Host Institution */}
        <FormSection title="Instituição Anfitriã" icon={<Building className="w-5 h-5 text-primary" />}>
          <FormField label="Descrição">
            <Textarea
              value={data.hostInstitution.description}
              onChange={(e) => updateHostInstitution(e.target.value)}
              rows={3}
            />
          </FormField>
        </FormSection>

        {/* Eligible Countries */}
        <FormSection title="Países Elegíveis" icon={<MapPin className="w-5 h-5 text-primary" />}>
          <FormField label="Descrição">
            <Textarea
              value={data.eligibleCountries.description}
              onChange={(e) => updateEligibleCountries(e.target.value)}
              rows={3}
            />
          </FormField>
        </FormSection>

        {/* Coverage */}
        <FormSection title="O Que a Bolsa Cobre" icon={<DollarSign className="w-5 h-5 text-primary" />}>
          {data.coverage.items.map((item, i) => (
            <div key={i} className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex gap-2">
                <Input
                  value={item.title}
                  onChange={(e) => {
                    const newItems = [...data.coverage.items];
                    newItems[i] = { ...item, title: e.target.value };
                    updateCoverage(newItems);
                  }}
                  placeholder="Título do benefício"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateCoverage(data.coverage.items.filter((_, idx) => idx !== i))}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <Input
                value={item.description}
                onChange={(e) => {
                  const newItems = [...data.coverage.items];
                  newItems[i] = { ...item, description: e.target.value };
                  updateCoverage(newItems);
                }}
                placeholder="Descrição"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateCoverage([...data.coverage.items, { title: '', description: '' }])}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Benefício
          </Button>
        </FormSection>

        {/* Study Areas */}
        <FormSection title="Áreas de Estudo" icon={<BookOpen className="w-5 h-5 text-primary" />}>
          {data.studyAreas.map((area, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={area}
                onChange={(e) => updateArrayItem(data.studyAreas, i, e.target.value, updateStudyAreas)}
                placeholder={`Área ${i + 1}`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.studyAreas, i, updateStudyAreas)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.studyAreas, updateStudyAreas)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Área
          </Button>
        </FormSection>

        {/* Eligibility */}
        <FormSection title="Critérios de Elegibilidade" icon={<Users className="w-5 h-5 text-primary" />}>
          {data.eligibility.map((criteria, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={criteria}
                onChange={(e) => updateArrayItem(data.eligibility, i, e.target.value, updateEligibility)}
                placeholder={`Critério ${i + 1}`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.eligibility, i, updateEligibility)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.eligibility, updateEligibility)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Critério
          </Button>
        </FormSection>

        {/* Timeline */}
        <FormSection title="Cronograma" icon={<Calendar className="w-5 h-5 text-primary" />}>
          {data.timeline.map((item, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={item.stage}
                onChange={(e) => {
                  const newTimeline = [...data.timeline];
                  newTimeline[i] = { ...item, stage: e.target.value };
                  updateTimeline(newTimeline);
                }}
                placeholder="Etapa"
                className="flex-1"
              />
              <Input
                value={item.date}
                onChange={(e) => {
                  const newTimeline = [...data.timeline];
                  newTimeline[i] = { ...item, date: e.target.value };
                  updateTimeline(newTimeline);
                }}
                placeholder="Data"
                className="w-32"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateTimeline(data.timeline.filter((_, idx) => idx !== i))}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateTimeline([...data.timeline, { stage: '', date: '' }])}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Etapa
          </Button>
        </FormSection>

        {/* Application Process */}
        <FormSection title="Processo de Candidatura" icon={<ClipboardList className="w-5 h-5 text-primary" />}>
          {data.applicationProcess.map((step, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 mt-2">
                {i + 1}
              </span>
              <Textarea
                value={step}
                onChange={(e) => updateArrayItem(data.applicationProcess, i, e.target.value, updateApplicationProcess)}
                placeholder={`Passo ${i + 1}`}
                rows={2}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.applicationProcess, i, updateApplicationProcess)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.applicationProcess, updateApplicationProcess)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Passo
          </Button>
        </FormSection>

        {/* Tips */}
        <FormSection title="Dicas" icon={<Lightbulb className="w-5 h-5 text-primary" />}>
          {data.tips.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={tip}
                onChange={(e) => updateArrayItem(data.tips, i, e.target.value, updateTips)}
                placeholder={`Dica ${i + 1}`}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.tips, i, updateTips)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.tips, updateTips)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Dica
          </Button>
        </FormSection>

        {/* Advantages */}
        <FormSection title="Vantagens do Programa" icon={<Star className="w-5 h-5 text-primary" />}>
          {data.advantages.map((adv, i) => (
            <div key={i} className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex gap-2">
                <Input
                  value={adv.title}
                  onChange={(e) => {
                    const newAdvantages = [...data.advantages];
                    newAdvantages[i] = { ...adv, title: e.target.value };
                    updateAdvantages(newAdvantages);
                  }}
                  placeholder="Título"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateAdvantages(data.advantages.filter((_, idx) => idx !== i))}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <Input
                value={adv.description}
                onChange={(e) => {
                  const newAdvantages = [...data.advantages];
                  newAdvantages[i] = { ...adv, description: e.target.value };
                  updateAdvantages(newAdvantages);
                }}
                placeholder="Descrição"
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateAdvantages([...data.advantages, { title: '', description: '' }])}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Vantagem
          </Button>
        </FormSection>

        {/* FAQ */}
        <FormSection title="Perguntas Frequentes" icon={<HelpCircle className="w-5 h-5 text-primary" />}>
          {data.faq.map((item, i) => (
            <div key={i} className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex gap-2">
                <Input
                  value={item.question}
                  onChange={(e) => {
                    const newFaq = [...data.faq];
                    newFaq[i] = { ...item, question: e.target.value };
                    updateFaq(newFaq);
                  }}
                  placeholder="Pergunta"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateFaq(data.faq.filter((_, idx) => idx !== i))}
                  className="shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
              <Textarea
                value={item.answer}
                onChange={(e) => {
                  const newFaq = [...data.faq];
                  newFaq[i] = { ...item, answer: e.target.value };
                  updateFaq(newFaq);
                }}
                placeholder="Resposta"
                rows={2}
              />
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFaq([...data.faq, { question: '', answer: '' }])}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar FAQ
          </Button>
        </FormSection>

        {/* Final Considerations */}
        <FormSection title="Considerações Finais" icon={<CheckCircle className="w-5 h-5 text-primary" />}>
          {data.finalConsiderations.map((p, i) => (
            <div key={i} className="flex gap-2">
              <Textarea
                value={p}
                onChange={(e) => updateArrayItem(data.finalConsiderations, i, e.target.value, updateFinalConsiderations)}
                placeholder={`Parágrafo ${i + 1}...`}
                rows={2}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(data.finalConsiderations, i, updateFinalConsiderations)}
                className="shrink-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(data.finalConsiderations, updateFinalConsiderations)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Parágrafo
          </Button>
        </FormSection>

        {/* CTA */}
        <FormSection title="Call to Action" icon={<ExternalLink className="w-5 h-5 text-primary" />}>
          <FormField label="Título">
            <Input
              value={data.cta.title}
              onChange={(e) => updateCta('title', e.target.value)}
            />
          </FormField>
          <FormField label="Descrição">
            <Input
              value={data.cta.description}
              onChange={(e) => updateCta('description', e.target.value)}
            />
          </FormField>
          <FormField label="URL de Candidatura">
            <Input
              value={data.cta.applyUrl}
              onChange={(e) => updateCta('applyUrl', e.target.value)}
            />
          </FormField>
          <FormField label="Texto do Botão de Candidatura">
            <Input
              value={data.cta.applyText}
              onChange={(e) => updateCta('applyText', e.target.value)}
            />
          </FormField>
          <FormField label="URL do WhatsApp">
            <Input
              value={data.cta.whatsappUrl}
              onChange={(e) => updateCta('whatsappUrl', e.target.value)}
            />
          </FormField>
          <FormField label="Texto do Botão WhatsApp">
            <Input
              value={data.cta.whatsappText}
              onChange={(e) => updateCta('whatsappText', e.target.value)}
            />
          </FormField>
        </FormSection>
      </div>
    </ScrollArea>
  );
}
