import { TUser } from "./TypesAuth";
import { TComment } from "./TypesComment";
import { TLike } from "./TypesLike";

export type TPost = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
  likes: TLike[];
  createdComment: TComment[];
  user: TUser;
  likedByUser: boolean;
};

export type TText = {
  text: string;
};
