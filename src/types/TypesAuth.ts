import { TFollows } from "./TypesFolower";

export interface IRegisterParams {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export type TUser = {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  location: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  token: string;
  followers: TFollows[];
  following: TFollows[];
};
