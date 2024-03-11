import userModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const userName = req.body.userName.toLowerCase();
  const password = req.body.password;
  const user = await userModel.getUser(userName);
  if (!user) {
    return res.status(401).json({
      message: "Tên đăng nhập không tồn tại",
    });
  }
  console.log(process.env.JWT_SECRET)
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Mật khẩu không đúng",
    });
  }

  const accessToken = jwt.sign(
    { user: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  if (!accessToken) {
    return res.status(401).json({
      message: "Đăng nhập không thành công, vui lòng thử lại.",
    });
  }
  // return
  // return res.json({
  //     message: 'Đăng nhập thành công.',
  //     accessToken,
  //     user: user.userName
  // });
  //retun with coolkie
  return res.status(200).json({
    data: { user: user.userName, accessToken },
    message: "Đăng nhập thành công",
  });
};

const VerifyToken =  (req, res) => {
  const token = req.body.accessToken
  try {
    const decodeToken =  jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra thời gian hết hạn
    const currentTime = Date.now() / 1000; // Chuyển đổi sang giây
    if (decodeToken.exp <= currentTime) {
      return { valid: false, message: "Token has expired" };
    }
    // // Kiểm tra người dùng
    const checkUser = userModel.User.findOne({userName:decodeToken.user})
    if (!checkUser) {
      // Giả sử 'loggedInUserId' là ID của người dùng đã đăng nhập
      return res.status(200).json({
        data: {valid: false },
        message: "Token is invalid for the logged-in user",
      });
    }
    if (decodeToken.user !== req.body.user) {
      // Giả sử 'loggedInUserId' là ID của người dùng đã đăng nhập
      return res.status(200).json({
        data: {valid: false },
        message: "Token is invalid for the logged-in user",
      });
    }
    return res.status(200).json({
      data: {valid: true },
      message: "token valid",
    });
  } catch (error) {
    return res.status(200).json({
      data: {valid: false },
      message: "token error",
    });
  }
};
export { Login, VerifyToken };
