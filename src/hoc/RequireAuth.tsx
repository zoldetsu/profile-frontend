import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/Auth";
import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { useAppSelector } from "../redux/store";
import Loader from "../UI/Loader";

interface IRequireAuth {
  children: ReactNode;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  const status = useAppSelector((state) => state.auth.status);
  console.log(status);
  console.log(isAuth);

  if (status === "loading") {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  return <>{children}</>;
};

export { RequireAuth };
