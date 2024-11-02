import { Button, TextField } from "@mui/material";
import classes from "./FullPost.module.scss";
import { useGetFullPost } from "../../hooks/FullPost";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { fetchAddComment } from "../../redux/slices/Comments";
import CommentItem from "../CommentItem";
import { TComment } from "../../types/TypesComment";

import PostItem from "../PostItem";

export default function FullPost() {
  const { theme } = useAppSelector((state) => state.SwitchTheme);
  const { id } = useParams();
  const { dataPost, itemsComments } = useGetFullPost(id);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  if (!dataPost) {
    return <div>Loading...</div>;
  }
  //* --------------------------------------------------------------------
  //* добвление комеентария
  const addCommentClick = async () => {
    const postId = dataPost.id;
    const commentInfo = {
      postId,
      text,
    };
    dispatch(fetchAddComment(commentInfo));
    setText("");
  };
  //* --------------------------------------------------------------------
  return (
    <div className={classes.post_block}>
      <PostItem item={dataPost} />
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        slotProps={{
          input: {
            style: {
              background: theme === "dark" ? "#202020 " : "white",
              color: theme === "dark" ? "white" : "black",
              marginBottom: "10px",
              borderRadius: "15px",
              marginTop: "15px",
              boxShadow: "0px 1px 3px rgba(15, 15, 15, 0.418)",
            },
          },
        }}
        id="standard-textarea"
        placeholder="Добавить комментарий"
        multiline
        fullWidth
        variant="outlined"
        rows={2}
      ></TextField>
      <Button
        onClick={addCommentClick}
        className={classes.button}
        variant="outlined"
      >
        Добавить комментарий
      </Button>

      {itemsComments.map((comment: TComment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
