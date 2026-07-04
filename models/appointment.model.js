// --- backend/models/Appointment.model.js ---
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  // Patient ID (assuming patient is authenticated)
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Links to your User model
  },
  // Doctor details (you might link to a Doctor model later, but start with the name)
  doctor: {
    type: String, // e.g., "Dr. Emily Chen, Cardiology"
    required: false,
  },
  date: {
    type: Date, // Store as a Date object for easy sorting/querying
    required: true,
  },
  time: {
    type: String, // e.g., "10:30 AM"
    required: true,
  },
  notes: {
    type: String,
    default: "Initial consultation.",
  },
  // CRITICAL for the frontend: must be set to 'upcoming' on creation
  status: {
    type: String,
    enum: ["upcoming", "past", "cancelled"],
    default: "upcoming",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
// --- end of backend/models/Appointment.model.js ---