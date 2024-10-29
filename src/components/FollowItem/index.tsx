import { useEffect, useState } from "react";
import { TFollows } from "../../types/TypesFolower";
import classes from "./FollowItem.module.scss";
import axios from "../../axios";
import { TUser } from "../../types/TypesAuth";
import { Link } from "react-router-dom";
import Skeleton from "./skeleton";
import { useAppSelector } from "../../redux/store";

interface IFollowing {
  following: string;
}

export default function FollowItem({ following }: IFollowing) {
  const { theme } = useAppSelector((state) => state.SwitchTheme);
  const [user, setUser] = useState<TUser>();
  useEffect(() => {
    axios
      .get(`/api/user/getuser/${following}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => alert("ошикбка в получении информации о пользователе"));
  }, []);

  return (
    <>
      {!user ? (
        <Skeleton />
      ) : (
        <div className={`${classes.block} ${classes[theme]}`}>
          <div className={classes.img_block}>
            <Link to={`/users/${following}`}>
              <img
                src={user && `http://localhost:4000${user.avatarUrl}`}
                alt=""
              />
            </Link>
          </div>

          <div className={classes.text}>{user?.fullName}</div>
          <div className={classes.email}>{user?.email}</div>
        </div>
      )}
    </>
  );
}
