import { Button } from "@mui/material";
import classes from "./Buttons.module.scss";
import { Groups, PeopleAlt, PostAddSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
export default function Buttons() {
  return (
    <div className={classes.buttons_box}>
      <Link to="/">
        <Button
          sx={{
            justifyContent: "flex-start",
            borderRadius: "7px",
            width: "100%",
            color: "white",
            fontSize: "15px",
            "&:hover": {
              bgcolor: grey[800],
            },
          }}
          startIcon={<PostAddSharp />}
          color="inherit"
          variant="text"
        >
          Посты
        </Button>
      </Link>
      <Link to={"/following"}>
        <Button
          sx={{
            justifyContent: "flex-start",
            borderRadius: "7px",
            width: "100%",
            color: "white",
            fontSize: "15px",
            marginTop: "5px",
            "&:hover": {
              bgcolor: grey[800],
            },
          }}
          startIcon={<PeopleAlt />}
          color="inherit"
          variant="text"
        >
          Подписки
        </Button>
      </Link>
      <Link to={"/followers"}>
        <Button
          sx={{
            justifyContent: "flex-start",
            borderRadius: "7px",
            width: "100%",
            color: "white",
            fontSize: "15px",
            marginTop: "5px",
            "&:hover": {
              bgcolor: grey[800],
            },
          }}
          startIcon={<Groups />}
          color="inherit"
          variant="text"
        >
          Подписчики
        </Button>
      </Link>
    </div>
  );
}
