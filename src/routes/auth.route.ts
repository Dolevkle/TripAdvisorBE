import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";
/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/


/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - username
*         - password
*       properties:
*         username:
*           type: string
*           description: The user username
*         password:
*           type: string
*           description: The user password
*       example:
*         username: 'username123'
*         password: '123456'
*/

/**
* @swagger
* components:
*   schemas:
*     userRegisterRequest:
*       type: object
*       required:
*         - username
*         - password
*         - firstName
*         - lastName
*         - email
*       properties:
*         username:
*           type: string
*           description: The user username
*         password:
*           type: string
*           description: The user password
*         email:
*           type: string
*           description: The user email
*         firstName:
*           type: string
*           description: The user first name
*         lastName:
*           type: string
*           description: The user last name
*       example:
*         username: 'username123'
*         password: '123456'
*         email : bob@gmail.com
*         firstName: Bob
*         lastName: Jhonson
*/
/**
* @swagger
* components:
*   schemas:
*     userRegisterResponse:
*       type: object
*       required:
*         - username
*         - password
*         - firstName
*         - lastName
*         - email
*       properties:
*         username:
*           type: string
*           description: The user username
*         email:
*           type: string
*           description: The user email
*         firstName:
*           type: string
*           description: The user first name
*         lastName:
*           type: string
*           description: The user last name
*       example:
*         username: 'username123'
*         email : bob@gmail.com
*         firstName: Bob
*         lastName: Jhonson
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/userRegisterRequest'
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/userRegisterResponse'
*/
router.post("/register", authController.register);
router.post("/google", authController.googleSignin);

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*       example:
*         accessToken: '123cd123x1xx1'
*         refreshToken: '134r2134cr1x3c'
*/


/**
* @swagger
* /auth/login:
*   post:
*     summary: User login
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The acess & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.post("/login", authController.login);

/**
* @swagger
* /auth/logout:
*   get:
*     summary: logout a user
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*/
router.get("/logout", authController.logout);
/**
* @swagger
* /auth/refresh:
*   get:
*     summary: refresh the access token after expired
*     tags: [Auth]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: success, returns new tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/
router.get("/refresh", authController.refresh);
/**
* @swagger
* /auth/allUsers:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get("/allUsers/:id", authController.getAllUsers);

export default router;