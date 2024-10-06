import { useState } from "react";
import classes from "./PostItem.module.scss";
import { Comment, FavoriteBorder } from "@mui/icons-material";
import { IItem } from "../Posts";

interface PostItemProps {
  item: IItem; // Используем интерфейс IItem
}

interface Idata {
  fullName: string;
  avatarUrl: string;
}

export default function PostItem({ item }: PostItemProps) {
  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleString();

  return (
    <div className={classes.post_block}>
      <div className={classes.owner_block}>
        <img src="/assets/settings.jpg" alt="Photo" />
        <div className={classes.info_block}>
          <div className={classes.name}>{item.user.fullName || ""}</div>
          <div className={classes.data}> {formattedDate}</div>
        </div>
      </div>
      <div className={classes.text}>{item.text}</div>
      <div className={classes.activity_block}>
        <FavoriteBorder />
        <Comment />
      </div>
    </div>
  );
}
