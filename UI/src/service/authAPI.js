// Trong file nơi bạn muốn sử dụng hàm loginAPI, ví dụ: api.js
import axios from 'axios';
import dataConfig from '../config';
// Tạo một instance của Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: dataConfig.baseURLAPI, // Thay đổi thành baseURL của bạn
  timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu (5 giây trong ví dụ này)
});


// Hàm loginAPI gọi API đăng nhập và trả về kết quả
async function loginAPI({userName, password}) {
  console.log(userName, password)
  try {
    const response = await axiosInstance.post('/login', {userName,password});
    return response;
  } catch (error) {
    return error.response;
  }
}

async function verifyToken(user, accessToken) {
  try {
    const response = await axiosInstance.post('/login/verifytoken', {user,accessToken});
    return response;
  } catch (error) {
    return error.response;
  }
}
export { loginAPI, verifyToken }