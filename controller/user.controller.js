import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import nodemailer from "nodemailer";



// user registration endpoint
export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    // salting or salt around
    const salt = await bcrypt.genSalt(10);
    // harshed password
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "user already exist" });
    // console.log(user);
    const createdUser = await newUser.save();
    return res
      .status(201)
      .json({ message: "User successful created", createdUser });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// login endpoint
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user exist
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User does not exist" });
    // console.log(user);

    // check if password match
    const checkIsPassWordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkIsPassWordMatch)
      return res.status(401).json({ error: "Invalid user credentials" });
    // generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );
    // omit password
    const { password, ...otherUserinfo } = user._doc;
    res.status(200).json({
      message: `${user.firstname} login successfully`,
      token,
      otherUserinfo,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// forgot password
export const forgotPasswordWithLink = async (req, res) => {try {
  const {email} = req.body
// check if user exist
const user = await User.findOne({ email})
if (!user) return res.status(404).json({error: "User not found"});
// generate reset token
const resetToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15m"})
// create reset link
await sendEmail({to:email,subject:"Password Reset",text:`Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`})
} catch (error) {
  res.status(500).json({error: error.message});
}}


// forgot password with OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP via email (configure transporter)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({
      message: "All Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Add this line to send the user data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// update users
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password, role } = req.body;
    // check if user exist
    const user = await user.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // update user details
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.role = role || user.role;
    // if password is provided hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// delete user
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // chech if user exist
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
