import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUserById,
  deleteUserById,
} from "../controller/user.controller.js";
const router = express.Router();
//  register route/endpoint
router.post("/create-user", registerUser);
router.post("/login", loginUser);
router.get("/allUsers", getAllUsers);
router.get("/singleuser/:id", getSingleUser);
router.put("/updateUser/:id", updateUserById);
router.delete("/deleteUser/:id", deleteUserById);

export default router;
