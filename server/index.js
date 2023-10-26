import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import e from "express";
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};

app.post("/signup", async (req, res) => {
  const { name, email, password, mobile, address, gender } = req.body;
  const user = new User({
    name,
    email,
    password,
    mobile,
    address,
    gender,
  });
  try {
    const savedUser = await user.save();
    res.json({
      success: true,
      data: savedUser,
      message: "signup successful",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
  connectDB();
});
