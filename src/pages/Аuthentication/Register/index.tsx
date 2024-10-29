import { Button, TextField } from "@mui/material";
import classes from "./Register.module.scss";
import { useAppDispatch } from "../../../redux/store";
import { useState } from "react";
import { fetchRegister } from "../../../redux/slices/Auth";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../types/TypesAuth";
import TextFieldUI from "../../../UI/TextFieldUI";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //* --------------------------------------------------------------------
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //* --------------------------------------------------------------------

  const SendClick = async () => {
    const values = {
      fullName,
      email,
      password,
    };
    //* Возвращает информацию о пользоавателе после регистрации
    const data = (await dispatch(fetchRegister(values))) as { payload: TUser };

    if (!data.payload) {
      return alert("не удалось зарегистрироваться");
    }
    //* берем токен и записываем в localStorage
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }
  };

  return (
    <div className={classes.register_block}>
      <TextFieldUI
        id={"standard-textarea"}
        label={"Имя"}
        variant="filled"
        value={fullName}
        onChange={setFullName}
      />
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
        disabled={(fullName && password && email) === ""}
        className={classes.button}
        onClick={SendClick}
        variant="contained"
        sx={{
          ":disabled": {
            color: "white",
          },
        }}
      >
        Зарегистрироваться
      </Button>
    </div>
  );
}
