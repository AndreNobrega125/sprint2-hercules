import { create } from 'zustand';
import { Notificacao } from '../types';
import { mockNotificacoes } from '../mocks';

interface NotificationStore {
  notificacoes: Notificacao[];
  addNotificacao: (notificacao: Notificacao) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (usuarioId: string) => void;
  deleteNotificacao: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notificacoes: mockNotificacoes,

  addNotificacao: (notificacao: Notificacao) => {
    set(state => ({
      notificacoes: [notificacao, ...state.notificacoes]
    }));
  },

  markAsRead: (id: string) => {
    set(state => ({
      notificacoes: state.notificacoes.map(n =>
        n.id === id ? { ...n, lida: true } : n
      )
    }));
  },

  markAllAsRead: (usuarioId: string) => {
    set(state => ({
      notificacoes: state.notificacoes.map(n =>
        n.usuario_id === usuarioId ? { ...n, lida: true } : n
      )
    }));
  },

  deleteNotificacao: (id: string) => {
    set(state => ({
      notificacoes: state.notificacoes.filter(n => n.id !== id)
    }));
  }
}));
