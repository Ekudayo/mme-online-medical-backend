// // // src/routes/appointmentRoutes.js
// // import express from "express"
// // const express = require("express");
// // const router = express.Router();
// // const controller = require("../controllers/appointmentController");
// // // 🚨 You must have middleware to check the JWT and attach req.user.id
// // // const { protect } = require('../middleware/authMiddleware');

// // // Apply the authentication middleware to all routes
// // // router.use(protect);

// // router.get("/upcoming", controller.getUpcomingAppointments);
// // router.get("/history", controller.getPastAppointments); // Using 'history' for past
// // router.get("/canceled", controller.getCancelledAppointments);
// // // We use DELETE (or PUT) method targeting a specific resource ID
// // router.delete('/:id/cancel', controller.cancelAppointment);
// // // --- NEW ROUTE FOR RESCHEDULING ---
// // // Uses PUT method to update the appointment details
// // router.put('/:id/reschedule', controller.rescheduleAppointment);

// // module.exports = router;

// // --- backend/routes/appointment.routes.js ---

// // import express from 'express';
// // import  createAppointment  from '../controller/appointment.controller.js';
// // // You'll likely need middleware for authentication (e.g., verifyToken)
// // // import { verifyToken } from '../middleware/auth.middleware.js';

// // const router = express.Router();

// // // Define the POST route for scheduling a new appointment
// // // Assuming the user is authenticated, we add a middleware (verifyToken)
// // router.post('/create-appointments', /* verifyToken, */ createAppointment);

// // export default router;
// // import express from "express";

// // const router = express.Router();
// // const appointmentController = require("../controllers/appointmentController");

// // // Define the endpoints
// // router.post("/", appointmentController.createAppointment);
// // router.get("/", appointmentController.getAppointments);

// // export default router;

// import express from "express";
// // Use curly braces for named imports from your controller
// import {
//   createAppointment,
//   getAppointments,
// } from "../controller/appointment.controller.js";




// // const router = express.Router();


// // router.get("/", getAppointments);

// // export default router;





// const router = express.Router();

// // This should just be "/" because the prefix is in server.js
// router.post("/create-Appointment", createAppointment);
// router.get("/get-Appointments", getAppointments); 

// export default router;