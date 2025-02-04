import axios, { AxiosError } from 'axios';
import { API_URL } from './__consts';
import { Character } from 'types';

type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: Character[];
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export async function getCharacters(name?: string) {
  try {
    const response = await axiosInstance.get<CharacterResponse>('/character', {
      params: { name },
    });
    return response.data.results;
  } catch (err) {
    console.error(err);
    let message = 'An error occurred while fetching characters';
    if (err instanceof AxiosError && err.response) {
      message = err.response.data.error;
    }
    return Promise.reject(message);
  }
}
