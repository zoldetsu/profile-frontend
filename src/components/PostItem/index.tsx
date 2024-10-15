import classes from "./PostItem.module.scss";
import { Comment, Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { RootState, useAppSelector } from "../../redux/store";

import { TPost } from "../../types/TypesPost";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLikes } from "../../hooks/useLikes";

interface PostItemProps {
  item: TPost;
  countComment?: number;
}

export default function PostItem({ item }: PostItemProps) {
  const { data: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleString();
  const isVerif = currentUser && item.userId === currentUser.id;
  const { like, countLike, deleteClickPost, clickLike } = useLikes(
    item,
    currentUser
  );
  return (
    <div className={classes.post_box}>
      {isVerif && (
        <IconButton className={classes.delete} onClick={deleteClickPost}>
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
          <div className={classes.name}>{item.user.fullName}</div>
          <div className={classes.data}> {formattedDate}</div>
        </div>
      </div>
      <div className={classes.text}>{item.text}</div>
      <div className={classes.activity_block}>
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <div
            style={{
              marginRight: "5px",
              fontFamily: "monospace",
              fontSize: "20px",
            }}
          >
            {countLike}
          </div>
          <div onClick={clickLike}>
            <FavoriteIcon
              sx={{
                color: like ? red[500] : grey[100],
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <div
            style={{
              marginRight: "5px",
              fontFamily: "monospace",
              fontSize: "20px",
            }}
          >
            {item.createdComment.length}
          </div>
          <Link to={`/posts/${item.id}`}>
            <Comment color="inherit" />
          </Link>
        </div>
      </div>
    </div>
  );
}
