import express from "express";
import { config } from "dotenv";

const app = express();

config();

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
