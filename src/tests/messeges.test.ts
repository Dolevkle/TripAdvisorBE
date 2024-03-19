import { Express } from "express";
import mongoose from "mongoose";
import request from "supertest";
import initApp from "../app";
import User, { IUser } from "../models/user.model";

let app: Express;
let accessToken: string;
let from: string;
let to: string;

const userFrom = {
  email: "from@testing.com",
  password: "1234567890",
  username: "from",
  firstName: "from",
  lastName: "from",
};

const userTo = {
  email: "to@testing.com",
  password: "1234567890",
  username: "to",
  firstName: "to",
  lastName: "to",
};
beforeAll(async () => {
  app = await initApp();

  await User.deleteMany({ email: userFrom.email });
  await request(app).post("/auth/register").send(userFrom);
  const response = await request(app)
    .post("/auth/login")
    .send({ username: userFrom.username, password: userFrom.password });
  accessToken = response.body.accessToken;
  const fromUser = (await User.findOne({
    username: userFrom.username,
  })) as unknown as IUser;
  from = fromUser._id;

  await User.deleteMany({ email: userTo.email });
  await request(app).post("/auth/register").send(userTo);

  const toUser = (await User.findOne({
    username: userTo.username,
  })) as unknown as IUser;
  to = toUser._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

interface IMessage {
  from: string;
  to: string;
  message: string;
}

describe("Message tests", () => {
  test("Test Add Message", async () => {
    const message: IMessage = {
      from,
      to,
      message: "hello",
    };
    const response = await request(app)
      .post("/messages/addMsg")
      .set("Authorization", "JWT " + accessToken)
      .send(message);
    expect(response.statusCode).toBe(200);
  });

  test("Test Get Message", async () => {
    const message = {
      from,
      to,
    };
    const response = await request(app)
      .post("/messages/getMsg")
      .set("Authorization", "JWT " + accessToken)
      .send(message);
    expect(response.statusCode).toBe(200);
  });

  
  test("messages length is not 0", async () => {
    const message = {
      from,
      to,
    };
    const response = await request(app)
      .post("/messages/getMsg")
      .set("Authorization", "JWT " + accessToken)
      .send(message);
    expect(response.body).not.toHaveLength(0);
  });
});