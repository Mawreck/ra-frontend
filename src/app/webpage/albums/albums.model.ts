import { FormControl } from "@angular/forms";

export interface AlbumsFormGroup {
  title: FormControl<string | null>;
}
