import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import Posts from "../../components/Posts";
import "../../App.css";
import classes from "./Home.module.scss";
import Buttons from "../../components/Buttons";
import Profile from "../../components/Profile";
import { useEffect } from "react";

export default function Home() {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="container">
      <div className={classes.home_box}>
        <Buttons />

        <Posts />
        <Profile />
      </div>
    </div>
  );
}
