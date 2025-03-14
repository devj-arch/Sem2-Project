import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

import productRoutes from "./routes/products.js";
import "./db/init.js";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Welcome to Clothing Shop API");
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
