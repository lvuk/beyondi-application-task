export interface IRegisterUser {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
