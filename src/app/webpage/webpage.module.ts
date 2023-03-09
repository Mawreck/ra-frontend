import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebpageComponent } from "./webpage.component";
import { FooterComponent } from "./footer/footer.component";
import { WebpageRoutingModule } from "./webpage-routing.module";
import { HeaderComponent } from "./header/header.component";
import { UsersComponent } from "./users/users.component";
import { AlbumsComponent } from "./albums/albums.component";
import { LogsComponent } from "./logs/logs.component";
import { TranslateModule } from "@ngx-translate/core";
import { AlbumComponent } from "./albums/album/album.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    WebpageComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    AlbumsComponent,
    LogsComponent,
    AlbumComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class WebpageModule {
}
