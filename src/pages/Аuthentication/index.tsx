import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import "../../App.css";
import classes from "./Auth.module.scss";
import Register from "./Register";
import Login from "./Login";
export default function Аuthentication() {
  const [buttons, setButtons] = useState("register");
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

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
      {fromPage}
    </div>
  );
}
