import Posts from "../../components/Posts";
import "../../App.css";
import classes from "./Home.module.scss";
import Buttons from "../../components/Buttons";
import HomeProfileBlock from "../../components/HomeProfileBlock";

export default function Home() {
  return (
    <div className="container">
      <div className={classes.home_box}>
        <Buttons />
        <Posts />
        <HomeProfileBlock />
      </div>
    </div>
  );
}
