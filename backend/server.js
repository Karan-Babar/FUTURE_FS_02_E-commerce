const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST" }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/easyshop")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const userRoutes = require("./userRoutes");
app.use("/api/user", userRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
