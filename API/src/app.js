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
var corsOptions = {
  origin: "http://notes.tuandevzz77.site/",
}
app.use(cors(corsOptions));
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
console.log(process.env.PASSWORD)
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
