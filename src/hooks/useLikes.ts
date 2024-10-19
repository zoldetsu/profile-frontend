import axios from "../axios.js";
import { useState } from "react";
import { fetchDeletePost } from "../redux/slices/Posts";
import { fetchAddLike } from "../redux/slices/Likes";
import { useAppDispatch } from "../redux/store";
import { TPost } from "../types/TypesPost.js";
import { TUser } from "../types/TypesAuth.js";

interface ReturnType {
  like: boolean;
  countLike: number;
  deleteClickPost: () => Promise<void>;
  clickLike: () => Promise<void>;
}

export function useLikes(item: TPost, currentUser: TUser | null): ReturnType {
  const dispatch = useAppDispatch();
  const [like, setLike] = useState<boolean>(item.likedByUser);
  const [countLike, setCountLike] = useState<number>(item.likes.length);

  const deleteClickPost = async () => {
    await dispatch(fetchDeletePost(item.id));
  };

  const clickLike = async () => {
    if (!like) {
      const likeInfo = {
        postId: item.id,
      };
      await dispatch(fetchAddLike(likeInfo));
      setLike(true);
      setCountLike((prevCount) => prevCount + 1);
    } else {
      setLike(false);
      setCountLike((prevCount) => prevCount - 1);
      if (currentUser) {
        const likeId = item.likes.find(
          (like) => like.userId === currentUser.id
        );
        if (likeId) {
          await axios.delete(`/api/likes/unlike/${likeId.id}`);
        }
      }
    }
  };

  return {
    like,
    countLike,
    deleteClickPost,
    clickLike,
  };
}
