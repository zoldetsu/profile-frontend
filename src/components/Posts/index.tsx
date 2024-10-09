import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./Posts.module.scss";
import "../../App.css";
import PostItem from "../PostItem";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

import { fetchAddPost, fetchPosts } from "../../redux/slices/Posts";
import { TPost } from "../../types/TypesPost";

export default function Posts() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const { items } = useAppSelector((state: RootState) => state.posts.allPosts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const AddPostClick = async () => {
    const arrText = {
      text,
    };
    await dispatch(fetchAddPost(arrText));

    setText("");
  };

  return (
    <div className={classes.posts_box}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        slotProps={{
          input: {
            style: {
              marginBottom: "10px",
              background: "#202020 ",
              color: "white",
              borderRadius: "15px",
            },
          },
        }}
        id="standard-textarea"
        placeholder="О чем думаете?"
        multiline
        variant="outlined"
        rows={2}
        fullWidth
      ></TextField>
      <Button
        onClick={AddPostClick}
        className={classes.button}
        variant="outlined"
      >
        Добавить пост
      </Button>
      {items.map((item: TPost) => {
        return <PostItem item={item} />;
      })}
    </div>
  );
}
