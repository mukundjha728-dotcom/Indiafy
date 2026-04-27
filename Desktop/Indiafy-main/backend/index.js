import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { databaseConfig } from "./config/db.config.js";
import app from "./app.js";

databaseConfig();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {console.log(`Server run on Port: ${PORT}`)})

