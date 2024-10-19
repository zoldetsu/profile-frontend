import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import axios from "../axios";
import { fetchGetComments } from "../redux/slices/Comments";
import { TComment } from "../types/TypesComment";
import { TPost } from "../types/TypesPost";
import { TUser } from "../types/TypesAuth";

interface ReturnType {
  isVerif: boolean | null;
  formattedDate: string;
  dataPost: TPost | null;
  itemsComments: TComment[];
  dataUser: TUser | null;
  countComment: number;
  setCountComment: React.Dispatch<React.SetStateAction<number>>;
}

export function useGetFullPost(id: string | undefined): ReturnType {
  const dispatch = useAppDispatch();
  const [dataPost, setDataPost] = useState<TPost | null>(null);
  const { data: dataUser } = useAppSelector((state: RootState) => state.auth);
  const [countComment, setCountComment] = useState(
    dataPost?.createdComment.length || 0
  );
  const { items: itemsComments } = useAppSelector(
    (state: RootState) => state.comment.allComment
  );

  useEffect(() => {
    axios
      .get<TPost>(`/api/post/getone/${id}`)
      .then((res) => {
        setDataPost(res.data);
      })
      .catch((err) => {
        alert("ошибка при получении ");
      });
    if (id) {
      dispatch(fetchGetComments(id));
    }
  }, [id]);

  const isVerif = dataPost && dataUser && dataPost.userId === dataUser.id;

  const formattedDate = dataPost
    ? new Date(dataPost.createdAt).toLocaleString()
    : "";

  return {
    isVerif: isVerif || null,
    formattedDate,
    dataPost,
    itemsComments: itemsComments,
    dataUser,
    countComment,
    setCountComment,
  };
}
