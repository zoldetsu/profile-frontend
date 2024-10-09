import "../../App.css";
import classes from "./FullPost.module.scss";
import { Comment, Delete, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../redux/store";
import { fetchDeletePost } from "../../redux/slices/Posts";
import { useParams } from "react-router-dom";
import Buttons from "../../components/Buttons/index.tsx";
import Profile from "../../components/Profile/index.tsx";
import { useGetFullPost } from "../../hooks/FullPost.ts";
export default function FullPost() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { isVerif, formattedDate, dataUser } = useGetFullPost(id);

  const deleteClick = async () => {
    if (dataUser) {
      dispatch(fetchDeletePost(dataUser.id));
    }
  };
  if (!dataUser) {
    return <div>Loading...</div>;
  }

  console.log(dataUser);
  return (
    <div className="container">
      <div className={classes.home_box}>
        <Buttons />
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
              <div className={classes.name}>{dataUser.user.fullName}</div>
              <div className={classes.data}> {formattedDate}</div>
            </div>
          </div>
          <div className={classes.text}>{dataUser.text}</div>
          <div className={classes.activity_block}>
            <FavoriteBorder />
            <Comment />
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
}
