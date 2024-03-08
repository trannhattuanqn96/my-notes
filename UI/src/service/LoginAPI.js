// Trong file nơi bạn muốn sử dụng hàm loginAPI, ví dụ: api.js
import axios from 'axios';

// Tạo một instance của Axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Thay đổi thành baseURL của bạn
  timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu (5 giây trong ví dụ này)
});
// Hàm loginAPI gọi API đăng nhập và trả về kết quả
async function loginAPI(username, password) {
  try {
    const response = await axiosInstance.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    // Xử lý lỗi khi gọi API
    throw new Error('Failed to login');
  }
}

export { loginAPI }