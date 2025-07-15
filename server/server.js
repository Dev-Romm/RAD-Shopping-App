const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({path: ".env"});
}



const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
