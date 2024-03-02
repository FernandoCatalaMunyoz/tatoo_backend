//FUNCION CREAR CITA

import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

export const getDate = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;
    const serviceName = req.body.servicesId;
    const date = req.body.date;

    const newAppointment = await Appointment.create({
      appointmentDate: date,
      service: serviceName,
      userService: { id: userId },
    }).save();

    res.status(200).json({
      success: true,
      message: "Service booked",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service cant be booked",
      error: error,
    });
  }
};
