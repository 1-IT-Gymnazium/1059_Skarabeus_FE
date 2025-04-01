import { DishDetail } from "./dish.interface";
import { PersonDetailModel, SmallPersonDetailModel } from "./person.interface";

export interface EventCreateModel {
  name: string;
  description: string;
  place: string;
  responsiblePersonId: string; // UUID format
  start: string; // ISO 8601 date-time format
  end: string; // ISO 8601 date-time format
}

export interface EventDetailModel {
  id: string; // UUID format
  responsiblePerson: SmallPersonDetailModel | null;
  participants: PersonDetailModel[];
  dishes: DishDetail[];
  name: string;
  description: string;
  place: string;
  start: string; // ISO 8601 date-time format
  end: string; // ISO 8601 date-time format
  rowInGrid?:number|null;
}
