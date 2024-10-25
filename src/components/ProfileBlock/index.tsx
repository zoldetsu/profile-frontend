import { useCallback, useMemo, useState } from "react";
import { Button } from "@mui/material";
import classes from "./ProfileBlock.module.scss";
import { Edit } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import AlertEdit from "../AlertEdit";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { TUser } from "../../types/TypesAuth.ts";
import {
  fetchAddFollow,
  fetchDeleteFollow,
} from "../../redux/slices/Follow.ts";
interface returnType {
  user: TUser;
}

export default function ProfileBlock({ user }: returnType) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data } = useAppSelector((state) => state.auth);
  //* --------------------------------------------------------------------

  // ? массив объектов подписок, где follwerId совпадает с id открытого
  // ? пользователя и отображает его подписки на пользователей
  const { items: allFollowing } = useAppSelector(
    (state) => state.follow.allFollowing
  );
  // ? массив объектов подписок, где follwerId совпадает с id авторизованного
  // ? пользователя и отображает его подписчиков
  const { items: allFollowers } = useAppSelector(
    (state) => state.follow.allFollowers
  );

  //* --------------------------------------------------------------------
  //* true - если мы попали на страницу авторизованного пользователя,
  //* false - если на какую либо другую, на которую можно подписаться
  const isVerifEdit = user.id === data?.id;
  //* --------------------------------------------------------------------
  /*
  TODO Значение этой переменной меняется в зависимости от получения
  TODO массива с подписчиками пользователя и данными авторизованного 
  TODO пользователя

  ? Если метод some возвращает true, значит авторизованный пользователь
  ? подписан на данного пользователя и есть возможность отписаться.
  ? Если false, то подписки нет.
   */
  const isArr = useMemo(() => {
    return (
      Array.isArray(allFollowers) &&
      allFollowers.some((follow) => follow.followerId === data?.id)
    );
  }, [allFollowers, data]);
  //* --------------------------------------------------------------------
  const followClick = useCallback(async () => {
    if (isArr) {
      // * Поиск id подписки, которую грубо говоря хотим убрать
      const FollowId = allFollowers.find(
        /* 
        ? в подписчиках открытого пользователя ищем подписку,
        ? followerId которого совпадает с id авторизованного пользователя
        */
        (follow) => follow.followerId === data?.id
      );
      // ? делаем запрос на удаление
      if (FollowId) {
        await dispatch(fetchDeleteFollow(FollowId.id));
      }
    } else {
      await dispatch(fetchAddFollow(user.id));
    }
  }, [isArr, allFollowers, dispatch, user.id, data]);
  //* --------------------------------------------------------------------
  const onClickEdit = () => {
    setIsEditing((ed) => !ed);
  };
  //* --------------------------------------------------------------------
  return (
    <>
      {isEditing && <AlertEdit onClick={onClickEdit} user={user} />}

      <div className={classes.profile_block}>
        <div className={classes.one_block}>
          <div className={classes.img_block}>
            <img
              //* полный url http://localhost:4000/uploads/name.jpg
              src={user.avatarUrl && `http://localhost:4000${user.avatarUrl}`}
              alt={user.fullName}
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
              {isArr ? "Отписаться" : "подписаться "}
            </Button>
          )}
        </div>
        <div className={classes.second_block}>
          {user.email && (
            <h3 className={classes.point}>
              Почта: <span>{user.email}</span>
            </h3>
          )}
          {user.createdAt && (
            <h3 className={classes.point}>
              Дата регистрации: <span>{user.createdAt}</span>
            </h3>
          )}
          {user.location && (
            <h3 className={classes.point}>
              Местонахождение: <span>{user.location}</span>
            </h3>
          )}
          {user.description && (
            <h3 className={classes.point}>
              Обо мне: <span>{user.description}</span>
            </h3>
          )}

          <div className={classes.folower_block}>
            <div className={classes.item}>
              <div className={classes.count}>{allFollowers.length}</div>
              <div className={classes.item_text}>подписчики</div>
            </div>
            <div className={classes.item}>
              <div className={classes.count}>{allFollowing.length}</div>
              <div className={classes.item_text}>подписки</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
