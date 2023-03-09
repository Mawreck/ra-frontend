import { Paged } from "../../utils/utils.models";

export type LogType = "ALBUMS"
  | "PHOTOS";

export type ActionType = "ADD"
  | "DELETE";

export interface Log {
  username: string;
  logType: LogType;
  logTypeId?: number;
  action: ActionType;
  dateCreated?: Date;
}

export interface LogResponse {
  page: Paged,
  _embedded: {
    logs: Log[]
  }
}
