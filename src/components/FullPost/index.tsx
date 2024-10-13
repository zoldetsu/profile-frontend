import { Button, TextField } from "@mui/material";
import classes from "./FullPost.module.scss";
import { useGetFullPost } from "../../hooks/FullPost";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { useState } from "react";
import { fetchAddComment } from "../../redux/slices/Comments";
import CommentItem from "../CommentItem";
import { TComment } from "../../types/TypesComment";

import PostItem from "../PostItem";

export default function FullPost() {
  const { id } = useParams();
  const { dataPost, itemsComments } = useGetFullPost(id);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  if (!dataPost) {
    return <div>Loading...</div>;
  }
  const addCommentClick = async () => {
    const postId = dataPost.id;
    const commentInfo = {
      postId,
      text,
    };
    dispatch(fetchAddComment(commentInfo));
  };
  return (
    <div className={classes.post_block}>
      <PostItem item={dataPost} />
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
              marginTop: "15px",
            },
          },
        }}
        id="standard-textarea"
        placeholder="О чем думаете?"
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
