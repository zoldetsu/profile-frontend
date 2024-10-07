import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/Auth";
import { Navigate } from "react-router-dom";
import Posts from "../../components/Posts";
import "../../App.css";
import classes from "./Home.module.scss";
import Buttons from "../../components/Buttons";
import Profile from "../../components/Profile";

export default function Home() {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={"/auth"} />;
  }

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
