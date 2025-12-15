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
    const json = JSON.stringify(scholarshipForm.data.json, null, 2);
    await navigator.clipboard.writeText(json);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="h-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-foreground">AngoScholar</h1>
              <p className="text-xs text-muted-foreground">Gerador de Páginas de Bolsas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="hidden sm:flex"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyJson}
            >
              <FileJson className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Copiar</span> JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyHtml}
            >
              <Copy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Copiar</span> HTML
            </Button>
            <Button
              size="sm"
              onClick={handleDownloadHtml}
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Descarregar</span> HTML
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Form Panel */}
        <div className="lg:w-[440px] xl:w-[480px] border-r border-border bg-card/30 flex flex-col">
          <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-muted/30">
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
        <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
          <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-muted/30">
            <span className="text-sm font-medium text-foreground">Preview em Tempo Real</span>
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
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
              <div className="h-full p-4">
                <pre className="h-full overflow-auto bg-foreground/5 rounded-lg p-4 text-xs font-mono text-foreground/80 scrollbar-thin">
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
