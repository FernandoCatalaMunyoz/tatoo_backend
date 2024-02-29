import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./database/db";
import { error } from "console";
import { createRole } from "./controllers/roleController";
import { login, register } from "./controllers/authControllers";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "./controllers/userController";
import { User } from "./models/User";
import { auth } from "./middlewares/auth";
import { isSuperAdmin } from "./middlewares/isSuperAdmin";
import { service } from "./controllers/serviceController";

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

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

//roles routes

app.post("/api/roles", auth, isSuperAdmin, createRole);

//user routes

app.get("/api/users", auth, isSuperAdmin, getUsers);
app.get("/api/users/:id", getUserById);
app.put("/api/users/:id", updateUserById);
app.delete("/api/users/:id", deleteUserById);

//services routes
app.post("/api/auth/services", auth, isSuperAdmin, service);
