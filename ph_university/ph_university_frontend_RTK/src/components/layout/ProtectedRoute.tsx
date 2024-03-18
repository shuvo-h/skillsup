/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { authGetters, logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/storeHook";
import { verifyToken } from "../../utilities/verifyToken";
import { TUser } from "../../types";

type TProtectedRouteProps = { children: ReactNode,role:string|undefined }
const ProtectedRoute = ({ children,role }: TProtectedRouteProps) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(authGetters.selectCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
  }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
