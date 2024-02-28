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
      return res.status(404).json({
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

//ACTUALIZAR DATO USUARIO POR ID

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const name = req.body.first_name;
    const email = req.body.email;
    const user = await User.findOneBy({
      id: parseInt(userId),
    });
    if (!user) {
      return res.status(201).json({
        succes: true,
        message: "User not found",
        data: user,
      });
    }
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
      return res.status(400).json({
        success: false,
        message: "format email invalid",
      });
    }

    const userUpdate = await User.update(
      {
        id: parseInt(userId),
      },
      {
        firstName: name,
        email: email,
      }
    );

    return res.status(201).json({
      succes: true,
      message: "User retrieved succesfully",
      data: userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      succes: true,
      message: "User cant be updated",
    });
  }
};

//Funcion borrar usuario

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userToRemove: any = await User.findOneBy({
      id: parseInt(userId),
    });

    if (!userToRemove) {
      res.status(404).json({
        succes: false,
        message: "user not found",
      });
    }

    await User.remove(userToRemove);

    res.status(201).json({
      succes: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      succes: true,
      message: "User cant be deleted",
    });
  }
};
