import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import classes from "./HomeProfileBlock.module.scss";

export default function HomeProfileBlock() {
  const { data } = useAppSelector((state: RootState) => state.auth);
  const { theme } = useAppSelector((state) => state.SwitchTheme);

  return (
    <div className={`${classes.profile_block} ${classes[theme]}`}>
      <div className={classes.img_block}>
        <img
          src={data?.avatarUrl && `http://localhost:4000${data.avatarUrl}`}
          alt=""
        />
      </div>
      <h1>
        <Link
          className={`${classes.name} ${classes[theme]}`}
          to={`/users/${data && data.id}`}
        >
          {data && data.fullName}
        </Link>
      </h1>
      <div className={`${classes.discription} ${classes[theme]}`}>
        {data && data.description}
      </div>
    </div>
  );
}
