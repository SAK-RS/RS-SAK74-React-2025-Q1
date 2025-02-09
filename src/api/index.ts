import { AxiosError } from 'axios';
import { CharacterResponse } from './types';
import { axiosInstance } from './setup';

type SearchType = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
};

export async function getCharacters(
  params?: SearchType & { page?: number }
): Promise<CharacterResponse> {
  try {
    const response = await axiosInstance.get<CharacterResponse>('/character', {
      params: {
        name: params?.name,
        status: params?.status,
        species: params?.species,
        type: params?.type,
        page: params?.page,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    let message = 'An error occurred while fetching characters';
    if (err instanceof AxiosError && err.response) {
      message = err.response.data.error;
    }
    return Promise.reject(message);
  }
}
