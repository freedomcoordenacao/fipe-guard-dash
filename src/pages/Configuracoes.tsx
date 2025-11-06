import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";

const Configuracoes = () => {
  return (
    <PageLayout
      title="Configurações"
      description="Configure as preferências do sistema"
    >
      <Card className="shadow-card">
        <div className="p-6">
          <p className="text-muted-foreground">
            Página de configurações em desenvolvimento...
          </p>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Configuracoes;
