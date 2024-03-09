import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import useRoutes from "./routers/index.js";
import mongoose from "mongoose";
import userModel from "./models/User.model.js";
import bcrypt from "bcrypt";

const app = express();
const port = process.env.PORT || 4000;
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://mynotes:mynotespwd@103.37.61.100:27017/my-notes", {
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
