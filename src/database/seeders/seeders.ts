import { Appointment } from "../../models/Appointment";
import { Role } from "../../models/Role";
import { Service } from "../../models/Service";
import { User } from "../../models/User";
import { AppDataSource } from "../db";
import { faker } from "@faker-js/faker";

import bcrypt from "bcrypt";

const roleSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const roleUser = new Role();
    roleUser.name = "user";
    roleUser.id = 1;
    await roleUser.save();

    const roleAdmin = new Role();
    roleAdmin.name = "admin";
    roleAdmin.id = 2;
    await roleAdmin.save();

    const roleSuperAdmin = new Role();
    roleSuperAdmin.name = "super_admin";
    roleSuperAdmin.id = 3;
    await roleSuperAdmin.save();
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

const userSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    // creacion usuario "user"
    const user = new User();
    user.firstName = "user";
    user.lastName = "user";
    user.email = "user@user.com";
    user.password = bcrypt.hashSync("123456", 8); // 123456
    user.role = new Role();
    user.role.id = 1;
    await user.save();
    // creacion usuario "admin"
    const admin = new User();
    admin.firstName = "admin";
    admin.lastName = "admin";
    admin.email = "admin@admin.com";
    admin.password = bcrypt.hashSync("123456", 8); // 123456
    admin.role = new Role();
    admin.role.id = 2;
    await admin.save();
    // creacion usuario "super_admin"
    const super_admin = new User();
    super_admin.firstName = "super_admin";
    super_admin.lastName = "super_admin";
    super_admin.email = "super_admin@super_admin.com";
    super_admin.password = bcrypt.hashSync("123456", 8); // 123456
    super_admin.role = new Role();
    super_admin.role.id = 3;
    await super_admin.save();
    //creacion usuarios falsos
    const generateFakeUser = () => {
      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.password = bcrypt.hashSync("123456", 8);
      user.role = new Role();
      user.role.id = 1;

      return user;
    };
    const fakeUsers = Array.from({ length: 15 }, generateFakeUser);
    await User.save(fakeUsers);
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};
//creacion de los servicios
const servicesSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const service = new Service();
    service.servicesName = "Tatuajes personalizados";
    service.description =
      "Los clientes tendrán la libertad de seleccionar motivos y diseños únicos, personalizando completamente su experiencia de tatuaje de acuerdo a sus preferencias y gustos.";
    await service.save();

    const service2 = new Service();
    service2.servicesName = "Tatuajes del catálogo";
    service2.description =
      "Ofrecemos la realización de tatuajes basados en diseños predefinidos en nuestro catálogo. Los clientes pueden elegir entre una variedad de opciones estilizadas y probadas.";
    await service2.save();

    const service3 = new Service();
    service3.servicesName = "Restauración y rejuvenecimiento de trabajos";
    service3.description =
      "Nos especializamos en la restauración y rejuvenecimiento de tatuajes existentes. Nuestros expertos trabajan para mejorar y renovar tatuajes antiguos, devolviéndoles su vitalidad.";
    await service3.save();

    const service4 = new Service();
    service4.servicesName = "Colocación de piercings y dilatadores:";
    service4.description =
      "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes.";
    await service4.save();

    const service5 = new Service();
    service5.servicesName = "Venta de piercings y otros artículos:";
    service5.description =
      "Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Los clientes pueden adquirir productos de calidad para complementar su estilo único.";
    await service5.save();
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

const appointmentSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const generateFakeAppointment = () => {
      const appointment = new Appointment();

      appointment.appointmentDate = faker.date.future({ years: 1 });
      appointment.service = new Service();
      appointment.service.id = faker.number.int({ min: 1, max: 5 });
      appointment.userService = new User();
      appointment.userService.id = faker.number.int({ min: 1, max: 18 });

      return appointment;
    };
    const fakeAppointment = Array.from({ length: 50 }, generateFakeAppointment);
    await Appointment.save(fakeAppointment);
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};

const startSeeder = async () => {
  await roleSeedDatabase();
  await userSeedDatabase();
  await servicesSeedDatabase();
  await appointmentSeedDatabase();
};
startSeeder();
