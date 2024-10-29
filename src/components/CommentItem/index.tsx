import { IconButton } from "@mui/material";
import classes from "./CommentItem.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
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
  const { theme } = useAppSelector((state) => state.SwitchTheme);
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
      <div className={`${classes.block}  ${classes[theme]}`}>
        {isVerif && (
          <IconButton className={classes.delete} onClick={deleteClick}>
            <Delete
              style={{}}
              sx={{
                color: theme === "light" ? grey[900] : grey[100],
              }}
            />
          </IconButton>
        )}

        <div className={classes.owner_block}>
          <img
            src={`http://localhost:4000${comment.user.avatarUrl}`}
            alt="Photo"
          />
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
