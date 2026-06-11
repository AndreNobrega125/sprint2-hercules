import { create } from 'zustand';
import { Trecho, Vistoria, Intervencao } from '../types';
import { mockTrechos, mockVistorias, mockIntervencoes } from '../mocks';

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
  },

  getTrechosWithStatus: (status: string) => {
    return get().trechos.filter(t => t.status === status);
  }
}));
