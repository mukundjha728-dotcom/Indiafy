import express from "express";
import dotenv from "dotenv";
import { databaseConfig } from "./config/db.config.js";
import app from "./app.js";

dotenv.config();

databaseConfig();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server run on Port: ${PORT}`)})
