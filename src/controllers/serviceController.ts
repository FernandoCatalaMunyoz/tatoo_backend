import { Request, Response } from "express";
import { Service } from "../models/Service";

//CREACION SERVICIOS
export const service = async (req: Request, res: Response) => {
  try {
    const name = req.body.services_name;
    const description = req.body.description;

    const newService = await Service.create({
      servicesName: name,
      description: description,
    }).save();

    res.status(201).json({
      succes: true,
      message: "service registered succesfully",
      data: newService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service cant be register",
      error: error,
    });
  }
};
