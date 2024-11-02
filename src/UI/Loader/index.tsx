import { useAppSelector } from "../../redux/store";
import classes from "./Loader.module.scss";

export default function Loader() {
  const { theme } = useAppSelector((state) => state.SwitchTheme);
  return (
    <div className={`${classes.bg_loader} ${classes[theme]}`}>
      <div className={classes.loader}></div>
    </div>
  );
}
