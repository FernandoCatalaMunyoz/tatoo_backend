import { Request, Response } from "express";

export const getRoles = (req: Request, res: Response) => {
  res.status(200).json({
    succes: true,
    message: "Roles retrieved succesfully",
  });
};

export const createRole = (req: Request, res: Response) => {
  //
  console.log(req.body);

  res.status(201).json({
    //201: codigo de crado correctamente
    //pasos:
    //1. Recibir/recuperar datos
    //2. Validar datos
    //2.5 Tratar informacion(codificar, verificar...etc)
    //3. Si esta todo OK guardar en BD
    //4. Respuesta
    succes: true,
    message: "Role created",
  });
};

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
export const deleteRole = (req: Request, res: Response) => {
  res.status(200).json({
    succes: true,
    message: "Role deleted",
  });
};
