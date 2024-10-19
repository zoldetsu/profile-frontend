import { TUser } from "./TypesAuth";

export type TComment = {
  id: string;
  createdAt: string;
  text: string;
  postId: string;
  userId: string;
  user: TUser;
};

export type TAddComment = {
  postId: string;
  text: string;
};
