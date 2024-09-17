import express from "express";
import { registerUser, userLogin } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;