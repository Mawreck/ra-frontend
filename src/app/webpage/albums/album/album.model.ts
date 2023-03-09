import { FormControl } from "@angular/forms";

export interface AlbumFormGroup {
  title: FormControl<string | null>;
  imageUrl: FormControl<string | null>;
}
