import { create } from 'zustand';
import { Trecho, Vistoria, Intervencao } from '../types';
import { mockTrechos, mockVistorias, mockIntervencoes } from '../mocks';
import { useNotificationStore } from './notificationStore';

interface DataStore {
  trechos: Trecho[];
  vistorias: Vistoria[];
  intervencoes: Intervencao[];
  getTrechoById: (id: string) => Trecho | undefined;
  getVistoriasByTrecho: (trechoId: string) => Vistoria[];
  getIntervencoesByTrecho: (trechoId: string) => Intervencao[];
  createVistoria: (vistoria: Vistoria) => void;
  updateTrechoStatus: (trechoId: string, status: any, altura: number) => void;
  completeIntervencao: (intervencaoId: string) => void;
  getTrechosWithStatus: (status: string) => Trecho[];
}

export const useDataStore = create<DataStore>((set, get) => ({
  trechos: mockTrechos,
  vistorias: mockVistorias,
  intervencoes: mockIntervencoes,

  getTrechoById: (id: string) => {
    return get().trechos.find(t => t.id === id);
  },

  getVistoriasByTrecho: (trechoId: string) => {
    return get().vistorias.filter(v => v.trecho_id === trechoId);
  },

  getIntervencoesByTrecho: (trechoId: string) => {
    return get().intervencoes.filter(i => i.trecho_id === trechoId);
  },

  createVistoria: (vistoria: Vistoria) => {
    set(state => ({
      vistorias: [...state.vistorias, vistoria]
    }));

    const trecho = get().getTrechoById(vistoria.trecho_id);
    const notificationStore = useNotificationStore.getState();

    // Notificar Gestor
    notificationStore.addNotificacao({
      id: `notif-vistoria-gestor-${Date.now()}`,
      usuario_id: '1',
      titulo: 'Nova Vistoria Registrada',
      mensagem: `Fiscal registrou vistoria no trecho ${trecho?.codigo}: ${vistoria.altura}cm`,
      tipo: 'info',
      data: new Date().toISOString().split('T')[0],
      lida: false,
      trecho_id: vistoria.trecho_id
    });

    // Notificar Trabalhador
    notificationStore.addNotificacao({
      id: `notif-vistoria-trabalho-${Date.now()}`,
      usuario_id: '3',
      titulo: 'Nova Vistoria Disponível',
      mensagem: `Vistoria registrada no trecho ${trecho?.codigo} - Verificar se precisa roçada`,
      tipo: 'pendencia',
      data: new Date().toISOString().split('T')[0],
      lida: false,
      trecho_id: vistoria.trecho_id
    });
  },

  updateTrechoStatus: (trechoId: string, status: any, altura: number) => {
    set(state => ({
      trechos: state.trechos.map(t =>
        t.id === trechoId
          ? {
              ...t,
              status,
              altura_atual: altura,
              data_ultima_vistoria: new Date().toISOString().split('T')[0]
            }
          : t
      )
    }));
  },

  completeIntervencao: (intervencaoId: string) => {
    set(state => ({
      intervencoes: state.intervencoes.map(i =>
        i.id === intervencaoId
          ? {
              ...i,
              status: 'concluida',
              data_conclusao: new Date().toISOString().split('T')[0]
            }
          : i
      )
    }));

    const intervencao = get().intervencoes.find(i => i.id === intervencaoId);
    const trecho = get().getTrechoById(intervencao?.trecho_id || '');
    const notificationStore = useNotificationStore.getState();

    if (intervencao && trecho) {
      notificationStore.addNotificacao({
        id: `notif-rocada-fiscal-${Date.now()}`,
        usuario_id: '2',
        titulo: 'Roçada Concluída',
        mensagem: `Trabalhador concluiu roçada no trecho ${trecho.codigo}`,
        tipo: 'conclusao',
        data: new Date().toISOString().split('T')[0],
        lida: false,
        trecho_id: intervencao.trecho_id
      });

      notificationStore.addNotificacao({
        id: `notif-rocada-gestor-${Date.now()}`,
        usuario_id: '1',
        titulo: 'Roçada Concluída',
        mensagem: `Trabalhador concluiu roçada no trecho ${trecho.codigo}`,
        tipo: 'conclusao',
        data: new Date().toISOString().split('T')[0],
        lida: false,
        trecho_id: intervencao.trecho_id
      });
    }
  },

  getTrechosWithStatus: (status: string) => {
    return get().trechos.filter(t => t.status === status);
  }
}));
