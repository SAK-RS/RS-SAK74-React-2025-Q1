import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, type CharacterResponse, type SearchType } from 'api';
import { HYDRATE } from 'next-redux-wrapper';
import type { Character } from 'types';
import type { PayloadAction } from '@reduxjs/toolkit';

export const charactersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    timeout: 3000,
  }),
  extractRehydrationInfo(action: PayloadAction, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
    getCharacterById: builder.query<Character, string>({
      query(id) {
        return `/character/${id}`;
      },
    }),
  }),
});

function isPredefinedError(err: unknown): err is { error: string } {
  return typeof err === 'object' && err !== null && 'error' in err;
}

function isString(data: unknown): data is string {
  return typeof data === 'string';
}

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  util: { getRunningQueriesThunk },
} = charactersApi;

export const { getCharacters, getCharacterById } = charactersApi.endpoints;
