import classes from "./PostItem.module.scss";
import { Comment, Delete, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchDeletePost } from "../../redux/slices/Posts";
import { TPost } from "../../types/TypesPost";
import { Link } from "react-router-dom";

interface PostItemProps {
  item: TPost;
}

export default function PostItem({ item }: PostItemProps) {
  const dispatch = useAppDispatch();

  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleString();
  const { data } = useAppSelector((state: RootState) => state.auth);

  const isVerif = data && item.userId === data.id;
  console.log(data);
  const deleteClick = async () => {
    dispatch(fetchDeletePost(item.id));
  };

  return (
    <div className={classes.post_block}>
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
          <div className={classes.name}>{item.user.fullName}</div>
          <div className={classes.data}> {formattedDate}</div>
        </div>
      </div>
      <div className={classes.text}>{item.text}</div>
      <div className={classes.activity_block}>
        <FavoriteBorder />
        <Link to={`/posts/${item.id}`}>
          <Comment />
        </Link>
      </div>
    </div>
  );
}
