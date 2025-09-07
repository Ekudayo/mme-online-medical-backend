import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    max: 24,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "Admin"],
    default: "user",
  },
  otp:{
    type: String,
    default: null
  },
  otp_expiry:{
    type: Date,
    default: null
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
