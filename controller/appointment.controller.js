// // src/controllers/appointmentController.js
// import Appointment from "../model/appointment";
// const mongoose = require("mongoose");

// const Appointment = require("../model/AppointmentModel");
// const { now } = new Date(); // Current server time

// // Assume req.user.id is set by an authentication middleware
// // We'll use a placeholder '650d9c49f8...' for the patientId in queries

// // --- 1. GET /appointments/upcoming ---
// exports.getUpcomingAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({
//       // Filter 1: By patient (user must only see their appointments)
//       patientId: req.user.id || "650d9c49f884a259c766b57d",
//       // Filter 2: Must be in the future
//       date_time: { $gt: now },
//       // Filter 3: Must not be cancelled
//       status: { $in: ["Upcoming"] },
//     }).sort({ date_time: 1 }); // Sort ascending (earliest first)

//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching upcoming appointments",
//       error: error.message,
//     });
//   }
// };

// // --- 2. GET /appointments/history (Past) ---
// exports.getPastAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({
//       patientId: req.user.id || "650d9c49f884a259c766b57d",
//       // Filter 1: Must be in the past
//       date_time: { $lt: now },
//       // Filter 2: Must be finished/completed (exclude canceled)
//       status: { $in: ["Completed", "NoShow"] },
//     }).sort({ date_time: -1 }); // Sort descending (most recent first)

//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching past appointments",
//       error: error.message,
//     });
//   }
// };

// // --- 3. GET /appointments/canceled ---
// exports.getCancelledAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({
//       patientId: req.user.id || "650d9c49f884a259c766b57d",
//       // Filter 1: Status must be Canceled
//       status: "Canceled",
//     }).sort({ date_time: -1 }); // Sort by original appointment date descending

//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching cancelled appointments",
//       error: error.message,
//     });
//   }
// };

// // --- PUT /appointments/:id/reschedule ---
// exports.rescheduleAppointment = async (req, res) => {
//   const { id } = req.params; // Appointment ID from URL
//   const { new_date_time } = req.body; // New time from React frontend

//   // 1. Basic Validation
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: "Invalid appointment ID." });
//   }
//   if (!new_date_time || isNaN(new Date(new_date_time))) {
//     return res
//       .status(400)
//       .json({ message: "Invalid or missing new_date_time." });
//   }

//   // 2. Advanced Validation (Crucial step for healthcare)
//   // 🚨 In a production app, you MUST implement a check here:
//   //    const isSlotAvailable = await checkProviderAvailability(id, new_date_time);
//   //    if (!isSlotAvailable) {
//   //        return res.status(409).json({ message: 'Time slot is no longer available.' });
//   //    }

//   try {
//     // Find the appointment by ID and update its date_time
//     const rescheduledAppointment = await Appointment.findOneAndUpdate(
//       // Filter: Match ID, ensure it belongs to the user, and that it's still Upcoming
//       {
//         _id: id,
//         patientId: req.user.id || "650d9c49f884a259c766b57d", // Enforce ownership
//         status: "Upcoming",
//       },

//       // Update: Set the new date_time and optionally set the status to 'Upcoming' again
//       { date_time: new Date(new_date_time), status: "Upcoming" },

//       // Options: Return the updated document
//       { new: true }
//     );

//     if (!rescheduledAppointment) {
//       return res.status(404).json({
//         message: "Appointment not found, unauthorized, or already canceled.",
//       });
//     }

//     // 🚨 Trigger Notification: Send confirmation email/SMS to patient and provider.

//     res.status(200).json({
//       message: "Appointment successfully rescheduled.",
//       appointment: rescheduledAppointment,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error during rescheduling.",
//       error: error.message,
//     });
//   }
// };

// // --- backend/controllers/appointment.controller.js ---

// import Appointment from '../models/Appointment.model.js';

// // Controller function to handle POST /api/appointments
// export const createAppointment = async (req, res) => {
//     try {
//         // 1. Get data from the request body (sent from React form)
//         const { doctor, date, time, notes } = req.body;

