const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT } = process.env;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://zerodha-frontend-tbed.onrender.com", // frontend
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoute);

// Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// Start server
app.listen(PORT || 4000, () => {
  console.log(`Server is listening on port ${PORT || 4000}`);
});
