import { Car } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="bg-gradient-header shadow-elevated">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Painel Principal</h1>
            <p className="text-white/80 text-sm">Monitoramento Geral das atividades</p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
            <Car className="w-8 h-8 text-white" />
            <div className="text-right">
              <p className="text-xs text-white/70 uppercase tracking-wider">Grupo</p>
              <p className="text-lg font-bold text-white">Fernando Barros</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
