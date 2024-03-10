import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from "../../pages/Login";
const Logout = () => {
    // Xóa mục trong localStorage và chuyển hướng đến "/login"
    localStorage.removeItem('mynote');
    return <Login />
};

export default Logout