//         // **IMPORTANT:** You need the patient's ID.
//         // If using authentication middleware (recommended), the ID is usually attached to req.user or req.payload.
//         // For demonstration, let's use a placeholder if auth isn't set up yet:
//         const patientId = req.user ? req.user.id : '60d0fe4f3b14d86b9c9f0a2d'; // Replace with a valid ObjectId

//         // 2. Simple validation (add more robust validation later)
//         if (!doctor || !date || !time) {
//             return res.status(400).json({ message: 'Missing required fields: doctor, date, and time.' });
//         }

//         // 3. Create the new appointment document
//         const newAppointment = new Appointment({
//             patientId,
//             doctor,
//             // Date conversion is essential for MongoDB
//             date: new Date(date),
//             time,
//             notes,
//             // Status is defaulted to 'upcoming' by the Model
//         });

//         // 4. Save the document to the database
//         const savedAppointment = await newAppointment.save();

//         // 5. Send the saved object back to the React frontend
//         // This object contains the MongoDB ID (_id) and the status='upcoming'
//         // CRITICAL: The React frontend uses this exact object to update the global state.
//         res.status(201).json({
//             id: savedAppointment._id, // Use the MongoDB ID
//             name: savedAppointment.doctor,
//             time: savedAppointment.time,
//             date: new Date(savedAppointment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), // Format the date for React display
//             followup: savedAppointment.notes,
//             status: savedAppointment.status
//         });

//     } catch (error) {
//         console.error('Error creating appointment:', error);
//         res.status(500).json({ message: 'Server error while scheduling appointment.' });
//     }
// };

// --- backend/controllers/appointment.controller.js ---

// import Appointment from "../models/appointment.js";

// // Controller function to handle POST /api/appointments
// export const createAppointment = async (req, res) => {
//   try {
//     // 1. Get data from the request body (sent from React form)
//     const { doctor, date, time, notes } = req.body;

//     // **IMPORTANT:** You need the patient's ID.
//     // If using authentication middleware (recommended), the ID is usually attached to req.user or req.payload.
//     // For demonstration, let's use a placeholder if auth isn't set up yet:
//     const patientId = req.user ? req.user.id : "60d0fe4f3b14d86b9c9f0a2d"; // Replace with a valid ObjectId

//     // 2. Simple validation (add more robust validation later)
//     if (!doctor || !date || !time) {
//       return res
//         .status(400)
//         .json({ message: "Missing required fields: doctor, date, and time." });
//     }

//     // 3. Create the new appointment document
//     const newAppointment = new Appointment({
//       patientId,
//       doctor,
//       // Date conversion is essential for MongoDB
//       date: new Date(date),
//       time,
//       notes,
//       // Status is defaulted to 'upcoming' by the Model
//     });

//     res.status(201).json(newAppointment);
//     // 4. Save the document to the database
//     const savedAppointment = await newAppointment.save();

//     // 5. Send the saved object back to the React frontend
//     // CRITICAL: The React frontend uses this exact object to update the global state.
//     res.status(201).json({
//       id: savedAppointment._id, // Use the MongoDB ID
//       name: savedAppointment.doctor,
//       time: savedAppointment.time,
//       date: new Date(savedAppointment.date).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }), // Format the date for React display
//       followup: savedAppointment.notes,
//       status: savedAppointment.status,
//     });
//     // } catch (error) {
//     //   console.error("Error creating appointment:", error);
//     //   res
//     //     .status(500)
//     //     .json({ message: "Server error while scheduling appointment." });
//     // }
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     // Add 'return' here to be safe
//     return res
//       .status(500)
//       .json({ message: "Server error while scheduling appointment." });
//   }
// };

// export default createAppointment;

// export const createAppointment = async (req, res) => {
// console.log("Data received from client:", req.body);
// const patientId = req.user._id;
//   const { doctor, date, time } = req.body;
//   // 1. Validation
//   if (!doctor || !date || !time || !patientId) {
//     return res.status(400).json({ message: "Missing fields" }); // MUST HAVE RETURN
//   }

