export type TPost = {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
  likes: [];
  createdComment: [];
  user: TUser;
  likedByUser: boolean;
};

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
};

export type TText = {
  text: string;
};
