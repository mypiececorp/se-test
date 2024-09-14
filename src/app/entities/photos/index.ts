import {client} from 'shared/api';

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
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export async function getPhotos({
  params,
}: {
  params: {query: string; page?: number; per_page?: number};
}) {
  const response = client
    .get<{
      photos: Array<IPhoto>;
    }>(GET_PHOTOS_ROUTES, {params})
    .then(res => res.data);
  return response;
}
