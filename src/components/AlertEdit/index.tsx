import { Button, FilledInput, Input, TextField } from "@mui/material";
import classes from "./AlertEdit.module.scss";
import { Close, ExitToApp } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "../../axios.ts";
import { useNavigate, useParams } from "react-router-dom";
import { TUser } from "../../types/TypesAuth.ts";
interface IAlert {
  onClick: (arg: boolean) => void;
  user: TUser;
}

export default function AlertEdit({ onClick, user }: IAlert) {
  const { id } = useParams();
  const navigate = useNavigate();
  //* --------------------------------------------------------------------
  //* принимают начальное состояние о пользователе
  const [fullName, setFullName] = useState(user.fullName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [description, setDescription] = useState(user.description);
  const [location, setLocation] = useState(user.location);
  //* --------------------------------------------------------------------
  const inputFileRef = useRef(null);

  //* эта функция принмает в качестве колбэка другую функцию и передает булевое значение
  //* выход из редактирования
  const onClickExit = () => {
    onClick(false);
  };
  //* --------------------------------------------------------------------
  /*
   * Стрелочная функция выполняется после выбора фотографии
   * и отправляет пост запрос с информацией о фотографии
   */
  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file) {
        formData.append("image", file);
        const { data } = await axios.post("/api/user/upload", formData);

        setAvatarUrl(data.url);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //* --------------------------------------------------------------------
  /*
   * при нажатии создает объект с инфой об пользователе и отправляет на сервер
   */
  const onSubmit = async () => {
    try {
      const fields = {
        fullName,
        description,
        location,
        avatarUrl,
      };
      axios.put(`/api/user/update/${id}`, fields).then((res) => {
        navigate(`/users/${id}`);
      });
    } catch (err) {
      console.error(err);
    }
  };
  //* --------------------------------------------------------------------
  return (
    <div>
      <div onClick={onClickExit} className={classes.out_block}></div>
      <div className={classes.edit_block}>
        <Close className={classes.close} onClick={onClickExit} />
        <div>изменение профиля</div>
        <TextField
          className={classes.text_field}
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
          id="standard-textarea"
          label="имя"
          variant="filled"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input type="file" ref={inputFileRef} onChange={handleChangeFile} />
        <TextField
          className={classes.text_field}
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
          id="standard-textarea"
          label="Дата Рождения"
          variant="filled"
          value="20.20.2000"
        />
        <TextField
          className={classes.text_field}
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
          id="standard-textarea"
          label="обо мне"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className={classes.text_field}
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
          id="standard-textarea"
          label="Местоположение"
          variant="filled"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button onClick={onSubmit}>Обновить профиль</Button>
      </div>
    </div>
  );
}
