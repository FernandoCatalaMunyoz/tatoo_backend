import { Request, Response } from "express";
import { Role } from "../models/Role";

export const getRoles = (req: Request, res: Response) => {
  res.status(200).json({
    succes: true,
    message: "Roles retrieved succesfully",
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////
export const createRole = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    if (name.length > 50) {
      return res.status(400).json({
        succes: false,
        message: "Role name must be under 50 characters",
      });
    }

    const newRole = await Role.create({
      name: name, // la clave hade ser igual que la de los modelos
    }).save();

    res.status(201).json({
      succes: true,
      message: "Role created",
      data: newRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cant create role",
      error: error,
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////
export const updateRole = (req: Request, res: Response) => {
  //recuperar parametros de la ruta

  console.log(req.params.id); //id es lo que le hemos puesto en la llamada de la funcion en server.ts

  res.status(200).json({
    //pasos:
    //1. Recibir datos.
    //2. Validar datos.
    //3. Tratar datos.
    //3.5 Recuperar el registro a modificar
    //4. Actualizar datos
    //5. Reespuesta
    succes: true,
    message: "Role updated",
  });
};
///////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteRole = (req: Request, res: Response) => {
  res.status(200).json({
    succes: true,
    message: "Role deleted",
  });
};
