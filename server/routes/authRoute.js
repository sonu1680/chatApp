import {Router} from "express";
import {getUserInfo, login, signup, updateProfile} from "../controllers/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
const authRoutes=Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/userInfo",verifyToken, getUserInfo);
authRoutes.post("/updateProfile", verifyToken, updateProfile);



export default authRoutes;
