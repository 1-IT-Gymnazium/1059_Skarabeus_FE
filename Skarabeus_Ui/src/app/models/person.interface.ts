export interface PersonCreateModel {
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: string; // ISO 8601 date format
  active: boolean;
  email?: string | null;
  emailOfMother?: string | null;
  emailOfFather?: string | null;
  phoneNumberOfMother?: string | null;
  phoneNumberOfFather?: string | null;
  phoneNumber?: string | null;
  fullNameOfMother?: string | null;
  fullNameOfFather?: string | null;
  status: PersonStatus;
}

export interface SmallPersonDetailModel {
  id: string; // UUID as a string
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth?: string | null; // ISO 8601 format
  age?:number|null;
  email?: string | null;
  phoneNumber?: string | null;
  active: boolean;
  deleted: boolean;
}

export interface PersonDetailModel extends SmallPersonDetailModel {
  emailOfMother?: string | null;
  emailOfFather?: string | null;
  phoneNumberOfMother?: string | null;
  phoneNumberOfFather?: string | null;
  fullNameOfMother?: string | null;
  fullNameOfFather?: string | null;
  status: PersonStatus;
}

export enum PersonStatus {
  Other = 'other',
  Child = 'child',
  Instruktor = 'instruktor',
  Leader = 'leader',
}
