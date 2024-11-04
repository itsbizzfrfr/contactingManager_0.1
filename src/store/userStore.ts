import { create } from 'zustand';
import { User } from '../types/user';

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    department: string;
    institution: string;
    city: string;
  };
  setFilter: (key: keyof UserStore['filters'], value: string) => void;
  clearFilters: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  filters: {
    department: '',
    institution: '',
    city: '',
  },
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  clearFilters: () =>
    set({
      searchTerm: '',
      filters: { department: '', institution: '', city: '' },
    }),
}));