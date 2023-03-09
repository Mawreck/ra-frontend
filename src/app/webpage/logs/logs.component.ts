import { Component, OnInit } from "@angular/core";
import { Log, LogsService } from "@shared";
import { tap } from "rxjs";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.scss"]
})
export class LogsComponent implements OnInit {

  logs: Log[];

  constructor(
    private logsService: LogsService
  ) {
  }

  ngOnInit() {
    this.logsService.getLogs().pipe(
      tap(logs => this.logs = logs)
    ).subscribe();
  }

}
