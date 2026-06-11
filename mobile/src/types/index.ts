export type UserRole = 'gestor' | 'fiscal' | 'trabalhador';

export interface User {
  id: string;
  matricula: string;
  nome: string;
  role: UserRole;
  regional: string;
  email?: string;
}

export type VegetationStatus = 'ok' | 'atencao' | 'critico';

export interface Trecho {
  id: string;
  codigo: string;
  endereco: string;
  municipio: string;
  km_inicio: number;
  km_fim: number;
  regional: string;
  status: VegetationStatus;
  altura_atual: number;
  data_ultima_vistoria: string;
  responsavel: string;
  latitude?: number;
  longitude?: number;
}

export interface Vistoria {
  id: string;
  trecho_id: string;
  fiscal_id: string;
  data: string;
  hora: string;
  altura: number;
  foto_url?: string;
  observacoes?: string;
  status: 'pendente' | 'concluido';
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
}

export interface Intervencao {
  id: string;
  vistoria_id: string;
  trecho_id: string;
  trabalhador_id?: string;
  tipo: 'rocada' | 'poda' | 'remocao';
  data_recomendada: string;
  data_conclusao?: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'em_progresso' | 'concluida' | 'cancelada';
  observacoes?: string;
}

export interface Notificacao {
  id: string;
  usuario_id: string;
  titulo: string;
  mensagem: string;
  tipo: 'alerta' | 'conclusao' | 'pendencia' | 'info';
  data: string;
  lida: boolean;
  trecho_id?: string;
}

export interface DashboardGestor {
  total_trechos: number;
  trechos_ok: number;
  trechos_atencao: number;
  trechos_criticos: number;
  conformidade: number;
  intervencoes_pendentes: number;
  intervencoes_em_progresso: number;
}

export interface DashboardFiscal {
  trechos_atribuidos: number;
  trechos_inspecionados_hoje: number;
  trechos_com_alerta: number;
  vistorias_pendentes: number;
}

export interface DashboardTrabalhador {
  intervencoes_pendentes: number;
  intervencoes_em_progresso: number;
  intervencoes_concluidas_hoje: number;
  trechos_para_rocada: Trecho[];
}
