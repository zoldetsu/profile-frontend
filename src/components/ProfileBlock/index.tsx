import { useEffect, useState } from "react";
import axios from "../../axios.ts";
import { Button } from "@mui/material";
import classes from "./ProfileBlock.module.scss";
import { Edit } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import AlertEdit from "../AlertEdit";
import { useAppSelector } from "../../redux/store.ts";
import { TUser } from "../../types/TypesAuth.ts";
interface returnType {
  user: TUser;
}

export default function ProfileBlock({ user }: returnType) {
  const { data } = useAppSelector((state) => state.auth);

  //* Состояние доступа к изменению профиля
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //* Cостояние отписки или подписки, true - отписаться, false - подписаться
  const [following, setFollowing] = useState<boolean>(false);

  //* true - если мы попали на страницу авторизованного пользователя,
  //* false - если на какую либо другую, на которую можно подписаться
  const isVerifEdit = user.id === data?.id;

  useEffect(() => {
    if (data && user) {
      /*
       * с помошью метода some проверяем на условие есть ли в массиве подписок
       * авторизованного пользователя подписка, у которой followingId совпадает
       * с пользователем, на странице которого мы находимся.
       * false - совпадений нет, а значит подписаться можно
       * true - можно отписаться
       */
      const isFollowing =
        Array.isArray(data.following) &&
        data.following.some((follow) => follow.followingId === user.id);

      setFollowing(isFollowing || false);
    }
  }, [data, user]);

  const followClick = async () => {
    if (following) {
      /*
       * Поиск id подписки, которую грубо говоря хотим убрать
       */
      const FollowId = user.followers.find(
        (follow) => follow.followerId === data?.id
      );

      if (FollowId) {
        await axios.delete(`/api/follow/unsubscribe/${FollowId.id}`);
      }

      setFollowing(false);
    } else {
      await axios.post(`/api/follow/subscribe/${user.id}`);
      setFollowing(true);
    }
  };
  const onClickEdit = () => {
    setIsEditing((ed) => !ed);
  };
  return (
    <>
      {isEditing && <AlertEdit onClick={onClickEdit} user={user} />}

      <div className={classes.profile_block}>
        <div className={classes.one_block}>
          <div className={classes.img_block}>
            <img
              //* полный url http://localhost:4000/uploads/name.jpg
              src={user.avatarUrl && `http://localhost:4000${user.avatarUrl}`}
              alt=""
            />
          </div>
          <div className={classes.fullName}>{user.fullName}</div>

          {isVerifEdit ? (
            <Button
              onClick={onClickEdit}
              className={classes.button}
              size="small"
              variant="contained"
              endIcon={<Edit />}
              sx={{ background: grey[700], borderRadius: 2 }}
            >
              Редактировать
            </Button>
          ) : (
            <Button
              onClick={followClick}
              className={classes.button}
              size="small"
              variant="contained"
              sx={{ background: grey[700], borderRadius: 2 }}
            >
              {following ? "Отписаться" : "подписаться "}
            </Button>
          )}
        </div>
        <div className={classes.second_block}>
          {user.email && (
            <h3 className={classes.point}>
              Почта <span>{user.email}</span>
            </h3>
          )}
          {user.createdAt && (
            <h3 className={classes.point}>
              Дата регистрации <span>{user.createdAt}</span>
            </h3>
          )}
          {user.location && (
            <h3 className={classes.point}>
              Местонахождение <span>{user.location}</span>
            </h3>
          )}
          {user.description && (
            <h3 className={classes.point}>
              Обо мне <span>{user.description}</span>
            </h3>
          )}

          <div className={classes.folower_block}>
            <div className={classes.item}>
              <div className={classes.count}>{user.followers?.length}</div>
              <div className={classes.item_text}>подписчики</div>
            </div>
            <div className={classes.item}>
              <div className={classes.count}>{user.following?.length}</div>
              <div className={classes.item_text}>подписки</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
