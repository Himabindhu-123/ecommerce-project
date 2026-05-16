const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("User", UserSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.json({ message: "User Registered" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({ message: "Login Successful" });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});