const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: "server/.env"});
}

const loginRoute = require("./login");
const registerRoute = require("./register");
const handlers = require("./handlers");

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/cart", handlers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
