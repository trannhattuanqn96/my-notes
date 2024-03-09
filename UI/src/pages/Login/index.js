// LoginForm.js
import { useContext, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { loginAPI } from "../../service/LoginAPI";
import { AuthContext } from "../../context/authContext/AuthProvider";
import useAuth from "../../hooks/useAuth.js"

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [dataLogin, setDataLogin] = useState({
    userName: '',
    password: ''
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dataLogin.userName || !dataLogin.password) {
      toast("User Name hoặc mật khẩu chưa nhập!", { autoClose: 1000 });
      return
    }

    // Gọi API đăng nhập và nhận kết quả
    const response = await loginAPI(dataLogin);
    if (response.status !== 200) {
      toast(response.data.message, { autoClose: 1000 });
      return
    }
    // Lưu thông tin người dùng bằng cách sử dụng Context
    localStorage.setItem('user', response.data.data.user);
    login(response.data.data.user);
    navigate('/home')
  };

  return (
    <>
      <ToastContainer />
      <main
        className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
      >
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Log In</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-10">
            <div
              className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="text"
                placeholder="User Name"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={(e) => setDataLogin((prev) => ({
                  ...prev,
                  userName: e.target.value
                }))}
              />
            </div>

            <div
              className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={(e) => setDataLogin((prev) => ({
                  ...prev,
                  password: e.target.value
                }))}
              />
            </div>

            <button
              className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
            >
              LOG IN
            </button>
          </form>
        </section>
      </main>
    </>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     placeholder="Username"
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //   />
    //   <button type="submit">Login</button>
    // </form>
  );
};

export default LoginForm;