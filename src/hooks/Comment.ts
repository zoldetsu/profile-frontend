import { RootState, useAppSelector } from "../redux/store";

import { TComment } from "../types/TypesComment";

interface ReturnType {
  isVerif: boolean | null;
  formattedDate: string;
}

export function useGetComment(comment: TComment): ReturnType {
  const { data } = useAppSelector((state: RootState) => state.auth);

  const isVerif = data && comment.userId === data.id;

  const formattedDate = comment
    ? new Date(comment.createdAt).toLocaleString()
    : "";

  return {
    isVerif: isVerif || null,
    formattedDate,
  };
}
