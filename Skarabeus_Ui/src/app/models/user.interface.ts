import { PersonDetailModel } from "./person.interface";

export interface UserDetail {
  id: string;
  userName: string;
  email: string;
  person: PersonDetailModel; // Reference the Person interface here
  phoneNumber: string | null; // It could be null, so we allow null as a possible type
}

export interface UserCreate {
  name:string;
  email:string;
  personId:string;
  password:string;
}