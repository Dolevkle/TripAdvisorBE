import initApp from "./app";
import https from "https";
import http from "http";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import socket, { Server } from "socket.io";

global.onlineUsers = new Map();
const server = initApp().then((app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web Advanced Application development 2024 REST API",
        version: "1.0.1",
        description:
          "REST server including authentication using JWT and refresh token",
      },
      servers: [{ url: process.env.URL }],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  if (process.env.NODE_ENV !== "production") {
    console.log("development");
    console.log(process.env.PORT)
    return http.createServer(app).listen(process.env.PORT);
  } else {
    console.log("PRODUCTION");
    const options2 = {
      key: fs.readFileSync("../client-key.pem"),
      cert: fs.readFileSync("../client-cert.pem"),
    };
    return https.createServer(options2, app).listen(process.env.HTTPS_PORT);
  }
});

const io = new Server(void server, { 
  cors: {
    origin: '*',
  }
});

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    console.log("roni");
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = global.onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});

io.listen(+process.env.SOCKET_PORT);