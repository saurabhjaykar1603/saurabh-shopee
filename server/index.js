import express, { response } from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";

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

//get//get/product
app.get("/products", async (req, res) => {
  const getProducts = await Product.find();
  res.json({
    success: true,
    data: getProducts,
    message: "Product Fetched successfully",
  });
});

//post//post/product
app.post("/product", async (req, res) => {
  const { name, price, description, image, brand, category } = req.body;

  const product = new Product({
    name: name,
    price: price,
    description: description,
    image: image,
    brand: brand,
    category: category,
  });

  try {
    const savedProduct = await product.save();

    res.json({
      success: true,
      data: savedProduct,
      message: "product saved successfully",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//get/get/product/id
app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const finProduct = await Product.findById({ _id: id });
  res.json({
    success: true,
    data: finProduct,
    message: "Product find successfully",
  });
});

//delete/product/:id
app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
  connectDB();
});
