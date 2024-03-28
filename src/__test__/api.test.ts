import request from "supertest";
import { AppDataSource } from "../database/db";
import app from "../app";

let server: any;
let token = "";

beforeAll(async () => {
  await AppDataSource.initialize();

  server = app.listen(4001);
});

afterAll(async () => {
  try {
    if (server) {
      await server.close();
      console.log("Server closed");
    }

    await AppDataSource.destroy();
  } catch (error) {
    console.log(
      "Error closing server and destroying databae connection:",
      error
    );
    throw error;
  }
});

describe("Api auth", () => {
  test("Server is healthy", async () => {
    const { status, body } = await request(server).get("/api/healthy");
    expect(status).toBe(200);
  });
});

describe("Auth", () => {
  test("Register user", async () => {
    const { status, body } = await request(server).post("/api/register").send({
      first_name: "user",
      last_name: "user",
      email: "user@user.com",
      password: "123456",
    });

    console.log(body);
    expect(status).toBe(201);
    expect(body.message).toBe("User registered succesfully");
  });

  test("Login user", async () => {
    const { status, body } = await request(server)
      .post("/api/auth/login")
      .send({
        email: "user@user.com",
        password: "123456",
      });

    token = body.token;
    console.log(body);
    expect(status).toBe(201);
    expect(body.message).toBe("User logged succesfully");
  });

  test("update user", async () => {
    const { body, status } = await request(server)
      .put("/api/users/profile")
      .send({
        first_name: "Fernando",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(status).toBe(201);
  });
});
