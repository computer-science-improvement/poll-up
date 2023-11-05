import api, { BASE_URL } from '@/lib/api';

export const MagicSearchService = {
  BASE_URL: '/users/search',
  search: async (question: string) => {
    try {
      return await api.get(MagicSearchService.BASE_URL, {
        params: { question },
      });
    } catch (e) {
      console.error(e);
    }
  },
  getBio: async (id: string) => {
    return await api.get(`users/${id}/bio`);
  },
};
