import { Component, OnInit } from "@angular/core";
import { Album, AlbumsService, LogsService } from "@shared";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, switchMap, tap } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlbumsFormGroup } from "./albums.model";

@Component({
  selector: "app-albums",
  templateUrl: "./albums.component.html",
  styleUrls: ["./albums.component.scss"]
})
export class AlbumsComponent implements OnInit {

  params: Params;
  albums: Album[];

  formGroup: FormGroup<AlbumsFormGroup>;

  private initFormGroup() {
    this.formGroup = new FormGroup<AlbumsFormGroup>({
      title: new FormControl("", [
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
    this.getAlbums();
  }

  showAlbum(albumid: number) {
    this.router.navigate(["album", albumid], { relativeTo: this.activatedRoute });
  }

  onAddAlbumClick() {
    const title = this.formGroup.controls.title.value;

    if (!title) {
      return;
    }

    const album: any = {
      title
    };

    this.albumsService.postAlbum(this.params["id"], album).pipe(
      switchMap(() => this.logsService.postLog({
        logType: "ALBUMS",
        action: "ADD",
        username: this.params["username"]
      }))
    ).subscribe(() => this.getAlbums());
  }

  getAlbums() {
    this.activatedRoute.params.pipe(
      tap(params => this.params = params),
      map(params => params["id"]),
      switchMap(id => this.albumsService.getAlbumsByUserId(id)
        .pipe(
          tap(albums => this.albums = albums)
        )
      )
    ).subscribe();
  }

  deleteAlbum(albumId: number) {
    this.albumsService.deleteAlbumByAlbumId(albumId)
      .pipe(
        switchMap(() => this.logsService.postLog({
          logTypeId: albumId,
          logType: "ALBUMS",
          action: "DELETE",
          username: this.params["username"]
        }))
      ).subscribe(() => this.getAlbums());
  }

}
