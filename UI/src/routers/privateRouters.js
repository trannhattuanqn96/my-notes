//src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { verifyToken } from "../service/authAPI";
const PrivateRoute = () => {
    // const { user } = useAuth();
    const [checkUser, setCheckUser] = useState(true);
    const location = useLocation();
    //check tokeen
    const checkToken = async () => {
        try {
            if (localStorage.getItem("mynote")) {
                const { user, accessToken } = JSON.parse(
                    localStorage.getItem("mynote")
                );
                const response = await verifyToken(user, accessToken);
                if (!response.data.data.valid) {
                    setCheckUser(false);
                }
            } else {
              setCheckUser(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            setCheckUser(false);
        }
    };
    useEffect(() => {
        checkToken(); // Gọi hàm async
    }, []);
    return checkUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }}  />
    );
};

export default PrivateRoute;
