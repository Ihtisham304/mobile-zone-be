import express from "express";
import { config } from "dotenv";
import { dbConnect } from "./db/dbConnect.js";

const app = express();

config();

app.use(express.json());

dbConnect();
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
