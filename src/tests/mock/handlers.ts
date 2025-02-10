import { API_URL } from 'api/setup';
import { http, HttpResponse } from 'msw';
// import data from './data.json';
import data, { results, info } from './data.json';

export const handlers = [
  http.get(API_URL + '/character', async ({ request }) => {
    const search = new URL(request.url).searchParams.get('name');
    const searchingResults = results.filter((res) => res.name === search);
    return HttpResponse.json(
      !search ? data : JSON.stringify({ info, results: searchingResults })
    );
  }),
  // http.get("https://swapi.dev/api/people", ({ request }) => {
  //   const search = new URL(request.url).searchParams.get("search");
  //   const searchingResults = results.filter((res) => res.name === search);
  //   return HttpResponse.json(
  //     !search
  //       ? data
  //       : JSON.stringify({ info, results: searchingResults }),
  //   );
  // }),
];
