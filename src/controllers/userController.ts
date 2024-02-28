import { Request, Response } from "express";
import { User } from "../models/User";

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json({
    succes: true,
    message: "Users retrieved succcesfully",
  });
};
