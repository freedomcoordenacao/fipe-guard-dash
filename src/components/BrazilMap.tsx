import { useState } from "react";
import { cn } from "@/lib/utils";

interface BrazilMapProps {
  selectedState: string | null;
  onStateSelect: (state: string | null) => void;
}

const states = [
  { id: "AC", name: "Acre", d: "M95,280 L120,275 L125,295 L105,305 L90,295 Z" },
  { id: "AL", name: "Alagoas", d: "M485,240 L500,235 L505,250 L490,255 Z" },
  { id: "AP", name: "Amapá", d: "M290,95 L320,80 L340,100 L325,130 L295,125 Z" },
  { id: "AM", name: "Amazonas", d: "M100,140 L200,120 L250,140 L260,200 L220,230 L150,240 L100,220 L80,180 Z" },
  { id: "BA", name: "Bahia", d: "M400,220 L480,200 L500,240 L490,300 L440,320 L390,290 L380,250 Z" },
  { id: "CE", name: "Ceará", d: "M450,160 L490,150 L505,180 L480,200 L450,195 Z" },
  { id: "DF", name: "Distrito Federal", d: "M355,290 L370,285 L375,300 L360,305 Z" },
  { id: "ES", name: "Espírito Santo", d: "M455,320 L475,310 L480,340 L460,350 Z" },
  { id: "GO", name: "Goiás", d: "M320,280 L380,270 L400,310 L370,350 L320,340 L310,310 Z" },
  { id: "MA", name: "Maranhão", d: "M360,140 L420,130 L440,170 L410,200 L360,200 L340,170 Z" },
  { id: "MT", name: "Mato Grosso", d: "M220,240 L300,230 L320,280 L310,340 L260,360 L200,340 L180,290 Z" },
  { id: "MS", name: "Mato Grosso do Sul", d: "M260,360 L320,350 L340,400 L300,430 L250,420 L240,380 Z" },
  { id: "MG", name: "Minas Gerais", d: "M360,300 L440,290 L460,340 L420,380 L360,380 L340,340 Z" },
  { id: "PA", name: "Pará", d: "M250,100 L350,90 L380,140 L360,200 L300,220 L240,200 L220,150 Z" },
  { id: "PB", name: "Paraíba", d: "M475,195 L510,185 L515,205 L480,210 Z" },
  { id: "PR", name: "Paraná", d: "M300,400 L370,390 L385,430 L340,450 L290,440 Z" },
  { id: "PE", name: "Pernambuco", d: "M440,210 L510,195 L515,225 L485,235 L440,230 Z" },
  { id: "PI", name: "Piauí", d: "M400,160 L440,150 L450,200 L420,220 L390,210 L385,180 Z" },
  { id: "RJ", name: "Rio de Janeiro", d: "M420,380 L460,370 L475,395 L440,410 Z" },
  { id: "RN", name: "Rio Grande do Norte", d: "M480,165 L515,155 L520,180 L490,185 Z" },
  { id: "RS", name: "Rio Grande do Sul", d: "M290,460 L350,450 L365,500 L320,530 L270,510 L260,480 Z" },
  { id: "RO", name: "Rondônia", d: "M150,250 L200,240 L210,290 L180,310 L140,295 Z" },
  { id: "RR", name: "Roraima", d: "M170,60 L220,50 L240,90 L210,120 L170,110 Z" },
  { id: "SC", name: "Santa Catarina", d: "M320,450 L370,440 L380,470 L345,485 L310,475 Z" },
  { id: "SP", name: "São Paulo", d: "M330,380 L400,370 L420,410 L380,440 L320,430 Z" },
  { id: "SE", name: "Sergipe", d: "M485,255 L505,250 L510,270 L490,275 Z" },
  { id: "TO", name: "Tocantins", d: "M340,200 L380,190 L395,250 L370,280 L340,270 L330,230 Z" }
];

const BrazilMap = ({ selectedState, onStateSelect }: BrazilMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const handleStateClick = (stateId: string) => {
    if (selectedState === stateId) {
      onStateSelect(null);
    } else {
      onStateSelect(stateId);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <svg
        viewBox="0 0 600 580"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {states.map((state) => (
          <g key={state.id}>
            <path
              d={state.d}
              className={cn(
                "cursor-pointer transition-all duration-200 stroke-border stroke-[1.5]",
                selectedState === state.id
                  ? "fill-primary"
                  : hoveredState === state.id
                  ? "fill-primary/60"
                  : "fill-muted hover:fill-muted-foreground/20"
              )}
              onClick={() => handleStateClick(state.id)}
              onMouseEnter={() => setHoveredState(state.id)}
              onMouseLeave={() => setHoveredState(null)}
            />
            <text
              x={state.d.split(" ")[0].replace("M", "")}
              y={state.d.split(" ")[1]}
              className="text-[10px] fill-foreground pointer-events-none font-medium"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`translate(15, 15)`}
            >
              {state.id}
            </text>
          </g>
        ))}
      </svg>
      
      {selectedState && (
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            Estado selecionado: <span className="text-primary">{states.find(s => s.id === selectedState)?.name}</span>
          </p>
          <button
            onClick={() => onStateSelect(null)}
            className="text-xs text-muted-foreground hover:text-foreground mt-1"
          >
            Limpar seleção
          </button>
        </div>
      )}
      
      {hoveredState && !selectedState && (
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <p className="text-sm font-medium text-foreground">
            {states.find(s => s.id === hoveredState)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default BrazilMap;
