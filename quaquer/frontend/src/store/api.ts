import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IAuthor {
  username: string;
}

interface IDataItem {
  key: string;
  content: string;
  author: IAuthor;
  createdAt: string;
  likes: number;
}

interface IQuack {
  key: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
}

const getToken = () => {
  return sessionStorage.getItem('authToken');
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQuacks: builder.query<IQuack[], void>({
      query: () => 'quacks',
      transformResponse: (response: IDataItem[]): IQuack[] => {
        return response.map((item): IQuack => {
          return {
            key: item.key,
            content: item.content,
            author: item.author.username,
            createdAt: item.createdAt,
            likes: item.likes
          }
        })
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetQuacksQuery } = api;
