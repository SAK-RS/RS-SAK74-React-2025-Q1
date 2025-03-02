import { API_URL } from 'api/setup';
import { http, HttpResponse } from 'msw';
import data, { results, info } from './data.json';

export const handlers = [
  http.get(API_URL + '/character', async ({ request }) => {
    const search = new URL(request.url).searchParams.get('name');
    const searchingResults = results.filter((res) => res.name === search);
    return HttpResponse.json(
      !search ? data : JSON.stringify({ info, results: searchingResults })
    );
  }),
];
