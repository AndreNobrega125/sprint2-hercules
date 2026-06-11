import { create } from 'zustand';
import { User, UserRole } from '../types';
import { getMockUserByMatricula, getUserRole } from '../mocks';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (matricula: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (matricula: string) => {
    const role = getUserRole(matricula);

    const user: User = {
      id: matricula,
      matricula,
      nome: role === 'gestor' ? 'Carlos Silva' : role === 'fiscal' ? 'João Fiscal' : 'Pedro Trabalhador',
      role,
      regional: 'Regional Oeste',
      email: `user${matricula}@motiva.com.br`
    };

    set({ user, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
