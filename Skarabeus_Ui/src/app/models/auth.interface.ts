export interface LoginModel {
  email: string;
  password: string;
}

export interface TokenModel{
  email:string;
  token:string;
}

export interface PasswordResetModel extends TokenModel{
  password:string;
}