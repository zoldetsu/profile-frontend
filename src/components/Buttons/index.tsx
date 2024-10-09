import { Button } from "@mui/material";
import classes from "./Buttons.module.scss";
import { Groups, PeopleAlt, PostAddSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function Buttons() {
  return (
    <div className={classes.buttons_box}>
      <Link to="/home">
        <Button
          sx={{ justifyContent: "flex-start", width: "100%" }}
          startIcon={<PostAddSharp />}
          color="white"
          variant="text"
        >
          Посты
        </Button>
      </Link>
      <Button
        sx={{ justifyContent: "flex-start", width: "100%" }}
        startIcon={<PeopleAlt />}
        color="white"
        variant="text"
      >
        Подписки
      </Button>
      <Button
        sx={{ justifyContent: "flex-start", width: "100%" }}
        startIcon={<Groups />}
        color="white"
        variant="text"
      >
        Подписчики
      </Button>
    </div>
  );
}
