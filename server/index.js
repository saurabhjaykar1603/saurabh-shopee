import express, { response } from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import path from 'path';
dotenv.config();

const app = express();
app.use(express.json());
const __dirname = path.resolve();

const PORT = process.env.PORT || 9000;

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("MongoDB Connected");
  }
};
// post/signup
app.post("/api/signup", async (req, res) => {
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
app.post("/api/login", async (req, res) => {
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
app.get("/api/products", async (req, res) => {
  const getProducts = await Product.find();
  res.json({
    success: true,
    data: getProducts,
    message: "Product Fetched successfully",
  });
});

//post//post/product
app.post("/api/product", async (req, res) => {
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
app.get("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  const finProduct = await Product.findById({ _id: id });
  res.json({
    success: true,
    data: finProduct,
    message: "Product find successfully",
  });
});

//delete/product/:id
app.delete("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

//put//product/:id
app.put("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, brand, category } = req.body;
  await Product.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        price: price,
        description: description,
        image: image,
        brand: brand,
        category: category,
      },
    }
  );

  const updateProduct = await Product.findOne({ _id: id });

  res.json({
    success: true,
    data: updateProduct,
    message: "Product updated successfully",
  });
});

//GET/products/search?q=....

app.get("/api/products/search", async (req, res) => {
  const { q } = req.query;
  const product = await Product.find({ name: { $regex: q, $options: "i" } });
  res.json({
    success: true,
    data: product,
    message: "product searched successfully",
  });
});
// //POST - /order
app.post("/api/order", async (req, res) => {
  const {
    user,
    product,
    quantity,
    price,
    deliveryCharges,
    shippingAddress,
    status,
  } = req.body;

  const order = new Order({
    user,
    product,
    quantity,
    price,
    deliveryCharges,
    shippingAddress,
    status,
  });

  try {
    const saveUserOrder = await order.save();
    res.json({
      success: true,
      data: saveUserOrder,
      message: "Order save Successfuly.",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

//GET /orders/:id
app.get("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const findOrder = await Order.findById(id).populate("user product");
  findOrder.user.password = undefined;
  res.json({
    success: true,
    data: findOrder,
    message: "Order successfully found",
  });
});

// GET /order/user:id
app.get("/api/orders/user/:id", async (req, res) => {
  const { id } = req.params;
  const findUser = await Order.find({ user: id }).populate("user product");

  findUser.forEach((order) => {
    order.user.password = undefined;
  });
  res.json({
    success: true,
    data: findUser,
    message: "Order successfully found by user product",
  });
});

// patch /order/status/:id
app.patch("/api/order/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Define a map to assign priorities to order statuses
  const STATUS_PRIORITY_MAP = {
    pending: 0,
    shipped: 1,
    deleivered: 2, // Fixed a typo in 'delivered'
    returned: 3,
    cancle: 4, // Fixed a typo in 'canceled'
    reject: 5, // Fixed a typo in 'rejected'
  };

  const order = await Order.findById(id); // Retrieve the order by its ID from the database
  const curentStatus = order.status; // Get the current status of the order

  const curentPriority = STATUS_PRIORITY_MAP[curentStatus]; // Get the priority of the current status from the map
  const newPriority = STATUS_PRIORITY_MAP[status]; // Get the priority of the new status from the map

  // Check if the new status has a lower priority than the current status
  if (curentPriority > newPriority) {
    return res.json({
      success: false,
      message: `${status} cannot be set once order is ${newPriority}`,
    });
  }
  await Order.updateOne({ _id: id }, { $set: { status: status } });
  res.json({
    success: true,
    message: "Order Status updated successfully",
  });
});

//GET /orders
app.get("/api/orders", async (req, res) => {
  const findOrders = await Order.find().populate("user product");

  findOrders.forEach((order) => {
    order.user.password = undefined;
  });
  res.json({
    success: true,
    data: findOrders,
    message: "Order successfully found by user product",
  });
});

// production 
if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')) }); }

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
  connectDB();
});
