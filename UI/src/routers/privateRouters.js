//src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = () => {
  // const { user } = useAuth();
  const user = localStorage.getItem('user')
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};


export default PrivateRoute;