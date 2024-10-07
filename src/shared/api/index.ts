import axios from 'axios';

const URL = 'https://api.pexels.com/v1/';

export const client = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Ratelimit-Limit': '20000',
    'X-Ratelimit-Remaining': '19684',
    'X-Ratelimit-Reset': '1590529646',
    Authorization: '0KydNPkbA1QleGSUU3ND9D2GIZswnNxD5I5hX8nN4ncaCAq0iPoc0xNG',
  },
});

const GET_PHOTOS_ROUTES = 'search';

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: ISrc;
  liked: boolean;
  alt: string;
}

interface ISrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export async function getPhotos({
  params,
}: {
  params: {query: string; page?: number; per_page?: number};
}) {
  const response = client
    .get<{
      photos: Array<IPhoto>;
      next_page?: string;
      page: number;
      per_page: number;
    }>(GET_PHOTOS_ROUTES, {params})
    .then(res => res.data);
  return response;
}
