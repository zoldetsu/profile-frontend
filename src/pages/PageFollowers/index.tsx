import Buttons from "../../components/Buttons/index.tsx";
import "../../App.css";
import classes from "./PageFollowing.module.scss";
import FollowersBlock from "../../components/FollowersBlock/index.tsx";
export default function PageFollowing() {
  return (
    <div className="container">
      <div className={classes.page_followers}>
        <Buttons />
        <FollowersBlock />
      </div>
    </div>
  );
}
