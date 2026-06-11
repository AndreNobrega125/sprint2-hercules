import { create } from 'zustand';
import { Notificacao } from '../types';
import { mockNotificacoes } from '../mocks';

interface NotificationStore {
  notificacoes: Notificacao[];
  unreadCount: number;
  addNotificacao: (notificacao: Notificacao) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotificacao: (id: string) => void;
  initializeNotificacoes: (usuarioId: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notificacoes: [],
  unreadCount: 0,

  initializeNotificacoes: (usuarioId: string) => {
    const userNotificacoes = mockNotificacoes.filter(n => n.usuario_id === usuarioId);
    const unreadCount = userNotificacoes.filter(n => !n.lida).length;
    set({ notificacoes: userNotificacoes, unreadCount });
  },

  addNotificacao: (notificacao: Notificacao) => {
    set(state => ({
      notificacoes: [notificacao, ...state.notificacoes],
      unreadCount: state.unreadCount + 1
    }));
  },

  markAsRead: (id: string) => {
    set(state => ({
      notificacoes: state.notificacoes.map(n =>
        n.id === id ? { ...n, lida: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notificacoes: state.notificacoes.map(n => ({ ...n, lida: true })),
      unreadCount: 0
    }));
  },

  deleteNotificacao: (id: string) => {
    set(state => ({
      notificacoes: state.notificacoes.filter(n => n.id !== id)
    }));
  }
}));
