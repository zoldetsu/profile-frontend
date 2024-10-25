import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/Auth";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

interface IRequireAuth {
  children: ReactNode;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  return <>{children}</>;
};

export { RequireAuth };
