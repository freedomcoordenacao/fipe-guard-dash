import { ReactNode } from "react";
import { Upload, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const PageLayout = ({ title, description, children }: PageLayoutProps) => {
  const { toast } = useToast();

  const handleExcelImport = () => {
    toast({
      title: "Importação de Excel",
      description: "Funcionalidade de importação será implementada",
    });
  };

  const handleDatabaseSync = () => {
    toast({
      title: "Sincronização com Banco de Dados",
      description: "Funcionalidade de sincronização será implementada",
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleExcelImport}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Importar Excel
          </Button>
          <Button 
            onClick={handleDatabaseSync}
            className="gap-2"
          >
            <Database className="w-4 h-4" />
            Atualizar Banco
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
