import { useState } from "react";
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
  const [hoveredState, setHoveredState] = useState<string | null>(null);

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

  // Region groupings for organized display
  const regions = [
    { name: "Norte", states: ["AC", "AM", "AP", "PA", "RO", "RR", "TO"] },
    { name: "Nordeste", states: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"] },
    { name: "Centro-Oeste", states: ["DF", "GO", "MS", "MT"] },
    { name: "Sudeste", states: ["ES", "MG", "RJ", "SP"] },
    { name: "Sul", states: ["PR", "RS", "SC"] }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Interactive Brazil Map Image */}
      <div className="relative w-full">
        <svg viewBox="0 0 500 480" className="w-full h-auto">
          {/* Background */}
          <rect width="500" height="480" fill="transparent" />
          
          {/* Roraima - RR */}
          <path
            id="RR"
            d="M147,31 L175,20 L205,25 L220,50 L210,85 L175,95 L145,80 L135,55 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "RR" ? "fill-primary stroke-primary-foreground" : hoveredState === "RR" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("RR")}
            onMouseEnter={() => setHoveredState("RR")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Amapá - AP */}
          <path
            id="AP"
            d="M295,25 L320,15 L350,30 L355,65 L335,95 L300,90 L285,60 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "AP" ? "fill-primary stroke-primary-foreground" : hoveredState === "AP" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("AP")}
            onMouseEnter={() => setHoveredState("AP")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Amazonas - AM */}
          <path
            id="AM"
            d="M50,95 L145,80 L175,95 L210,85 L230,110 L280,115 L290,160 L270,210 L220,240 L140,245 L80,220 L45,175 L40,130 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "AM" ? "fill-primary stroke-primary-foreground" : hoveredState === "AM" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("AM")}
            onMouseEnter={() => setHoveredState("AM")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Pará - PA */}
          <path
            id="PA"
            d="M230,90 L300,90 L335,95 L360,115 L385,105 L400,130 L390,175 L350,195 L290,200 L270,210 L290,160 L280,115 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "PA" ? "fill-primary stroke-primary-foreground" : hoveredState === "PA" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("PA")}
            onMouseEnter={() => setHoveredState("PA")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Acre - AC */}
          <path
            id="AC"
            d="M40,240 L80,220 L140,245 L145,280 L115,305 L70,295 L45,265 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "AC" ? "fill-primary stroke-primary-foreground" : hoveredState === "AC" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("AC")}
            onMouseEnter={() => setHoveredState("AC")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Rondônia - RO */}
          <path
            id="RO"
            d="M140,245 L180,235 L210,260 L205,310 L170,330 L130,315 L115,305 L145,280 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "RO" ? "fill-primary stroke-primary-foreground" : hoveredState === "RO" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("RO")}
            onMouseEnter={() => setHoveredState("RO")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Mato Grosso - MT */}
          <path
            id="MT"
            d="M180,235 L220,240 L270,210 L290,200 L310,220 L305,280 L285,340 L230,360 L175,340 L170,330 L205,310 L210,260 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "MT" ? "fill-primary stroke-primary-foreground" : hoveredState === "MT" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("MT")}
            onMouseEnter={() => setHoveredState("MT")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Tocantins - TO */}
          <path
            id="TO"
            d="M310,195 L350,195 L370,220 L365,280 L340,310 L305,280 L310,220 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "TO" ? "fill-primary stroke-primary-foreground" : hoveredState === "TO" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("TO")}
            onMouseEnter={() => setHoveredState("TO")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Maranhão - MA */}
          <path
            id="MA"
            d="M350,115 L400,130 L420,155 L410,195 L370,220 L350,195 L390,175 L385,145 L360,115 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "MA" ? "fill-primary stroke-primary-foreground" : hoveredState === "MA" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("MA")}
            onMouseEnter={() => setHoveredState("MA")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Piauí - PI */}
          <path
            id="PI"
            d="M370,165 L410,155 L430,180 L425,230 L395,255 L365,230 L365,195 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "PI" ? "fill-primary stroke-primary-foreground" : hoveredState === "PI" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("PI")}
            onMouseEnter={() => setHoveredState("PI")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Ceará - CE */}
          <path
            id="CE"
            d="M410,145 L455,135 L475,160 L460,195 L425,200 L410,175 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "CE" ? "fill-primary stroke-primary-foreground" : hoveredState === "CE" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("CE")}
            onMouseEnter={() => setHoveredState("CE")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Rio Grande do Norte - RN */}
          <path
            id="RN"
            d="M455,160 L485,155 L495,175 L480,195 L455,195 L460,175 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "RN" ? "fill-primary stroke-primary-foreground" : hoveredState === "RN" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("RN")}
            onMouseEnter={() => setHoveredState("RN")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Paraíba - PB */}
          <path
            id="PB"
            d="M455,195 L495,190 L500,210 L470,220 L450,215 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "PB" ? "fill-primary stroke-primary-foreground" : hoveredState === "PB" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("PB")}
            onMouseEnter={() => setHoveredState("PB")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Pernambuco - PE */}
          <path
            id="PE"
            d="M395,215 L450,215 L470,220 L480,240 L440,255 L395,245 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "PE" ? "fill-primary stroke-primary-foreground" : hoveredState === "PE" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("PE")}
            onMouseEnter={() => setHoveredState("PE")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Alagoas - AL */}
          <path
            id="AL"
            d="M455,250 L480,245 L488,265 L470,275 L455,265 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "AL" ? "fill-primary stroke-primary-foreground" : hoveredState === "AL" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("AL")}
            onMouseEnter={() => setHoveredState("AL")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Sergipe - SE */}
          <path
            id="SE"
            d="M455,270 L475,275 L478,295 L460,300 L450,285 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "SE" ? "fill-primary stroke-primary-foreground" : hoveredState === "SE" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("SE")}
            onMouseEnter={() => setHoveredState("SE")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Bahia - BA */}
          <path
            id="BA"
            d="M365,250 L395,245 L440,255 L455,265 L455,285 L460,300 L465,330 L445,365 L390,375 L350,350 L340,310 L365,280 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "BA" ? "fill-primary stroke-primary-foreground" : hoveredState === "BA" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("BA")}
            onMouseEnter={() => setHoveredState("BA")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Goiás - GO */}
          <path
            id="GO"
            d="M285,300 L340,310 L350,350 L335,385 L290,395 L265,370 L270,330 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "GO" ? "fill-primary stroke-primary-foreground" : hoveredState === "GO" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("GO")}
            onMouseEnter={() => setHoveredState("GO")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Distrito Federal - DF */}
          <path
            id="DF"
            d="M320,335 L340,330 L345,345 L330,355 L315,345 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "DF" ? "fill-primary stroke-primary-foreground" : hoveredState === "DF" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("DF")}
            onMouseEnter={() => setHoveredState("DF")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Minas Gerais - MG */}
          <path
            id="MG"
            d="M335,350 L390,375 L430,370 L450,400 L420,435 L360,440 L315,415 L290,395 L335,385 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "MG" ? "fill-primary stroke-primary-foreground" : hoveredState === "MG" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("MG")}
            onMouseEnter={() => setHoveredState("MG")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Espírito Santo - ES */}
          <path
            id="ES"
            d="M435,370 L465,360 L475,395 L455,415 L430,405 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "ES" ? "fill-primary stroke-primary-foreground" : hoveredState === "ES" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("ES")}
            onMouseEnter={() => setHoveredState("ES")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Rio de Janeiro - RJ */}
          <path
            id="RJ"
            d="M400,420 L430,410 L455,420 L450,450 L415,455 L395,440 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "RJ" ? "fill-primary stroke-primary-foreground" : hoveredState === "RJ" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("RJ")}
            onMouseEnter={() => setHoveredState("RJ")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* São Paulo - SP */}
          <path
            id="SP"
            d="M290,400 L360,440 L400,420 L395,455 L345,475 L285,455 L270,420 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "SP" ? "fill-primary stroke-primary-foreground" : hoveredState === "SP" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("SP")}
            onMouseEnter={() => setHoveredState("SP")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Mato Grosso do Sul - MS */}
          <path
            id="MS"
            d="M175,340 L230,360 L285,340 L285,395 L270,420 L285,455 L245,470 L200,440 L185,390 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "MS" ? "fill-primary stroke-primary-foreground" : hoveredState === "MS" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("MS")}
            onMouseEnter={() => setHoveredState("MS")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Paraná - PR */}
          <path
            id="PR"
            d="M245,455 L285,455 L345,475 L340,510 L285,520 L245,495 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "PR" ? "fill-primary stroke-primary-foreground" : hoveredState === "PR" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("PR")}
            onMouseEnter={() => setHoveredState("PR")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Santa Catarina - SC */}
          <path
            id="SC"
            d="M270,510 L340,510 L350,545 L300,560 L260,540 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "SC" ? "fill-primary stroke-primary-foreground" : hoveredState === "SC" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("SC")}
            onMouseEnter={() => setHoveredState("SC")}
            onMouseLeave={() => setHoveredState(null)}
          />
          
          {/* Rio Grande do Sul - RS */}
          <path
            id="RS"
            d="M235,540 L300,560 L320,600 L280,640 L220,620 L200,570 Z"
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedState === "RS" ? "fill-primary stroke-primary-foreground" : hoveredState === "RS" ? "fill-primary/60" : "fill-muted hover:fill-accent",
              "stroke-border stroke-1"
            )}
            onClick={() => handleStateClick("RS")}
            onMouseEnter={() => setHoveredState("RS")}
            onMouseLeave={() => setHoveredState(null)}
          />
        </svg>
        
        {/* Hover tooltip */}
        {hoveredState && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-md px-3 py-1.5 shadow-lg z-10">
            <p className="text-sm font-medium">{getStateName(hoveredState)}</p>
          </div>
        )}
      </div>

      {/* State buttons by region */}
      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.name} className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{region.name}</p>
            <div className="flex flex-wrap gap-1">
              {region.states.map((stateId) => (
                <button
                  key={stateId}
                  onClick={() => handleStateClick(stateId)}
                  className={cn(
                    "px-2 py-1 text-xs font-medium rounded transition-colors",
                    selectedState === stateId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground"
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
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-3">
          <p className="text-sm font-medium">
            Filtrando: <span className="text-primary">{getStateName(selectedState)}</span>
          </p>
          <button
            onClick={() => onStateSelect(null)}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Limpar
          </button>
        </div>
      )}
    </div>
  );
};

export default BrazilMap;
