import axios from 'axios';

export const API_URL = 'https://rickandmortyapi.com/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
