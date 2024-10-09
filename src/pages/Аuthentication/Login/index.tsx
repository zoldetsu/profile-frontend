import { Button, TextField } from "@mui/material";
import { useState } from "react";
import classes from "./Login.module.scss";

import { useAppDispatch } from "../../../redux/store";
import { fetchLogin } from "../../../redux/slices/Auth";
import { TUser } from "../../../types/TypesPost";

export default function Login() {
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const SendClick = async () => {
    const values = {
      email,
      password,
    };
    const data = (await dispatch(fetchLogin(values))) as { payload: TUser };
    console.log(data);
    if (!data.payload) {
      return alert("не удалось войти");
    }
    if (data.payload) {
      // * нужно поработать с типизацией
      window.localStorage.setItem("token", data.payload.token);
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
