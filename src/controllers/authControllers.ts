import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    {
      const name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const password = req.body.password;

      if (name.length > 255) {
        return res.status(400).json({
          succes: false,
          message: "First name must be under 255 characters",
        });
      }
      if (last_name.length > 255) {
        return res.status(400).json({
          succes: false,
          message: "Last name name must be under 255 characters",
        });
      }
      if (email.length > 255) {
        return res.status(400).json({
          succes: false,
          message: "Email name must be under 255 characters",
        });
      }
      const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (!validEmail.test(email)) {
        return res.status(400).json({
          success: false,
          message: "format email invalid",
        });
      }

      if (password.length > 10 || password.length < 6) {
        return res.status(400).json({
          succes: false,
          message: "Password has to be between 6 and 10 characters",
        });
      }
      const passwordEncrypted = bcrypt.hashSync(password, 8);

      const newUser = await User.create({
        firstName: name,
        lastName: last_name,
        email: email,
        password: passwordEncrypted,
        role: { id: 1 },
      }).save();

      res.status(201).json({
        succes: true,
        message: "User registered succesfully",
        data: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be register",
      error: error,
    });
  }
};
///////////////////////////////////////////////////////////////////////////
//LOGIN

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        succes: false,
        message: "Email and password are needed",
      });
    }
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
      return res.status(400).json({
        success: false,
        message: "format email invalid",
      });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
      relations: {
        role: true,
      },
      select: {
        id: true,
        password: true,
        email: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        succes: false,
        message: "user not found",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        succes: false,
        message: "email or password invalid",
      });
    }
    const token = jwt.sign(
      {
        userId: user.id,
        roleName: user.role.name,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "520h",
      }
    );

    return res.status(201).json({
      succes: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User cant be logged",
      error: error,
    });
  }
};
