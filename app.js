// require("dotenv").config();
dotenv.config();
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./databaseConnection/connection.js";

import userRoute from "./routes/user.route.js";



console.log(process.env.JWT_SECRET);
// middleware parsing
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// loggers
app.use(morgan("dev"));
// cors
app.use(cors());

const port = process.env.PORT || 3000;

// connect to  database
connectToDatabase();

app.get("/", (req, res) => {
  res.send("Hello fine boy");
});

// user routes
app.use("/api/v1/auth", userRoute);




app.listen(port, (req, res) => {
  console.log(`server running on localhost:${port}`);
});
