//src/components/PrivateRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { verifyToken } from "../service/authAPI";
import { parsePath } from "history";
const PrivateRoute = () => {
    // const { user } = useAuth();
    const [checkUser, setCheckUser] = useState(true);
    const location = useLocation();
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
                // Xử lý lỗi nếu có
                setCheckUser(false);
            }
        };

        checkToken(); // Gọi hàm async
    }, []); // Đảm bảo useEffect chỉ chạy một lần khi component được render
    return checkUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
