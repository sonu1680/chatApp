import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {renameSync,unlinkSync} from "fs";
const createToken = (email, userId) => {
  return jwt.sign(
    {
      email,
      userId,
    },
    process.env.JWT_KEY,
    { expiresIn: "3d" }
  );
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(402)
        .json({ message: "Enter Email and Password Properly", success: false });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(203)
        .json({ message: "User already registered", success: false });
    }
    const newUser = await userModel.create({ email, password });

    res.cookie("jwt", createToken(email, newUser._id), {
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: newUser._id,
        email: newUser.email,
        profileSetup: newUser.profileSetup,
      },
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Error during Validation", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", success: false });
    }
    const jwtToken = createToken(email, user._id);
    res.status(200).json({
      message: "Login Success",
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
        token: jwtToken,
      },
      success: true,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (!userData)
      return res.status(403).json({ message: "No user found", success: false });

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
const userId=req.userId;
const {firstName,lastName,color} = req.body;
   
if(!firstName || !lastName ){
        return res
          .status(403)
          .json({ message: "firstName,lastName and color is required", success: false });

}

    const userData = await userModel.findByIdAndUpdate(userId,{
      firstName,lastName,color,profileSetup:true
    },{new:true,runValidators:true});

   
    if (!userData)
      return res.status(403).json({ message: "No user found", success: false });

    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
   } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
   }
};

const addProfileImage = async (req, res) => {
  try {
 
    if (!req.file) {
      return res.status(403).json({
        message: "no file found",
        success: false,
      });
    }

const date= Date.now();
let fileName="uploads/profile/"+date+req.file.originalname;
renameSync(req.file.path,fileName);
const updatedUser=await userModel.findByIdAndUpdate(req.userId,{image:fileName},{new:true,runValidators:true})

    if (!updatedUser){

      return res.status(403).json({ message: "No user found", success: false });
    }

    return res.status(200).json({
      image: updatedUser.image
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
  }
};

const removeProfilImage = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user){
      return res.status(403).json({ message: "No user found", success: false });

    }
if(user.image){
  unlinkSync(user.image);

}
user.image=null;
await user.save();

    return res.status(200).json({message:"profile image removed successfully."});
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Internal server error", success: false });
  }
};

export {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfilImage,
};
