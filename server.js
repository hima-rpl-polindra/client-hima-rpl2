import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Ini koneksi ke .env dan tanpa di push ke github
const uri = `${process.env.MONGODB_URI}${process.env.MONGODB_DB}`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Connection Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
