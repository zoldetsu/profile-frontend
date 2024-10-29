import { useRef, useState } from "react";
import axios from "../../axios.ts";
import classes from "./AlertEdit.module.scss";
import { Button } from "@mui/material";
import { Close } from "@mui/icons-material";
import { TUser } from "../../types/TypesAuth.ts";
import TextFieldUI from "../../UI/TextFieldUI/index.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store.ts";
interface IAlert {
  onClick: (arg: boolean) => void;
  user: TUser;
}

export default function AlertEdit({ onClick, user }: IAlert) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useAppSelector((state) => state.SwitchTheme);
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
      onClick(false);
    } catch (err) {
      console.error(err);
    }
  };
  //* --------------------------------------------------------------------
  return (
    <div>
      <div onClick={onClickExit} className={classes.out_block}></div>
      <div className={`${classes.edit_block} ${classes[theme]}`}>
        <Close className={classes.close} onClick={onClickExit} />
        <div className={classes.text}>Изменение профиля</div>

        <TextFieldUI
          id={"standard-textarea"}
          label={"имя"}
          variant="filled"
          value={fullName}
          onChange={setFullName}
          theme={theme}
        />
        <input type="file" ref={inputFileRef} onChange={handleChangeFile} />
        <TextFieldUI
          id={"standard-textarea"}
          label={"Дата Рождения"}
          variant="filled"
          value={"20.20.2000"}
          onChange={() => {}}
          theme={theme}
        />
        <TextFieldUI
          id={"standard-textarea"}
          label={"обо мне"}
          variant="filled"
          value={description}
          onChange={setDescription}
          theme={theme}
        />
        <TextFieldUI
          id={"standard-textarea"}
          label={"Местоположение"}
          variant="filled"
          value={location}
          onChange={setLocation}
          theme={theme}
        />

        <Button onClick={onSubmit}>Обновить профиль</Button>
      </div>
    </div>
  );
}
