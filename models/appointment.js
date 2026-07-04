// // src/models/AppointmentModel.js
// import mongoose from "mongoose";

// const AppointmentSchema = new mongoose.Schema(
//   {
//     // Store the ID of the user this appointment belongs to
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     providerName: { type: String, required: true },
//     date_time: { type: Date, required: true }, // The time used for filtering
//     appointmentType: { type: String, required: true },

//     // Status used for filtering (Upcoming, Completed, Canceled)
//     status: {
//       type: String,
//       enum: ["Upcoming", "Completed", "Canceled", "NoShow"],
//       default: "Upcoming",
//     },
//   },
//   { timestamps: true }
// );

// const Appointment = mongoose.model("Appointment", AppointmentSchema);

// export default Appointment;

// // --- backend/models/Appointment.model.js ---
// import mongoose from "mongoose";

// const AppointmentSchema = new mongoose.Schema({
//   // Patient ID (assuming patient is authenticated)
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User", // Links to your User model
//   },
//   // Doctor details (you might link to a Doctor model later, but start with the name)
//   doctor: {
//     type: String, // e.g., "Dr. Emily Chen, Cardiology"
//     required: true,
//   },
//   date: {
//     type: Date, // Store as a Date object for easy sorting/querying
//     required: true,
//   },
//   time: {
//     type: String, // e.g., "10:30 AM"
//     required: true,
//   },
//   notes: {
//     type: String,
//     default: "Initial consultation.",
//   },
//   // CRITICAL for the frontend: must be set to 'upcoming' on creation
//   status: {
//     type: String,
//     enum: ["upcoming", "past", "cancelled"],
//     default: "upcoming",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Appointment = mongoose.model("Appointment", AppointmentSchema);

// export default Appointment;
// // --- end of backend/models/Appointment.model.js ---

const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  provider_name: String,
  date_time: Date,
  time: String,
  followup: String,
  status: {
    type: String,
    enum: ["upcoming", "past", "cancelled"],
    default: "upcoming",
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);