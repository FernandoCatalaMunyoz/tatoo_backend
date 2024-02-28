import { Request, Response } from "express";
import { User } from "../models/User";

//FUNCION PARA TRAER TODOS LOS USUARIOS
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      succes: true,
      message: "Users retrieved succesfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Users cant be retrieved",
      error: error,
    });
  }
};

// FUNCION BUSQUEDA USER POR ID

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findOneBy({
      id: parseInt(userId),
    });
    if (!userId) {
      res.status(404).json({
        succes: true,
        message: "User not found",
      });
    }

    res.status(201).json({
      succes: true,
      message: "User retrieved succesfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be retrieved",
      error: error,
    });
  }
};
