import { SmallPersonDetailModel } from "../person.interface";

export interface UserInfoModel {
    id: string;
    userName: string;
    email: string;
    phoneNummber: string;
    person:SmallPersonDetailModel;
  }
