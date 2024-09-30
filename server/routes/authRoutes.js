import express from "express";
import { registerUser, userLogin, userLogout } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;