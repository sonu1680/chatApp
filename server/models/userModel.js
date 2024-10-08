import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema=mongoose.Schema;
const userSchema = schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default:false

  },
  
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
  } catch (error) {
    console.log("paswword hash error", error.message);
  }
});
const userModel=mongoose.model("users",userSchema);

export default userModel;
