// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getAllUsers,
//   getSingleUser,
//   updateUserById,
//   deleteUserById,
//   forgotPassword
// } from "../controller/user.controller.js";
// const router = express.Router();
// //  register route/endpoint
// router.post("/create-user", registerUser);
// router.post("/login", loginUser);
// router.post("/forgot-password", forgotPassword);
// router.get("/allUsers", getAllUsers);
// router.get("/:id", getSingleUser);
// router.put("/updateUser/:id", updateUserById);
// router.delete("/deleteUser/:id", deleteUserById);

// export default router;

// user.router.js
import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUserById,
  deleteUserById,
  forgotPassword,
} from "../controller/user.controller.js";
const router = express.Router();

// Route to handle loading the forgot password page (GET request)
router.get("/auth/forgot-password", (req, res) => {
  // This route is required to avoid the "Cannot GET" error.
  // The page content is handled by your frontend React Router.
  res.status(200).send("Forgot Password Page Loaded");
});

        // register route/endpoint

        // Place all static routes before dynamic :id route
        router.post("/forgot-password", forgotPassword);
        router.post("/create-user", registerUser);
        router.post("/login", loginUser);
        router.get("/allUsers", getAllUsers);
        router.put("/updateUser/:id", updateUserById);
        router.delete("/deleteUser/:id", deleteUserById);
        router.get("/:id", getSingleUser);

export default router;
