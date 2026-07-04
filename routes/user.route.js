import multer from "multer";

// 1. Configure storage (e.g., in memory or on disk)
const upload = multer({ dest: "uploads/" }); // or multer({ storage: storageOptions })

import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUserById,
  deleteUserById,
  forgotPassword,
  uploadUserImage,

} from "../controller/user.controller.js";
import { getAppointments , createAppointment} from "../controller/appointment.controller.js";
import { getAccessToken } from "../controller/Video.controller.js";
const router = express.Router();

// // Route to handle loading the forgot password page (GET request)
// router.get("/auth/forgot-password", (req, res) => {
//   // This route is required to avoid the "Cannot GET" error.
//   // The page content is handled by your frontend React Router.
//   res.status(200).send("Forgot Password Page Loaded");
// });

// register route/endpoint

// Place all static routes before dynamic :id route
router.post("/forgot-password", forgotPassword);
router.post("/create-user", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", getAllUsers);
// router.put("/updateUser/:id", updaterById);
router.put("/update/:id", updateUserById);
router.delete("/deleteUser/:id", deleteUserById);
router.get("/:id", getSingleUser);
router.post("/upload", upload.single("image"), uploadUserImage);
router.get("/video/token", getAccessToken);
router.get("/appointments", getAppointments);
router.post("/create-appointment", createAppointment);

// 2. Apply Multer middleware to the route
// 'image' should match the field name used by the client when sending the file.
// router.post("/upload", upload.single("image"), uploadUserImage);
// export default router;
// module.exports = router;
// ... all your router.post() and router.get() setups above ...

// Make sure the variable name matches how you initialized it at the top (usually 'router')
export default router;