import { IconButton } from "@mui/material";
import classes from "./CommentItem.module.scss";
import { useAppDispatch } from "../../redux/store";
import { useGetComment } from "../../hooks/Comment";
import { Delete } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { TComment } from "../../types/TypesComment";
import { fetchDeleteComment } from "../../redux/slices/Comments";

interface Icomment {
  comment: TComment;
}

export default function CommentItem({ comment }: Icomment) {
  const dispatch = useAppDispatch();
  const { isVerif, formattedDate } = useGetComment(comment);
  const deleteClick = async () => {
    if (comment) {
      dispatch(fetchDeleteComment(comment.id));
    }
  };

  if (!comment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
            <div className={classes.name}>{comment.user.fullName}</div>
            <div className={classes.data}> {formattedDate}</div>
          </div>
        </div>
        <div className={classes.text}>{comment.text}</div>
      </div>
    </div>
  );
}
