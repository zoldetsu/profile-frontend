import { Button, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./Login.module.scss";

import { useAppDispatch } from "../../../redux/store";
import { fetchLogin } from "../../../redux/slices/Auth";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../types/TypesAuth";

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
      navigate("/home");
    }
  };
  //* --------------------------------------------------------------------
  return (
    <div className={classes.register_block}>
      <TextField
        slotProps={{
          inputLabel: {
            style: { color: "white" },
          },
          input: {
            style: {
              border: "1px solid white",
            },
          },
        }}
        className={classes.text_field}
        id="standard-textarea"
        label="Email"
        variant="filled"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        slotProps={{
          inputLabel: {
            style: {
              color: "white",
            },
          },
          input: {
            style: {
              border: "1px solid white",
            },
          },
        }}
        className={classes.text_field}
        id="standard-textarea"
        label="Password"
        variant="filled"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
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
