import { Button, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./Login.module.scss";

import { useAppDispatch } from "../../../redux/store";
import { fetchLogin } from "../../../redux/slices/Auth";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../types/TypesAuth";
import TextFieldUI from "../../../UI/TextFieldUI";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //* --------------------------------------------------------------------
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //* --------------------------------------------------------------------
  const SendClick = async () => {
    const values = {
      email,
      password,
    };
    //* Возвращает информацию о пользоавателе после входа
    const data = (await dispatch(fetchLogin(values))) as { payload: TUser };
    if (!data.payload) {
      return alert("не удалось войти");
    }
    //* берем токен и записываем в localStorage
    if (data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };
  //* --------------------------------------------------------------------
  return (
    <div className={classes.register_block}>
      <TextFieldUI
        id={"standard-textarea"}
        label={"Email"}
        variant="filled"
        value={email}
        onChange={setEmail}
      />

      <TextFieldUI
        id={"standard-textarea"}
        label={"Password"}
        variant="filled"
        value={password}
        onChange={setPassword}
      />

      <Button
        className={classes.button}
        onClick={SendClick}
        variant="contained"
      >
        Войти
      </Button>
    </div>
  );
}
