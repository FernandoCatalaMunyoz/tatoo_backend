import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./database/db";
import { error } from "console";
import {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "./controllers/roles";

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

//roles routes

app.get("/roles", getRoles);
app.post("/roles", createRole);
app.put("/roles/:id", updateRole); //roles:id es un parametro de ruta
app.delete("/roles", deleteRole);
