import Buttons from "../../components/Buttons";
import "../../App.css";
import classes from "./PageFollowing.module.scss";
import FollowingBlock from "../../components/FollowingBlock/index.tsx";
export default function PageFollowing() {
  return (
    <div className="container">
      <div className={classes.page_following}>
        <Buttons />
        <FollowingBlock />
      </div>
    </div>
  );
}
