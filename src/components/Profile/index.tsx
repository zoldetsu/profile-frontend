import { RootState, useAppSelector } from "../../redux/store";
import classes from "./Profile.module.scss";

export default function Profile() {
  const { data } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className={classes.profile_block}>
      <div className={classes.img_block}>
        <img src="/assets/settings.jpg" alt="" />
      </div>

      <h1>{data && data.fullName}</h1>
    </div>
  );
}
