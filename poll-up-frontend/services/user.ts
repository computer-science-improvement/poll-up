import api from '@/lib/api';

export const UserService = {
  BASE_URL: '/users',
  init: async (name: string) => {
    try {
      return await api.get(UserService.BASE_URL, {
        params: { name },
      });
    } catch (e) {
      console.error(e);
    }
  },
  patch: ({
    id,
    data,
  }: {
    id: string;
    data: Record<string, string | number>;
  }) => {
    try {
      return api.patch(`${UserService.BASE_URL}/${id}`, {
        params: data,
      });
    } catch (e) {
      console.error(e);
    }
  },
  answerQuestion: ({
    id,
    data,
  }: {
    id: string;
    data: {
      question: string;
      answer: string;
    };
  }) => {
    try {
      return api.post(`${UserService.BASE_URL}/${id}/answer`, {
        params: data,
      });
    } catch (e) {
      console.error(e);
    }
  },
};
