import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUsers,
  userSignout,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/signOut", protect, userSignout);

export default router;
