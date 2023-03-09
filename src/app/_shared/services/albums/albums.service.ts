import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Album, AlbumResponse, Photo, PhotoResponse } from "./albums.model";

@Injectable({
  providedIn: "root"
})
export class AlbumsService {

  private readonly BASE_URL = "http://localhost:8080/api";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  postAlbum(userId: string, album: Album): Observable<Album> {
    return this.httpClient.post<Album>(`${ this.BASE_URL }/users/${ userId }/albums`, album);
  }

  getAlbumsByUserId(userId: number): Observable<Album[]> {
    return this.httpClient.get<AlbumResponse>(`${ this.BASE_URL }/albums/search/findByUserId?userId=${ userId }`)
      .pipe(
        map(data => data._embedded.albums)
      );
  }

  deleteAlbumByAlbumId(albumId: number): Observable<Album[]> {
    return this.httpClient.delete<any>(`${ this.BASE_URL }/albums/${ albumId }`);
  }

  postPhoto(albumId: string, photo: Photo): Observable<Photo> {
    return this.httpClient.post<Photo>(`${ this.BASE_URL }/albums/${ albumId }/photos`, photo);
  }

  getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return this.httpClient.get<PhotoResponse>(`${ this.BASE_URL }/photos/search/findByAlbumId?albumId=${ albumId }`)
      .pipe(
        map(data => data._embedded.photos)
      );
  }

  deletePhotoByPhotoId(photoId: number): Observable<Photo[]> {
    return this.httpClient.delete<any>(`${ this.BASE_URL }/photos/${ photoId }`);
  }

}
