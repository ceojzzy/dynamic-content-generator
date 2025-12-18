import { ScholarshipData } from '@/types/scholarship';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Info, 
  Building, 
  Globe, 
  DollarSign, 
  BookOpen, 
  Users, 
  Clock, 
  FileText, 
  Lightbulb, 
  Star, 
  HelpCircle, 
  CheckCircle,
  MapPin,
  GraduationCap,
  Calendar,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useState } from 'react';

interface HtmlPreviewProps {
  data: ScholarshipData;
}

export function HtmlPreview({ data }: HtmlPreviewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <ScrollArea className="h-full scrollbar-thin">
      <div className="bg-background min-h-full">
        {/* Simulated Hero */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-8 px-6 border-b border-border">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-card px-3 py-1.5 rounded-full text-sm text-muted-foreground mb-4 border border-border">
              <span className="w-5 h-4 bg-muted rounded-sm" />
              <span>{data.hero.badge || 'País • Nível'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              {data.hero.title || 'Nome da Bolsa'}
            </h1>
            <p className="text-muted-foreground">
              {data.hero.description || 'Descrição da bolsa...'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
          {/* Article Thumbnail */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border">
            {data.hero.thumbnailUrl ? (
              <img 
                src={data.hero.thumbnailUrl} 
                alt={data.hero.thumbnailAlt} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span>Imagem da Bolsa</span>
              </div>
            )}
          </div>

          {/* About Section */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Info className="w-5 h-5 text-primary" />
              Sobre a Bolsa
            </h2>
            
            {/* Quick Info Card */}
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">País</div>
                    <div className="text-sm font-medium text-foreground">{data.quickInfo.country || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Nível</div>
                    <div className="text-sm font-medium text-foreground">{data.quickInfo.level || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Prazo</div>
                    <div className="text-sm font-medium text-foreground">{data.quickInfo.deadline || '-'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Financiamento</div>
                    <div className="text-sm font-medium text-foreground">{data.quickInfo.funding || '-'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 text-foreground/90">
              {data.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Host Institution */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Building className="w-5 h-5 text-primary" />
              Instituição Anfitriã
            </h2>
            <p className="text-foreground/90">{data.hostInstitution.description}</p>
          </section>

          {/* Eligible Countries */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Globe className="w-5 h-5 text-primary" />
              Países Elegíveis
            </h2>
            <p className="text-foreground/90">{data.eligibleCountries.description}</p>
          </section>

          {/* Coverage */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <DollarSign className="w-5 h-5 text-primary" />
              O Que a Bolsa Cobre
            </h2>
            <ul className="space-y-3">
              {data.coverage.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground/90">
                    <strong>{item.title}</strong> - {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Study Areas */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <BookOpen className="w-5 h-5 text-primary" />
              Áreas e Cursos de Estudos
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.studyAreas.map((area, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-2 rounded-lg text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {area}
                </span>
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Users className="w-5 h-5 text-primary" />
              Critérios de Elegibilidade
            </h2>
            <ul className="space-y-3">
              {data.eligibility.map((criteria, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{criteria}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Documents */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <BookOpen className="w-5 h-5 text-primary" />
              Documentos Necessários
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.requiredDocuments.map((doc, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-2 rounded-lg text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {doc}
                </span>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Clock className="w-5 h-5 text-primary" />
              Cronograma Completo
            </h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Etapa</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {data.timeline.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 px-4 text-sm text-foreground/90">{item.stage}</td>
                      <td className="py-3 px-4 text-sm text-foreground/90">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Application Process */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <FileText className="w-5 h-5 text-primary" />
              Processo de Candidatura
            </h2>
            <ol className="space-y-3">
              {data.applicationProcess.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0 font-medium">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Tips */}
          <section className="animate-fade-in">
            <div className="bg-secondary/30 border border-secondary/50 rounded-lg p-5">
              <div className="flex items-center gap-2 text-secondary-foreground font-medium mb-3">
                <Lightbulb className="w-5 h-5" />
                Dicas para uma Candidatura Forte
              </div>
              <ul className="space-y-2">
                {data.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Advantages */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <Star className="w-5 h-5 text-primary" />
              Vantagens do Programa
            </h2>
            <ul className="space-y-3">
              {data.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground/90">
                    <strong>{adv.title}</strong> - {adv.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <HelpCircle className="w-5 h-5 text-primary" />
              Perguntas Frequentes
            </h2>
            <div className="space-y-2">
              {data.faq.map((item, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground text-sm">{item.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-foreground/80 border-t border-border pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final Considerations */}
          <section className="animate-fade-in">
            <h2 className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground mb-4 pb-2 border-b border-border">
              <CheckCircle className="w-5 h-5 text-primary" />
              Considerações Finais
            </h2>
            <div className="space-y-3 text-foreground/90">
              {data.finalConsiderations.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* CTA Box */}
          <section className="animate-fade-in">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-6 text-center">
              <h3 className="text-xl font-serif font-bold text-foreground mb-2">{data.cta.title}</h3>
              <p className="text-muted-foreground mb-4">{data.cta.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  {data.cta.applyText}
                </button>
                <button className="inline-flex items-center justify-center gap-2 bg-success text-success-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-success/90 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {data.cta.whatsappText}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ScrollArea>
  );
}
