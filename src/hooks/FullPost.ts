import { useEffect, useState } from "react";
import { TPost } from "../types/TypesPost";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import axios from "../axios";
import { fetchGetComments } from "../redux/slices/Comments";
import { TComment } from "../types/TypesComment";

interface ReturnType {
  isVerif: boolean | null;
  formattedDate: string;
  dataPost: TPost | null;
  items: TComment[];
}

export function useGetFullPost(id: string | undefined): ReturnType {
  const dispatch = useAppDispatch();
  const [dataPost, setDataPost] = useState<TPost | null>(null);
  const { data } = useAppSelector((state: RootState) => state.auth);
  const { items } = useAppSelector(
    (state: RootState) => state.comment.allComment
  );

  useEffect(() => {
    axios
      .get<TPost>(`/api/post/getone/${id}`)
      .then((res) => {
        setDataPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn("rere", err);
        alert("ошибка при получении статьи");
      });
    if (id) {
      dispatch(fetchGetComments(id));
    }
  }, [id]);

  const isVerif = dataPost && data && dataPost.userId === data.id;

  const formattedDate = dataPost
    ? new Date(dataPost.createdAt).toLocaleString()
    : "";

  return {
    isVerif: isVerif || null,
    formattedDate,
    dataPost,
    items,
  };
}
