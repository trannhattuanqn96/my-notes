import userModel from "../models/User.model.js";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(200).json({
      data: { valid: false },
      message: "token error",
    });
  }
  try {
    const getToken = req.headers.authorization.split(" ");
    const decodeToken = jwt.verify(getToken[1], process.env.JWT_SECRET);

    // Kiểm tra thời gian hết hạn
    const currentTime = Date.now() / 1000; // Chuyển đổi sang giây
    if (decodeToken.exp <= currentTime) {
      return { valid: false, message: "Token has expired" };
    }
    // // Kiểm tra người dùng
    const checkUser = userModel.User.findOne({ userName: decodeToken.user });
    if (!checkUser) {
      // Giả sử 'loggedInUserId' là ID của người dùng đã đăng nhập
      return res.status(200).json({
        data: { valid: false },
        message: "Token is invalid for the logged-in user",
      });
    }
    // return res.status(200).json({
    //   data: {valid: true },
    //   message: "token valid",
    // });
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      data: { valid: false },
      message:error,
    });
  }
  next();
};

export default checkToken;
