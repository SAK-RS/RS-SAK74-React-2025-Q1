import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { API_URL } from 'api/setup';
import { CharacterResponse } from 'api/types';
import { type SearchType } from 'api';

import { setAll } from './heroesSlice';

export const charactersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (
    builder: EndpointBuilder<
      BaseQueryFn<
        FetchArgs | string,
        CharacterResponse,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      never,
      'api'
    >
  ) => ({
    getCharacters: builder.query<
      CharacterResponse,
      SearchType & { page?: number }
    >({
      async queryFn(arg, api, _extraOptions, baseQuery) {
        const baseResponse = await baseQuery({
          url: '/character',
          params: arg,
        });
        console.log('baseResponse: ', baseResponse);
        if (baseResponse.data) {
          api.dispatch(setAll(baseResponse.data.results));
        }
        return baseResponse;
      },
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
