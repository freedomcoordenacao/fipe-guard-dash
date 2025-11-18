import { ReactNode, useState } from "react";
import { Upload, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ImportExcelDialog from "./ImportExcelDialog";

interface PageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  onImportData?: (data: any[]) => void;
}

const PageLayout = ({ title, description, children, onImportData }: PageLayoutProps) => {
  const { toast } = useToast();
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleExcelImport = () => {
    setImportDialogOpen(true);
  };

  const handleImport = (data: any[]) => {
    if (onImportData) {
      onImportData(data);
    }
  };

  const handleDatabaseSync = () => {
    toast({
      title: "Sincronização com Banco de Dados",
      description: "Funcionalidade de sincronização será implementada",
    });
  };

  return (
    <>
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

      <ImportExcelDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImport}
        title={`Importar ${title}`}
        description={`Selecione um arquivo Excel (.xlsx) ou CSV (.csv) para importar dados de ${title.toLowerCase()}`}
      />
    </>
  );
};

export default PageLayout;
