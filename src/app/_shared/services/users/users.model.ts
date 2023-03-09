import { Paged } from "../../utils/utils.models";

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface UserResponse {
  page: Paged;
  _embedded: {
    users: User[];
  };
}
