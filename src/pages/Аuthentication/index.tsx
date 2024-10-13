import { Button } from "@mui/material";
import "../../App.css";
import classes from "./Auth.module.scss";
import Register from "./Register";

import { useEffect, useState } from "react";
import Login from "./Login";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/Auth";
export default function Аuthentication() {
  const [buttons, setButtons] = useState("register");
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);
  return (
    <div className="container">
      <div className={classes.container_auth}>
        <div className={classes.buttons_block}>
          <Button
            onClick={() => setButtons("login")}
            className={classes.button}
            variant="contained"
          >
            Войти
          </Button>
          <Button
            onClick={() => setButtons("register")}
            className={classes.button}
            variant="contained"
          >
            Регистрация
          </Button>
        </div>
        {buttons === "login" && <Login />}
        {buttons === "register" && <Register />}
      </div>
    </div>
  );
}
