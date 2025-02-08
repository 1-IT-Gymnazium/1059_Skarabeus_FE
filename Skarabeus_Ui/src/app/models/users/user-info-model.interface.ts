import { PersonDetailModel } from "./person-detail-model.interface";

export interface UserInfoModel {
    id: string;
    userName: string;
    email: string;
    phoneNummber: string;
    person:PersonDetailModel;
  }
  