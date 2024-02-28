import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
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
      //comprobamos que se genera la contraseña encriptada
      console.log(passwordEncrypted);

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
