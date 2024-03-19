// import { Express } from "express";
// import request from "supertest";
// import initApp from "../app";
// import mongoose from "mongoose";
// import UserPost, { IUserPost } from "../models/user.post.model";
// import User, { IUser } from "../models/user.model";

// let app: Express;
// const user: IUser = {
//   email: "test@student.post.test",
//   password: "1234567890",
//   firstName: "name",
//   lastName: "lastname",
//   username:"username"
// }
// let accessToken = "";

// beforeAll(async () => {
//   app = await initApp();
//   console.log("beforeAll");
//   await UserPost.deleteMany();

//   await User.deleteMany({ 'email': user.email });
//   const response = await request(app).post("/auth/register").send(user);
//   user._id = response.body._id;
//   const response2 = await request(app).post("/auth/login").send(user);
//   accessToken = response2.body.accessToken;
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
// const post1: IUserPost = {
//     username:"string",
//     imgUrl: "string",
//     userImgUrl: "string",
//     content: "string"
// };


// describe("User post tests", () => {
//   const addStudentPost = async (post: IUserPost) => {
//     const response = await request(app)
//       .post("/userPost")
//       .set("Authorization", "JWT " + accessToken)
//       .send(post);
//     expect(response.statusCode).toBe(201);
//     expect(response.body.owner).toBe(user._id);
//     expect(response.body.title).toBe(post.content);
//     expect(response.body.imgUrl).toBe(post.imgUrl);
//     expect(response.body.userImgUrl).toBe(post.userImgUrl);
//     expect(response.body.username).toBe(post.username);
//   };

//   test("Test Get All Student posts - empty response", async () => {
//     const response = await request(app).get("/userPost");
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toStrictEqual([]);
//   });

//   test("Test Post User post", async () => {
//     addStudentPost(post1);
//   });

//   // test("Test Get All Students posts with one post in DB", async () => {
//   //   const response = await request(app).get("/studentpost");
//   //   expect(response.statusCode).toBe(200);
//   //   const rc = response.body[0];
//   //   expect(rc.title).toBe(post1.title);
//   //   expect(rc.message).toBe(post1.message);
//   //   expect(rc.owner).toBe(user._id);
//   // });

// });