import userModel from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
    const userName = req.body.userName.toLowerCase() ;
    const password = req.body.password;
    const user = await userModel.getUser(userName);
    if (!user) {
        return res.status(401).json({
            message:"Tên đăng nhập không tồn tại"
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message:"Mật khẩu không đúng"
        });
    }

    // const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    // const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    // const dataForAccessToken = {
    //     username: user.username,
    // };
    const accessToken = jwt.sign(
        { user: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
    
    if (!accessToken) {
        return res
            .status(401)
            .json({
                message:"Đăng nhập không thành công, vui lòng thử lại."
            });
    }
    // return
    // return res.json({
    //     message: 'Đăng nhập thành công.',
    //     accessToken,
    //     user: user.userName
    // });
    //retun with coolkie
    return res
    .status(200)
    .json({
        data: {user: user.userName},
        message:"Đăng nhập thành công"
    });
};

export { Login } 