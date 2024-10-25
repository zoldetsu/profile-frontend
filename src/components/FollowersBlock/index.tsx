import { useEffect } from "react";
import FollowItem from "../FollowItem/index.tsx";
import classes from "./FollowersBlock.module.scss";
import { TFollows } from "../../types/TypesFolower.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { fetchGetFollowers } from "../../redux/slices/Follow.ts";
import Loader from "../../UI/Loader/index.tsx";
export default function FollowersBlock() {
  const { items, status } = useAppSelector(
    (state) => state.follow.allFollowers
  );
  const { data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      dispatch(fetchGetFollowers(data.id));
    }
  }, [data]);

  return (
    <div className={classes.followers_block}>
      {status === "loading" ? (
        <Loader />
      ) : items?.length === 0 ? (
        <h1>Подписчиков нет</h1>
      ) : (
        items &&
        items.map((following: TFollows) => (
          <FollowItem following={following.followerId} />
        ))
      )}
    </div>
  );
}
