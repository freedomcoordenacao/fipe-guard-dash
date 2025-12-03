import { cn } from "@/lib/utils";

interface BrazilMapProps {
  selectedState: string | null;
  onStateSelect: (state: string | null) => void;
}

const brazilStates = [
  { id: "AC", name: "Acre" },
  { id: "AL", name: "Alagoas" },
  { id: "AP", name: "Amapá" },
  { id: "AM", name: "Amazonas" },
  { id: "BA", name: "Bahia" },
  { id: "CE", name: "Ceará" },
  { id: "DF", name: "Distrito Federal" },
  { id: "ES", name: "Espírito Santo" },
  { id: "GO", name: "Goiás" },
  { id: "MA", name: "Maranhão" },
  { id: "MT", name: "Mato Grosso" },
  { id: "MS", name: "Mato Grosso do Sul" },
  { id: "MG", name: "Minas Gerais" },
  { id: "PA", name: "Pará" },
  { id: "PB", name: "Paraíba" },
  { id: "PR", name: "Paraná" },
  { id: "PE", name: "Pernambuco" },
  { id: "PI", name: "Piauí" },
  { id: "RJ", name: "Rio de Janeiro" },
  { id: "RN", name: "Rio Grande do Norte" },
  { id: "RS", name: "Rio Grande do Sul" },
  { id: "RO", name: "Rondônia" },
  { id: "RR", name: "Roraima" },
  { id: "SC", name: "Santa Catarina" },
  { id: "SP", name: "São Paulo" },
  { id: "SE", name: "Sergipe" },
  { id: "TO", name: "Tocantins" }
];

const BrazilMap = ({ selectedState, onStateSelect }: BrazilMapProps) => {
  const handleStateClick = (stateId: string) => {
    if (selectedState === stateId) {
      onStateSelect(null);
    } else {
      onStateSelect(stateId);
    }
  };

  const getStateName = (id: string) => {
    return brazilStates.find(s => s.id === id)?.name || id;
  };

  // Region groupings with colors
  const regions = [
    { 
      name: "Norte", 
      states: ["AC", "AM", "AP", "PA", "RO", "RR", "TO"],
      bgColor: "bg-emerald-500/20 hover:bg-emerald-500/40",
      activeColor: "bg-emerald-500 text-white",
      textColor: "text-emerald-700 dark:text-emerald-300"
    },
    { 
      name: "Nordeste", 
      states: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
      bgColor: "bg-amber-500/20 hover:bg-amber-500/40",
      activeColor: "bg-amber-500 text-white",
      textColor: "text-amber-700 dark:text-amber-300"
    },
    { 
      name: "Centro-Oeste", 
      states: ["DF", "GO", "MS", "MT"],
      bgColor: "bg-rose-500/20 hover:bg-rose-500/40",
      activeColor: "bg-rose-500 text-white",
      textColor: "text-rose-700 dark:text-rose-300"
    },
    { 
      name: "Sudeste", 
      states: ["ES", "MG", "RJ", "SP"],
      bgColor: "bg-blue-500/20 hover:bg-blue-500/40",
      activeColor: "bg-blue-500 text-white",
      textColor: "text-blue-700 dark:text-blue-300"
    },
    { 
      name: "Sul", 
      states: ["PR", "RS", "SC"],
      bgColor: "bg-violet-500/20 hover:bg-violet-500/40",
      activeColor: "bg-violet-500 text-white",
      textColor: "text-violet-700 dark:text-violet-300"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* State buttons by region */}
      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name} className="space-y-2">
            <p className={cn("text-xs font-semibold uppercase tracking-wide", region.textColor)}>
              {region.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {region.states.map((stateId) => (
                <button
                  key={stateId}
                  onClick={() => handleStateClick(stateId)}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 border",
                    selectedState === stateId
                      ? cn(region.activeColor, "border-transparent shadow-md scale-105")
                      : cn(region.bgColor, region.textColor, "border-transparent")
                  )}
                  title={getStateName(stateId)}
                >
                  {stateId}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected state info */}
      {selectedState && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-3 mt-2">
          <p className="text-sm font-medium">
            Filtrando: <span className="text-primary font-semibold">{getStateName(selectedState)}</span>
          </p>
          <button
            onClick={() => onStateSelect(null)}
            className="text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 px-2 py-1 rounded transition-colors"
          >
            Limpar
          </button>
        </div>
      )}
    </div>
  );
};

export default BrazilMap;
