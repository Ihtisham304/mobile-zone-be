import { Router } from "express";
import { login, signUP } from "../../controllers/auth/auth.js";

const router = Router();

router.post("/auth/login", login);
router.post("/auth/signup", signUP);

export default router;
