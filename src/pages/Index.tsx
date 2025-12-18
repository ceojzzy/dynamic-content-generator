import { useScholarshipForm } from '@/hooks/useScholarshipForm';
import { ScholarshipForm } from '@/components/ScholarshipForm';
import { HtmlPreview } from '@/components/HtmlPreview';
import { generateHtml } from '@/utils/generateHtml';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { 
  Download, 
  Copy, 
  Eye,
  Code,
  RotateCcw,
  GraduationCap,
  FileJson,
} from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const scholarshipForm = useScholarshipForm();
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  const handleDownloadHtml = () => {
    const html = generateHtml(scholarshipForm.data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scholarshipForm.data.json.slug || 'bolsa'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'HTML Gerado',
      description: 'O arquivo HTML foi descarregado com sucesso.',
    });
  };

  const handleCopyHtml = async () => {
    const html = generateHtml(scholarshipForm.data);
    await navigator.clipboard.writeText(html);
    toast({
      title: 'Copiado!',
      description: 'O código HTML foi copiado para a área de transferência.',
    });
  };

  const handleCopyJson = async () => {
    const jsonData = scholarshipForm.data.json;
    const jsonString = `{
    id: '${jsonData.id}',
    slug: '${jsonData.slug}',
    title: '${jsonData.title}',
    title_en: '${jsonData.title_en}',
    description: '${jsonData.description}',
    description_en: '${jsonData.description_en}',
    country: '${jsonData.country}',
    country_code: '${jsonData.country_code}',
    level: '${jsonData.level}',
    level_en: "${jsonData.level_en}",
    deadline: '${jsonData.deadline}',
    funding: '${jsonData.funding}',
    image_url: '${jsonData.image_url}',
    featured: ${jsonData.featured},
    created_at: '${jsonData.created_at}',
  },`;
    await navigator.clipboard.writeText(jsonString);
    toast({
      title: 'JSON Copiado!',
      description: 'O objeto JSON foi copiado para a área de transferência.',
    });
  };

  const handleReset = () => {
    scholarshipForm.resetData();
    toast({
      title: 'Formulário Limpo',
      description: 'Todos os campos foram restaurados para os valores padrão.',
    });
  };

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 md:h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="h-full px-3 md:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif text-base md:text-lg font-bold text-foreground truncate">AngoScholar</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Gerador de Páginas de Bolsas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="hidden md:flex"
            >
              <RotateCcw className="w-4 h-4 md:mr-2" />
              <span className="hidden lg:inline">Limpar</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyJson}
              className="px-2 md:px-3"
            >
              <FileJson className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">JSON</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyHtml}
              className="px-2 md:px-3"
            >
              <Copy className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">HTML</span>
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadHtml}
              className="px-2 md:px-3"
            >
              <Download className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Download</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-border bg-muted/30">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'form'
              ? 'text-primary border-b-2 border-primary bg-card/50'
              : 'text-muted-foreground'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-primary border-b-2 border-primary bg-card/50'
              : 'text-muted-foreground'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Form Panel */}
        <div className={`lg:w-[440px] xl:w-[480px] lg:border-r border-border bg-card/30 flex flex-col ${
          activeTab === 'form' ? 'flex-1 lg:flex-none' : 'hidden lg:flex'
        }`}>
          <div className="h-10 md:h-12 px-4 items-center justify-between border-b border-border bg-muted/30 hidden lg:flex">
            <span className="text-sm font-medium text-foreground">Editor de Conteúdo</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <ScholarshipForm 
              data={scholarshipForm.data}
              {...scholarshipForm}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 flex flex-col ${
          activeTab === 'preview' ? 'flex' : 'hidden lg:flex'
        }`}>
          <div className="h-10 md:h-12 px-4 flex items-center justify-between border-b border-border bg-muted/30">
            <span className="text-sm font-medium text-foreground hidden lg:block">Preview em Tempo Real</span>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1 mx-auto lg:mx-0">
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'preview' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'code' 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Código
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden bg-background">
            {viewMode === 'preview' ? (
              <HtmlPreview data={scholarshipForm.data} />
            ) : (
              <div className="h-full p-2 md:p-4">
                <pre className="h-full overflow-auto bg-foreground/5 rounded-lg p-3 md:p-4 text-[10px] md:text-xs font-mono text-foreground/80 scrollbar-thin">
                  {generateHtml(scholarshipForm.data)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
