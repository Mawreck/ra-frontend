import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User, UserResponse } from "./users.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  private readonly BASE_URL = "https://ra-backend.herokuapp.com/api";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<UserResponse>(`${ this.BASE_URL }/users`)
      .pipe(
        map(data => data._embedded.users)
      );
  }

}
