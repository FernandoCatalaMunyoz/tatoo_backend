import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { AppDataSource } from "../db";

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

    const user = new User();
    user.firstName = "user";
    user.lastName = "user";
    user.email = "user@user.com";
    user.password = bcrypt.hashSync("123456", 8); // 123456
    user.role = new Role();
    user.role.id = 1;
    await user.save();

    const admin = new User();
    admin.firstName = "admin";
    admin.lastName = "admin";
    admin.email = "admin@admin.com";
    admin.password = bcrypt.hashSync("123456", 8); // 123456
    admin.role = new Role();
    admin.role.id = 2;
    await admin.save();

    const super_admin = new User();
    super_admin.firstName = "super_admin";
    super_admin.lastName = "super_admin";
    super_admin.email = "super_admin@super_admin.com";
    super_admin.password = bcrypt.hashSync("123456", 8); // 123456
    super_admin.role = new Role();
    super_admin.role.id = 3;
    await super_admin.save();
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy();
  }
};
const startSeeder = async () => {
  await roleSeedDatabase();
  await userSeedDatabase();
};
startSeeder();
