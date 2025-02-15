import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'api/setup';
import { CharacterResponse } from 'api/types';
import { SearchType } from 'api';

export const charactersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      CharacterResponse,
      SearchType & { page?: number }
    >({
      query(arg) {
        return {
          url: '/character',
          params: {
            name: arg?.name,
            status: arg?.status,
            species: arg?.species,
            type: arg?.type,
            page: arg?.page,
          },
        };
      },
      transformErrorResponse({ status, data }) {
        const customData = data ? (data as { error: string }).error : undefined;
        return { status, data: customData };
      },
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
