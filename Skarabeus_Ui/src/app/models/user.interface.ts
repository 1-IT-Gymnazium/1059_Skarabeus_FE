import { PersonDetailModel } from "./person.interface";

export interface UserDetail {
  deleted:boolean;
  emailConfirmed:boolean;
  role:string;
  id: string;
  userName: string;
  email: string;
  person: PersonDetailModel;
}

export interface UserCreate {
  name:string;
  email:string;
  personId:string;
  password:string;
}

export interface UserPatch {
  userName: string;
  email: string;
}