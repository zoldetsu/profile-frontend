import { Delete, FavoriteBorder, Comment } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import classes from "./FullPost.module.scss";
import { useGetFullPost } from "../../hooks/FullPost";
import { useParams } from "react-router-dom";
import { fetchDeletePost } from "../../redux/slices/Posts";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { fetchAddComment } from "../../redux/slices/Comments";
import CommentItem from "../CommentItem";
import { TComment } from "../../types/TypesComment";
export default function FullPost() {
  const { id } = useParams();
  const { isVerif, formattedDate, dataPost, items } = useGetFullPost(id);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const deleteClick = async () => {
    if (dataPost) {
      dispatch(fetchDeletePost(dataPost.id));
    }
  };
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
  console.log(dataPost);
  return (
    <div className={classes.post_block}>
      <div className={classes.block}>
        {isVerif && (
          <IconButton className={classes.delete} onClick={deleteClick}>
            <Delete
              style={{}}
              sx={{
                color: grey[50],
              }}
            />
          </IconButton>
        )}
        <div className={classes.owner_block}>
          <img src="/assets/settings.jpg" alt="Photo" />
          <div className={classes.info_block}>
            <div className={classes.name}>{dataPost.user.fullName}</div>
            <div className={classes.data}> {formattedDate}</div>
          </div>
        </div>
        <div className={classes.text}>{dataPost.text}</div>
        <div className={classes.activity_block}>
          <FavoriteBorder />
          <Comment />
        </div>
      </div>
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

      {items.map((comment: TComment) => {
        return <CommentItem comment={comment} />;
      })}
    </div>
  );
}
