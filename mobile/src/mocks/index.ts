import { Trecho, Vistoria, Intervencao, Notificacao, User } from '../types';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const mockUsers: User[] = [
  {
    id: '1',
    matricula: '100001',
    nome: 'Carlos Silva',
    role: 'gestor',
    regional: 'Regional Oeste',
    email: 'carlos.silva@motiva.com.br'
  },
  {
    id: '2',
    matricula: '200001',
    nome: 'João Fiscal',
    role: 'fiscal',
    regional: 'Regional Oeste',
    email: 'joao.fiscal@motiva.com.br'
  },
  {
    id: '3',
    matricula: '300001',
    nome: 'Pedro Trabalhador',
    role: 'trabalhador',
    regional: 'Regional Oeste',
    email: 'pedro.trabalho@motiva.com.br'
  }
];

export const mockTrechos: Trecho[] = [
  {
    id: '1',
    codigo: 'SP280-KM50',
    endereco: 'Rodovia Castelo Branco, km 50',
    municipio: 'Osasco',
    km_inicio: 49.5,
    km_fim: 50.5,
    regional: 'Regional Oeste',
    status: 'critico',
    altura_atual: 35,
    data_ultima_vistoria: formatDate(yesterday),
    responsavel: 'João Fiscal',
    latitude: -23.5315,
    longitude: -46.7892
  },
  {
    id: '2',
    codigo: 'SP280-KM55',
    endereco: 'Rodovia Castelo Branco, km 55',
    municipio: 'Osasco',
    km_inicio: 54.5,
    km_fim: 55.5,
    regional: 'Regional Oeste',
    status: 'atencao',
    altura_atual: 22,
    data_ultima_vistoria: formatDate(yesterday),
    responsavel: 'João Fiscal',
    latitude: -23.5210,
    longitude: -46.8150
  },
  {
    id: '3',
    codigo: 'SP280-KM60',
    endereco: 'Rodovia Castelo Branca, km 60',
    municipio: 'Itapevi',
    km_inicio: 59.5,
    km_fim: 60.5,
    regional: 'Regional Oeste',
    status: 'ok',
    altura_atual: 8,
    data_ultima_vistoria: formatDate(today),
    responsavel: 'João Fiscal',
    latitude: -23.5100,
    longitude: -46.8420
  },
  {
    id: '4',
    codigo: 'SP280-KM65',
    endereco: 'Rodovia Castelo Branco, km 65',
    municipio: 'Itapevi',
    km_inicio: 64.5,
    km_fim: 65.5,
    regional: 'Regional Oeste',
    status: 'critico',
    altura_atual: 38,
    data_ultima_vistoria: formatDate(yesterday),
    responsavel: 'João Fiscal',
    latitude: -23.4990,
    longitude: -46.8680
  },
  {
    id: '5',
    codigo: 'SP280-KM70',
    endereco: 'Rodovia Castelo Branco, km 70',
    municipio: 'Jandira',
    km_inicio: 69.5,
    km_fim: 70.5,
    regional: 'Regional Oeste',
    status: 'atencao',
    altura_atual: 28,
    data_ultima_vistoria: formatDate(yesterday),
    responsavel: 'João Fiscal',
    latitude: -23.4880,
    longitude: -46.8940
  }
];

export const mockVistorias: Vistoria[] = [
  {
    id: '1',
    trecho_id: '1',
    fiscal_id: '2',
    data: formatDate(yesterday),
    hora: '09:30',
    altura: 35,
    foto_url: 'assets/vegetacao1.jpg',
    observacoes: 'Vegetação muito alta, necessário corte urgente',
    status: 'concluido',
    coordenadas: {
      latitude: -23.5315,
      longitude: -46.7892
    }
  },
  {
    id: '2',
    trecho_id: '2',
    fiscal_id: '2',
    data: formatDate(yesterday),
    hora: '10:15',
    altura: 22,
    foto_url: 'assets/vegetacao2.jpg',
    observacoes: 'Vegetação em nível de atenção',
    status: 'concluido',
    coordenadas: {
      latitude: -23.5210,
      longitude: -46.8150
    }
  },
  {
    id: '3',
    trecho_id: '3',
    fiscal_id: '2',
    data: formatDate(today),
    hora: '08:00',
    altura: 8,
    foto_url: 'assets/vegetacao3.jpg',
    observacoes: 'Vegetação dentro dos padrões',
    status: 'concluido',
    coordenadas: {
      latitude: -23.5100,
      longitude: -46.8420
    }
  }
];

export const mockIntervencoes: Intervencao[] = [
  {
    id: '1',
    vistoria_id: '1',
    trecho_id: '1',
    tipo: 'rocada',
    data_recomendada: formatDate(today),
    prioridade: 'alta',
    status: 'pendente',
    observacoes: 'Roçada imediata - risco de autuação regulatória (altura > 30cm)'
  },
  {
    id: '2',
    vistoria_id: '2',
    trecho_id: '2',
    tipo: 'rocada',
    data_recomendada: formatDate(tomorrow),
    prioridade: 'media',
    status: 'pendente',
    observacoes: 'Roçada preventiva em 15 dias'
  },
  {
    id: '3',
    vistoria_id: '3',
    trecho_id: '3',
    tipo: 'rocada',
    data_recomendada: '',
    prioridade: 'baixa',
    status: 'concluida',
    data_conclusao: formatDate(today),
    observacoes: 'Monitoramento regular'
  },
  {
    id: '4',
    vistoria_id: '4',
    trecho_id: '4',
    tipo: 'rocada',
    data_recomendada: formatDate(today),
    prioridade: 'alta',
    status: 'pendente',
    observacoes: 'Roçada imediata - altura crítica'
  }
];

export const mockNotificacoes: Notificacao[] = [
  {
    id: '1',
    usuario_id: '1',
    titulo: 'Alerta Crítico',
    mensagem: 'Trecho SP280-KM50 com vegetação crítica (35cm)',
    tipo: 'alerta',
    data: formatDate(today),
    lida: false,
    trecho_id: '1'
  },
  {
    id: '2',
    usuario_id: '1',
    titulo: 'Nova Intervenção Registrada',
    mensagem: 'Intervenção de roçada foi concluída no trecho SP280-KM60',
    tipo: 'conclusao',
    data: formatDate(today),
    lida: false,
    trecho_id: '3'
  },
  {
    id: '3',
    usuario_id: '2',
    titulo: 'Trechos para Vistoria',
    mensagem: '2 trechos aguardam inspeção hoje',
    tipo: 'pendencia',
    data: formatDate(today),
    lida: false
  }
];

export function getUserRole(matricula: string): 'gestor' | 'fiscal' | 'trabalhador' {
  const firstDigit = parseInt(matricula[0]);
  if (firstDigit === 1) return 'gestor';
  if (firstDigit === 2) return 'fiscal';
  if (firstDigit === 3) return 'trabalhador';
  return 'fiscal';
}

export function getMockUserByMatricula(matricula: string): User | undefined {
  const role = getUserRole(matricula);
  const rolePrefix = role === 'gestor' ? '1' : role === 'fiscal' ? '2' : '3';

  return mockUsers.find(u => u.role === role);
}
