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
  const { theme } = useAppSelector((state) => state.SwitchTheme);

  useEffect(() => {
    console.log("render");

    dispatch(fetchPosts());
  }, []);

  const AddPostClick = async () => {
    if (text.length !== 0) {
      const arrText = {
        text,
      };
      await dispatch(fetchAddPost(arrText));
      setText("");
    } else {
      alert("пост не может быть пустым");
    }
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
              background: theme === "dark" ? "#202020 " : "white",
              color: theme === "dark" ? "white" : "black",
              borderRadius: "15px",
              boxShadow: "0px 1px 3px rgba(15, 15, 15, 0.418)",
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
        return <PostItem key={item.id} item={item} />;
      })}
    </div>
  );
}
