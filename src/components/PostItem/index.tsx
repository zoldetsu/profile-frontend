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
  const { theme } = useAppSelector((state) => state.SwitchTheme);
  const { data: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const date = new Date(item.createdAt);
  const formattedDate = date.toLocaleString();
  //* проверка для удаления комментария авторизованным пользователем
  const isVerif = currentUser && item.userId === currentUser.id;
  /* 
  ? like - поставлен лайк или нет
  ? countLike - количество лайков у поста
  ? deleteClickPost - функция удаления поста понажитии иконки
  ? clickLike - в зависимости от like убирает или ставит лайк
  ? item - информация о посте
  ? currentUser - информация об авторизованном пользователя
  */
  const { like, countLike, deleteClickPost, clickLike } = useLikes(
    item,
    currentUser
  );
  return (
    <div className={`${classes.post_box}  ${classes[theme]}`}>
      {isVerif && (
        <IconButton className={classes.delete} onClick={deleteClickPost}>
          <Delete sx={{ color: theme === "light" ? grey[900] : grey[100] }} />
        </IconButton>
      )}
      <div className={classes.owner_block}>
        <Link to={`/users/${item.user.id}`}>
          <img
            src={`http://localhost:4000${item.user.avatarUrl}`}
            alt="Photo"
          />
        </Link>

        <div className={classes.info_block}>
          <div className={classes.name}>{item.user.fullName}</div>
          <div className={classes.data}> {formattedDate}</div>
        </div>
      </div>
      <div className={classes.text}>{item.text}</div>
      <div className={classes.activity_block}>
        <div className={classes.activity_box}>
          <div className={classes.count_like}>{countLike}</div>
          <div onClick={clickLike}>
            <FavoriteIcon
              sx={{
                color: like
                  ? red[500]
                  : theme === "light"
                  ? grey[900]
                  : grey[100],
                width: 20,
              }}
            />
          </div>
        </div>
        <div className={classes.activity_box}>
          <div className={classes.count_comment}>
            {item.createdComment.length}
          </div>
          <Link to={`/posts/${item.id}`}>
            <Comment
              sx={{
                width: 20,
                color: theme === "light" ? grey[900] : grey[100],
              }}
              color="inherit"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
