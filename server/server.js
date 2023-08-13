// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import urouter from "./routes/userRoutes.js";
import mrouter from "./routes/musicRoutes.js"
import path from "path";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const upload = multer();
app.use(upload.array());

app.use(cookieParser());
app.set("view engine", "ejs");

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/", express.static(__dirname + "/public"));

app.use("/users", urouter);
app.use("/music", mrouter);

app.listen(process.env.PORT, () => {
  console.log(`run on port ${process.env.PORT}`);
});


// DEPLOYMENT
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
