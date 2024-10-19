import { Link } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store";
import classes from "./Profile.module.scss";

export default function Profile() {
  const { data } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className={classes.profile_block}>
      <div className={classes.img_block}>
        <img
          src={data?.avatarUrl && `http://localhost:4000${data.avatarUrl}`}
          alt=""
        />
      </div>
      <h1>
        <Link
          style={{
            fontFamily: "monospace",
            textDecoration: "none",
            color: "white",
          }}
          to={`/users/${data && data.id}`}
        >
          {data && data.fullName}
        </Link>
      </h1>
    </div>
  );
}
