import { useEffect, useState } from "react";
import { TPost } from "../types/TypesPost";
import { RootState, useAppSelector } from "../redux/store";
import axios from "../axios";

interface ReturnType {
  isVerif: boolean | null;
  formattedDate: string;
  dataUser: TPost | null;
}

export function useGetFullPost(id: string | undefined): ReturnType {
  const [dataUser, setDataUser] = useState<TPost | null>(null);
  const { data } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    axios
      .get<TPost>(`/api/post/getone/${id}`)
      .then((res) => {
        setDataUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn("rere", err);
        alert("ошибка при получении статьи");
      });
  }, [id]);

  const isVerif = dataUser && data && dataUser.userId === data.id;

  const formattedDate = dataUser
    ? new Date(dataUser.createdAt).toLocaleString()
    : "";

  return {
    isVerif: isVerif || null,
    formattedDate,
    dataUser,
  };
}
