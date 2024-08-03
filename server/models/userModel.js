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
  firsrName: {
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
    console.log(this.email, this.password);
    next();
  } catch (error) {
    console.log("paswword hash error", error.message);
  }
});
const userModel=mongoose.model("users",userSchema);

export default userModel;
