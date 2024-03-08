// LoginForm.js
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthProvider";
import { loginAPI } from "../../service/LoginAPI";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi API đăng nhập và nhận kết quả
    // const response = await loginAPI(username, password);
    // const userData = response.data; // Giả sử API trả về thông tin người dùng

    // Lưu thông tin người dùng bằng cách sử dụng Context
    // login(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;