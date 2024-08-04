import {Router} from "express";
import {
  addProfileImage,
  getUserInfo,
  removeProfilImage,
  login,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const authRoutes = Router();

const upload = multer({ dest: "uploads/profile/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/userInfo", verifyToken, getUserInfo);
authRoutes.post("/updateProfile", verifyToken, updateProfile);
authRoutes.post(
  "/addProfileImage",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);

authRoutes.delete("/removeProfileImage", verifyToken, removeProfilImage);


export default authRoutes;
