import api from '@/lib/api';

export const FactsService = {
  BASE_URL: '/users/facts',
  getFacts: async () => {
    try {
      return await api.get(FactsService.BASE_URL);
    } catch (e) {
      console.error(e);
    }
  },
};
