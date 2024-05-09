import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import useRoutes from "./routers/index.js";
import mongoose from "mongoose";
import userModel from "./models/User.model.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { configMongo } from "./config/mongodb.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
// enable CORS
// var corsOptions = ["http://notes.tuandevzz77.site/", "http://localhost:3002"];
// app.use(cors({
//   origin: function (origin, callback) {
//     // bypass the requests with no origin (like curl requests, mobile apps, etc )
//     if (!origin) return callback(null, true);

//     if (corsOptions.indexOf(origin) === -1) {
//       var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

// const corsOptions = {
//   origin: 'http://notes.tuandevzz77.site/', // Chỉ cho phép truy cập từ domain này
// };
const corsOptions = {
  origin: '*', // Chỉ cho phép truy cập từ domain này
};

app.use(cors(corsOptions));
// app.use(cors(corsOptions));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(configMongo.baseUrl, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected database");
  })
  .catch((err) => console.log(err));
const initAccount = async () => {
  const hashPass = await bcrypt.hash(process.env.PASSWORD, 10);
  try {
    const checkAccount = await userModel.User.find({ userName: "tuantran" });
    if (checkAccount.length > 0) {
      console.log("đã tạo account ");
      return;
    }
    const userAdmin = await userModel.User.create({
      userName: "tuantran",
      password: hashPass,
    });
    console.log("Create admin success");
  } catch (error) {
    console.log("Create admin faild");
  }
};
initAccount();

useRoutes(app);
app.listen(port, () => {
  console.log("Server started on: " + port);
});
