import express, { response } from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};
// post/signup
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

// post/login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Please enter your email and password ",
//     });
//   }
// });

// const user = await User.findOne({
//   email: email,
//   password: password,
// }).select("name", "email", "mobile")

// if (user) {
//   return res.json({
//     success: true,
//     data: user,
//     message: "Your account has been logged in successfully",
//   });
// } else {
//   res.json({
//     success: false,
//     message: "invalid creadential",
//   });
// }

// /Post/login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please provide a valid email and password",
    });
  }

  const user = await User.findOne({ email: email, password: password }).select(
    "name email password"
  );

  if (user) {
    return res.json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } else {
    return res.json({
      success: false,

      message: "invalid details",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
  connectDB();
});
