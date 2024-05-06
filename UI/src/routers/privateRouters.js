//src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { verifyToken } from "../service/authAPI";

const PrivateRoute = () => {
    // const { user } = useAuth();
    const location = useLocation()
    console.log(location)
    const [checkUser, setCheckUser] = useState(true);
    //check tokeen
    useEffect(() => {
        const checkToken = async () => {
            try {
                // Thực hiện các công việc bất đồng bộ ở đây
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
                setCheckUser(false);
            }
        };

        checkToken();
    }, []);
    return checkUser ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" replace />
    );
};

export default PrivateRoute;
