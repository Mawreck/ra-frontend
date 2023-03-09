import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  private readonly BASE_URL = "http://localhost:8080/api";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${ this.BASE_URL }/users`)
      .pipe(
        map(data => data._embedded.users)
      );
  }

}
