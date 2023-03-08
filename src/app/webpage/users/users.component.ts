import { Component, OnInit } from "@angular/core";
import { User, UsersService } from "@shared";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private router: Router,
    private userService: UsersService
  ) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .pipe(
        tap(users => this.users = users)
      ).subscribe();
  }

  showAlbums(username: string, id: number) {
    this.router.navigate([username.toLowerCase(), "albums", id]);
  }

}
