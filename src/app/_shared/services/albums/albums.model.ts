import { Paged } from "../../utils/utils.models";

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface AlbumResponse {
  paged: Paged;
  _embedded: {
    albums: Album[];
  };
}

export interface Photo {
  id: number;
  imageUrl: string;
  title: string;
}

export interface PhotoResponse {
  paged: Paged;
  _embedded: {
    photos: Photo[];
  };
}
