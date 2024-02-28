import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./database/db";
import { error } from "console";
import { createRole } from "./controllers/roleController";
import { register } from "./controllers/authControllers";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "./controllers/userController";
import { User } from "./models/User";

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

app.post("/api/users", register);

//roles routes

app.post("/api/roles", createRole);

//user routes

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.put("/api/users/:id", updateUserById);
app.delete("/api/users/:id", deleteUserById);
