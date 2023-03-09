import express from "express";
const router = express.Router();
import { authUser, registerUser, getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);

export default router;
