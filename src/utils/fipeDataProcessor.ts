export interface FipeVehicle {
  codigoTabelaReferencia: string;
  codigoTipoVeiculo: string;
  TipoVeiculo: string;
  codigoMarca: string;
  Marca: string;
  codigoModelo: string;
  Modelo: string;
  AnoModelo: string;
  Combustivel: string;
  CodigoFipe: string;
  Valor: string;
  Aceito: string;
  RB: string;
  ValeParaPerdaTotal: string;
  ValePraQualquerBatida: string;
  ValorDaFranquia: string;
  DanosMateriais: string;
  ValorProtecao: string;
  UF: string;
  MES: string;
}

export interface FipeStats {
  totalVeiculos: number;
  totalMarcas: number;
  veiculosAceitos: number;
  percentualAceitos: number;
}

export const parseFipeData = (csvContent: string): FipeVehicle[] => {
  const lines = csvContent.trim().split('\n');
  const vehicles: FipeVehicle[] = [];
  
  // Skip header lines (first 3 lines)
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.startsWith('|--')) continue;
    
    const columns = line.split('|').map(col => col.trim()).filter(col => col);
    
    if (columns.length >= 20) {
      vehicles.push({
        codigoTabelaReferencia: columns[0],
        codigoTipoVeiculo: columns[1],
        TipoVeiculo: columns[2],
        codigoMarca: columns[3],
        Marca: columns[4],
        codigoModelo: columns[5],
        Modelo: columns[6],
        AnoModelo: columns[7],
        Combustivel: columns[8],
        CodigoFipe: columns[9],
        Valor: columns[10],
        Aceito: columns[11],
        RB: columns[12],
        ValeParaPerdaTotal: columns[13],
        ValePraQualquerBatida: columns[14],
        ValorDaFranquia: columns[15],
        DanosMateriais: columns[16],
        ValorProtecao: columns[17],
        UF: columns[18],
        MES: columns[19] || ''
      });
    }
  }
  
  return vehicles;
};

export const calculateFipeStats = (vehicles: FipeVehicle[]): FipeStats => {
  const totalVeiculos = vehicles.length;
  
  // Get unique brands
  const uniqueBrands = new Set(vehicles.map(v => v.Marca));
  const totalMarcas = uniqueBrands.size;
  
  // Count accepted vehicles
  const veiculosAceitos = vehicles.filter(v => v.Aceito.toLowerCase() === 'sim').length;
  
  // Calculate percentage
  const percentualAceitos = totalVeiculos > 0 
    ? ((veiculosAceitos / totalVeiculos) * 100).toFixed(1) 
    : '0';
  
  return {
    totalVeiculos,
    totalMarcas,
    veiculosAceitos,
    percentualAceitos: parseFloat(percentualAceitos)
  };
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('pt-BR');
};
