import Buttons from "../../components/Buttons";
import "../../App.css";
import ProfileBlock from "../../components/ProfileBlock";
import { useEffect, useState } from "react";
import axios from "../../axios.ts";
import { useParams } from "react-router-dom";
import classes from "./PageProfile.module.scss";
import { TUser } from "../../types/TypesAuth.ts";
export default function PageProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({} as TUser);
  useEffect(() => {
    axios
      .get(`/api/user/getuser/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => alert("ошикбка в получении информации о пользователе"));
  }, []);
  return (
    <div className="container">
      <div className={classes.page_profile}>
        <Buttons />
        <ProfileBlock user={user} />
      </div>
    </div>
  );
}
