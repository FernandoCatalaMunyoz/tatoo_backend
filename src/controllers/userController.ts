import { Request, Response } from "express";
import { User } from "../models/User";

//FUNCION PARA TRAER TODOS LOS USUARIOS
export const getUsers = async (req: Request, res: Response) => {
  try {
    let limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    if (limit > 100) {
      limit = 10;
    }

    const users = await User.find({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      take: limit,
      skip: skip,
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
///////////////////////////////////////////////////////////////////////////
//FUNCION BORRAR USUARIO POR ID

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
///////////////////////////////////////////////////////////////////////////
//VER PERFIL DE USUARIO

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;
    const name = req.body.first_name;
    const lastName = req.body.last_name;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        role: true,
      },
      select: {
        id: true,
        firstName: name,
        lastName: lastName,
        email: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        succes: true,
        message: "User not found",
        data: user,
      });
    }

    res.status(201).json({
      succes: true,
      message: "User retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      succes: true,
      message: "User cant be retrieved",
    });
  }
};
///////////////////////////////////////////////////////////////////////////
//MODIFICAR DATOS USUARIO

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const userId = req.tokenData.userId;

    const userUpdated = User.update(
      {
        id: userId,
      },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
      }
    );
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (email) {
      if (!validEmail.test(email)) {
        return res.status(400).json({
          success: false,
          message: "format email invalid",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "User updated",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be update",
      error: error,
    });
  }
};
