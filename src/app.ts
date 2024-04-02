import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();

import { createRole } from "./controllers/roleController";
import { login, register } from "./controllers/authControllers";
import {
  deleteUserById,
  getProfile,
  getUsers,
  updateProfile,
} from "./controllers/userController";

import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { getServices, service } from "./controllers/serviceController";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentbyId,
  getUserAppointments,
  updateAppointment,
} from "./controllers/appointmentController";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/healthy", (req, res) => {
  res.status(200).json({
    succes: true,
    message: "Server is healthy",
  });
});

//authentication routes

app.post("/api/register", register);
app.post("/api/auth/login", login);

//roles routes

app.post("/api/roles", createRole);

//user routes

app.get("/api/users", auth, isSuperAdmin, getUsers);
app.get("/api/users/profile", auth, getProfile);
app.put("/api/users/profile", auth, updateProfile);
app.delete("/api/users/:id", auth, isSuperAdmin, deleteUserById);

//services routes
app.post("/api/auth/services", auth, isSuperAdmin, service);
app.get("/api/auth/services", getServices);

//appointments routes
app.post("/api/appointments", auth, createAppointment);
app.put("/api/appointments", auth, isSuperAdmin, updateAppointment);
app.get("/api/appointments/:id", auth, getAppointmentbyId);
app.get("/api/appointments", auth, getUserAppointments);
app.delete("/api/appointments/:id", auth, deleteAppointment);

export default app;
