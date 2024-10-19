import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import "../../App.css";
import { grey, yellow } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { logout, selectIsAuth } from "../../redux/slices/Auth";

export default function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  //* --------------------------------------------------------------------
  const ClickFunc = async () => {
    if (isAuth) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/auth");
    }
  };
  //* --------------------------------------------------------------------
  return (
    <header className="container">
      <div className={classes.header}>
        <div className={classes.inner_header}>
          <Link className={classes.logo} to={"/home"}>
            Zolly
          </Link>
          <nav>
            <IconButton>
              <DarkModeIcon sx={{ color: yellow[400] }} />
            </IconButton>
            <Button
              size="small"
              onClick={ClickFunc}
              variant="contained"
              endIcon={<LogoutIcon />}
              sx={{ background: grey[700], borderRadius: 2 }}
            >
              {isAuth ? "выйти" : "войти"}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
