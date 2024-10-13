import { useEffect, useState } from "react";
import { TPost, TUser } from "../types/TypesPost";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import axios from "../axios";
import { fetchGetComments } from "../redux/slices/Comments";
import { TComment } from "../types/TypesComment";

interface ReturnType {
  isVerif: boolean | null;
  formattedDate: string;
  dataPost: TPost | null;
  itemsComments: TComment[];
  dataUser: TUser | null;
}

export function useGetFullPost(id: string | undefined): ReturnType {
  const dispatch = useAppDispatch();
  const [dataPost, setDataPost] = useState<TPost | null>(null);
  const { data: dataUser } = useAppSelector((state: RootState) => state.auth);
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
        alert("ошибка при получении статьи");
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
  };
}
