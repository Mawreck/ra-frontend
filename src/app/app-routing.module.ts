import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [RouterModule.forRoot([
      {
        path: "",
        loadChildren: () => import("./webpage/webpage.module").then(m => m.WebpageModule)
      },
      {
        path: "**",
        redirectTo: ""
      }
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
