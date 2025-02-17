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
        const customData = isPredefinedError(data)
          ? data.error
          : isString(data)
            ? data
            : '';
        return { status, data: customData };
      },
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;

function isPredefinedError(err: unknown): err is { error: string } {
  return typeof err === 'object' && err !== null && 'error' in err;
}

function isString(data: unknown): data is string {
  return typeof data === 'string';
}
