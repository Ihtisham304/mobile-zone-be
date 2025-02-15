import express from "express";
import { config } from "dotenv";
import { dbConnect } from "./db/dbConnect.js";
import authRoute from "./routes/auth/auth.js";
import refreshTokenRoute from "./routes/auth/refreshToken.js";

const app = express();

config();

app.use(express.json());

dbConnect();

app.use("/api", authRoute);
app.use("/api/refreshToken", refreshTokenRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
