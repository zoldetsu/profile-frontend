import { useEffect } from "react";
import FollowItem from "../FollowItem";
import classes from "./FollowingBlock.module.scss";
import { TFollows } from "../../types/TypesFolower.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { fetchGetFollowing } from "../../redux/slices/Follow.ts";
import Loader from "../../UI/Loader/index.tsx";
export default function FollowingBlock() {
  const { items, status } = useAppSelector(
    (state) => state.follow.allFollowing
  );
  const { data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(fetchGetFollowing(data.id));
    }
  }, [data]);

  return (
    <div className={classes.following_block}>
      {status === "loading" ? (
        <Loader />
      ) : items?.length === 0 ? (
        <h1>Подписок нет</h1>
      ) : (
        items &&
        items.map((following: TFollows) => (
          <FollowItem following={following.followingId} />
        ))
      )}
    </div>
  );
}
