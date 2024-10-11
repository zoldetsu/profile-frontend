import "../../App.css";
import classes from "./PostPage.module.scss";
import Buttons from "../../components/Buttons/index.tsx";
import Profile from "../../components/Profile/index.tsx";
import FullPost from "../../components/FullPost/index.tsx";
export default function PostPage() {
  return (
    <div className="container">
      <div className={classes.home_box}>
        <Buttons />
        <FullPost />
        <Profile />
      </div>
    </div>
  );
}