//   try {
//     const newAppointment = await Appointment.create({ doctor, date, time });

//     // 2. Success Response
//     // THIS IS LIKELY NEAR LINE 243
//     return res.status(201).json({
//       message: "Appointment created",
//       data: newAppointment,
//     });
//   } catch (error) {
//     console.error("Error creating appointment:", error);

//     // 3. Error Response
//     // If the success response above didn't have a 'return',
//     // and an error happened, this line triggers the crash!
//     return res.status(500).json({
//       message: "Server error while scheduling appointment.",
//     });
//   }
// };

// export default createAppointment;

// export const createAppointment = async (req, res) => {
//   console.log("Data received from client:", req.body);

//   const { doctor, date, time } = req.body;

//   // 1. Get the ID from the logged-in user (req.user)
//   // This depends on your auth middleware. It might be req.user.id or req.user._id
//   const patientId = req.user ? req.user.id : null;

//   // 2. Updated Validation: If patientId is missing here,
//   // it means the user isn't logged in properly.
//   if (!doctor || !date || !time || !patientId) {
//     return res.status(400).json({
//       message: "Missing required fields. Are you logged in?",
//       debug: { doctor, date, time, patientId },
//     });
//   }

//   try {
//     const newAppointment = await Appointment.create({
//       doctor,
//       date,
//       time,
//       patientId, // Now this will be populated
//     });

//     return res.status(200).json({
//       message: "Appointment created successfully",
//       data: newAppointment,
//     });
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return res.status(500).json({
//       message: "Server error while scheduling appointment.",
//     });
//   }
// };

// // export default createAppointment;
// import Appointment from "../models/appointment.model.js";
// const Appointment = require("");

// // Controller logic to create a new appointment
// exports.createAppointment = async (req, res) => {
//   try {
//     const newAppt = new Appointment(req.body);
//     await newAppt.save();
//     res.status(201).json(newAppt);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to create appointment" });
//   }
// };

// // Controller logic to get appointments by status
// exports.getAppointments = async (req, res) => {
//   try {
//     const status = req.query.status;
//     const filter = status ? { status } : {};
//     const list = await Appointment.find(filter).sort({ date_time: 1 });
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch appointments" });
//   }
// };

// import Appointment from "../models/appointment.model.js";

// // Controller logic to create a new appointment
// export const createAppointment = async (req, res) => {
//   try {
//     const newAppt = new Appointment(req.body);
//     await newAppt.save();
//     res.status(201).json(newAppt);
//   } catch (err) {
//     res.status(400).json({ error: "Failed to create appointment" });
//   }
// };

// // Controller logic to get appointments by status
// export const getAppointments = async (req, res) => {
//   try {
//     const status = req.query.status;
//     const filter = status ? { status } : {};
//     const list = await Appointment.find(filter).sort({ date_time: 1 });
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch appointments" });
//   }
// };

import Appointment from "../models/appointment.model.js";

// Controller logic to create a new appointment
export const createAppointment = async (req, res) => {
  try {
    const newAppt = new Appointment(req.body);
    await newAppt.save();
    res.status(201).json(newAppt);
  } catch (err) {
    res.status(400).json({ error: "Failed to create appointment" });
  }
};

// Controller logic to get appointments by status
export const getAppointments = async (req, res) => {
  try {
    const { status } = req.query;

    // Force an empty string or whitespace-only string to be treated as null
    const cleanedStatus = status && status.trim() !== "" ? status.trim() : null;

    // If cleanedStatus exists, filter by it. Otherwise, return all ({})
    const filter = cleanedStatus ? { status: cleanedStatus } : {};

    const list = await Appointment.find(filter).sort({ date_time: 1 });
    res.json(list);
  } catch (err) {
    // Crucial for debugging backend crashes locally
    console.error("Database Fetch Error Details:", err.message);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
