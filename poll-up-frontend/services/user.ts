import api from '@/lib/api';

export const UserService = {
  BASE_URL: '/users',
  init: async (name: string) => {
    try {
      const res = await api.post(UserService.BASE_URL, {
        name,
      });

      return res;
    } catch (e) {
      console.error(e);
    }
  },
  update: async ({
    id,
    data,
  }: {
    id: string;
    data: Record<string, string | number>;
  }) => {
    try {
      return await api.patch(`${UserService.BASE_URL}/${id}`, {
        id,
        ...data,
      });
    } catch (e) {
      console.error(e);
    }
  },
  answerQuestion: async ({
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
      return await api.post(`${UserService.BASE_URL}/${id}/answer`, data);
    } catch (e) {
      console.error(e);
    }
  },
  finalize: async (id: string) => {
    try {
      return await api.post(`${UserService.BASE_URL}/${id}/finalize`);
    } catch (e) {
      console.error(e);
    }
  },
};
