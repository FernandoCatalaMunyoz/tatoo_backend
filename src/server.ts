import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./database/db";

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
  getAppointmentbyId,
  getUserAppointments,
  updateAppointment,
} from "./controllers/appointmentController";

const app: Application = express();

app.use(express.json());

const PORT = process.env.PORT || 4001;

const startServer = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("database conected");
      app.listen(PORT, () => {
        console.log(`server is runing on port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

startServer();

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
app.put("/api/appointments", auth, updateAppointment);
app.get("/api/appointments/:id", auth, getAppointmentbyId);
app.get("/api/appointments", auth, getUserAppointments);
