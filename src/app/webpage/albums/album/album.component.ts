import { Component, OnInit } from "@angular/core";
import { map, switchMap, tap } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AlbumsService, LogsService, Photo } from "@shared";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlbumFormGroup } from "./album.model";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.scss"]
})
export class AlbumComponent implements OnInit {

  params: Params;
  photos: Photo[];

  formGroup: FormGroup<AlbumFormGroup>;

  private initFormGroup() {
    this.formGroup = new FormGroup<AlbumFormGroup>({
      title: new FormControl("", [
        Validators.required
      ]),
      imageUrl: new FormControl("", [
        Validators.required
      ])
    }, {
      updateOn: "blur"
    });
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private albumsService: AlbumsService,
    private logsService: LogsService
  ) {
    this.initFormGroup();
  }

  ngOnInit() {
    this.getPhotos();
  }

  onAddPhotoClick() {
    const title = this.formGroup.controls.title.value;
    const imageUrl = this.formGroup.controls.imageUrl.value;

    if (!title || !imageUrl) {
      return;
    }

    const photo: any = {
      title,
      imageUrl
    };

    this.albumsService.postPhoto(this.params["id"], photo).pipe(
      switchMap(() => this.logsService.postLog({
        logType: "PHOTOS",
        action: "ADD",
        username: this.params["username"]
      }))
    ).subscribe(() => this.getPhotos());
  }

  getPhotos() {
    this.activatedRoute.params.pipe(
      tap(params => this.params = params),
      map(params => params["id"]),
      switchMap(id => this.albumsService.getPhotosByAlbumId(id)
        .pipe(
          tap(photos => this.photos = photos)
        )
      )
    ).subscribe();
  }

  deletePhoto(photoId: number) {
    this.albumsService.deletePhotoByPhotoId(photoId)
      .pipe(
        switchMap(() => this.logsService.postLog({
          logTypeId: photoId,
          logType: "PHOTOS",
          action: "DELETE",
          username: this.params["username"]
        }))
      ).subscribe(() => this.getPhotos());
  }

}
