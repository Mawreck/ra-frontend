import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Log, LogResponse } from "./logs.model";

@Injectable({
  providedIn: "root"
})
export class LogsService {

  private readonly BASE_URL = "https://ra-backend.herokuapp.com/api";

  constructor(
    private httpClient: HttpClient
  ) {
  }

  postLog(log: Log): Observable<Log> {
    return this.httpClient.post<Log>(`${ this.BASE_URL }/logs`, log);
  }

  getLogs(): Observable<Log[]> {
    return this.httpClient.get<LogResponse>(`${ this.BASE_URL }/logs`)
      .pipe(
        map(data => data._embedded.logs)
      );
  }

}
