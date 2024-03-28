//FUNCION CREAR CITA

import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

//Funcion para generar una cita para el usuario loggeado
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;
    const service = req.body.serviceId;
    const date = req.body.appointmentDate;

    const newAppointment = await Appointment.create({
      appointmentDate: date,
      service: service,
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
///////////////////////////////////////////////////////////////////////////
//Funcion para actualizar mi cita

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;
    const date = req.body.appointmentDate;
    const appointmentId = req.body.appointmentId;

    const appointmentToUpdate = Appointment.findOne({
      where: {
        id: appointmentId,
        userService: { id: userId },
      },
    });
    if (!appointmentToUpdate) {
      res.status(400).json({
        success: true,
        message: "New date is needed",
      });
    }

    const appointmentUpdated = await Appointment.update(
      {
        id: appointmentId,
      },
      {
        appointmentDate: date,
      }
    );

    res.status(200).json({
      success: true,
      message: "Service updated",
      data: appointmentUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service cant be updated",
      error: error,
    });
  }
};
///////////////////////////////////////////////////////////////////////////
//Funcion recuperar cita

export const getAppointmentbyId = async (req: Request, res: Response) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findOne({
      where: {
        id: parseInt(appointmentId),
        userService: {},
      },
      relations: { userService: true },
      select: {
        id: true,
        appointmentDate: true,
        userService: {
          firstName: true,
          lastName: true,
        },
      },
    });
    if (!appointment) {
      return res.status(404).json({
        succes: false,
        message: "Appointment notfound",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service retrieved",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Service cant be retrieved",
      error: error,
    });
  }
};

//Funcion ver citas de usuario loggeado

export const getUserAppointments = async (req: Request, res: Response) => {
  try {
    const userId = req.tokenData.userId;

    const userAppointments = await Appointment.find({
      where: {
        userService: { id: userId },
      },
      relations: {
        userService: true,
      },
      select: {
        userService: {
          firstName: true,
          lastName: true,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Services retrieved",
      data: userAppointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Services cant be retrieved",
      error: error,
    });
  }
};
