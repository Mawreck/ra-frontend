import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WebpageComponent } from "./webpage.component";
import { UsersComponent } from "./users/users.component";
import { AlbumsComponent } from "./albums/albums.component";
import { LogsComponent } from "./logs/logs.component";
import { AlbumComponent } from "./albums/album/album.component";

@NgModule({
  imports: [RouterModule.forChild([
      {
        path: "",
        component: WebpageComponent,
        children: [
          {
            path: "",
            component: UsersComponent
          },
          {
            path: ":username/albums/:id",
            component: AlbumsComponent
          },
          {
            path: ":username/albums/:id/album/:id",
            component: AlbumComponent
          },
          {
            path: "logs",
            component: LogsComponent
          }
        ]
      }
    ]
  )],
  exports: [RouterModule]
})
export class WebpageRoutingModule {
}
