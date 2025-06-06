// Trong file nơi bạn muốn sử dụng hàm loginAPI, ví dụ: api.js
import axios from "axios";
import dataConfig from "../config";
// Tạo một instance của Axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: dataConfig.baseURLAPI, // Thay đổi thành baseURL 
    timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu (5 giây trong ví dụ này)
});

const axiosInstanceWithoutToken =  axios.create({
    baseURL: dataConfig.baseURLAPI, // Thay đổi thành baseURL 
    timeout: 5000, // Thời gian chờ tối đa cho mỗi yêu cầu (5 giây trong ví dụ này)
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { accessToken } = JSON.parse(localStorage.getItem("mynote"));
        // Gắn thông tin xác thực vào header
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

async function createNotes(title, content, tag, description) {
    try {
        const response = await axiosInstance.post("/notes/create", {
            title,
            content,
            tag,
            description,
        });
        return response;
    } catch (error) {
        return error.response;
    }
}
// Hàm loginAPI gọi API đăng nhập và trả về kết quả
async function getNotes(search = null) {
    try {
        const response = await axiosInstanceWithoutToken.get("/notes/get", {
            search,
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

async function deleteNote(id) {
    try {
        const response = await axiosInstance.delete(`/notes/delete/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
}
const getDetailNoteById = async (id) => {
    try {
        const response = await axiosInstanceWithoutToken.get(`/notes/get/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

const updateDetailNoteById = async (data) => {
    try {
        const response = await axiosInstance.post(`/notes/update`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}
export { getNotes, deleteNote, createNotes, getDetailNoteById,updateDetailNoteById };
