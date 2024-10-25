import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import ProfileBlock from "../../components/ProfileBlock";
import Buttons from "../../components/Buttons";
import axios from "../../axios.ts";
import classes from "./PageProfile.module.scss";
import { TUser } from "../../types/TypesAuth.ts";
import { useAppDispatch } from "../../redux/store.ts";
import {
  fetchGetFollowers,
  fetchGetFollowing,
} from "../../redux/slices/Follow.ts";
export default function PageProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({} as TUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      // ? массив объектов подписок, где follwerId совпадает с id открытого
      // ? пользователя и отображает его подписки на пользователей
      dispatch(fetchGetFollowing(id));
      // ? массив объектов подписок, где follwerId совпадает с id авторизованного
      // ? пользователя и отображает его подписчиков
      dispatch(fetchGetFollowers(id));
      axios
        .get(`/api/user/getuser/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => alert("ошибка в получении информации о пользователе"));
    }
  }, [id, dispatch]);
  return (
    <div className="container">
      <div className={classes.page_profile}>
        <Buttons />
        <ProfileBlock user={user} />
      </div>
    </div>
  );
}
