import { Button, TextField } from "@mui/material";
import classes from "./Register.module.scss";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../../redux/store";
import { useState } from "react";
import { fetchRegister } from "../../../redux/slices/Auth";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../../types/TypesAuth";

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
      navigate("/home");
    }
  };

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
        label="Имя"
        variant="filled"
        color="primary"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        sx={{
          borderColor: grey[200],
        }}
      />

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
        value={email}
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
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        disabled={fullName === ""}
        className={classes.button}
        onClick={SendClick}
        variant="contained"
      >
        Зарегистрироваться
      </Button>
    </div>
  );
}
