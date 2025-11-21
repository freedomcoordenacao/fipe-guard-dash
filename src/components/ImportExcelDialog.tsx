import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface ImportExcelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (data: any[]) => void;
  title: string;
  description: string;
  requiredColumns?: string[];
}

const ImportExcelDialog = ({ open, onOpenChange, onImport, title, description, requiredColumns = [] }: ImportExcelDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [missingColumns, setMissingColumns] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'xlsx' || fileExtension === 'csv') {
        setFile(selectedFile);
        processFile(selectedFile);
      } else {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo .xlsx ou .csv",
          variant: "destructive",
        });
      }
    }
  };

  const validateColumns = (data: any[]): string[] => {
    if (requiredColumns.length === 0 || data.length === 0) return [];
    
    const fileColumns = Object.keys(data[0]);
    const missing = requiredColumns.filter(col => !fileColumns.includes(col));
    return missing;
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Validate required columns
      const missing = validateColumns(jsonData);
      setMissingColumns(missing);
      
      if (missing.length > 0) {
        toast({
          title: "Colunas obrigatórias ausentes",
          description: `As seguintes colunas estão faltando: ${missing.join(', ')}`,
          variant: "destructive",
        });
      }
      
      setPreviewData(jsonData.slice(0, 5)); // Show first 5 rows as preview
      setIsProcessing(false);
    } catch (error) {
      toast({
        title: "Erro ao processar arquivo",
        description: "Não foi possível ler o arquivo. Verifique o formato.",
        variant: "destructive",
      });
      setIsProcessing(false);
      setFile(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    // Block import if required columns are missing
    if (missingColumns.length > 0) {
      toast({
        title: "Não é possível importar",
        description: `Colunas obrigatórias faltando: ${missingColumns.join(', ')}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      onImport(jsonData);
      
      toast({
        title: "Importação concluída",
        description: `${jsonData.length} registro(s) importado(s) com sucesso`,
      });
      
      setFile(null);
      setPreviewData([]);
      setMissingColumns([]);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro na importação",
        description: "Não foi possível importar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreviewData([]);
    setMissingColumns([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Clique para selecionar ou arraste um arquivo
              </p>
              <p className="text-xs text-muted-foreground">
                Formatos suportados: .xlsx, .csv
              </p>
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
          )}

          {missingColumns.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">Colunas obrigatórias ausentes</p>
                <p className="text-xs text-destructive/80 mt-1">
                  {missingColumns.join(', ')}
                </p>
              </div>
            </div>
          )}

          {previewData.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Pré-visualização (primeiras 5 linhas)</h3>
              <div className="border rounded-lg overflow-auto max-h-48">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr>
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="p-2 text-left font-semibold border-b">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        {Object.values(row).map((value: any, cellIdx) => (
                          <td key={cellIdx} className="p-2">
                            {String(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!file || isProcessing || missingColumns.length > 0}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              {isProcessing ? "Processando..." : "Importar Dados"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportExcelDialog;
