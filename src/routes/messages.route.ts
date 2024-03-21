import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller";
import authMiddleware from "../common/auth.middleware";
const router = express.Router();


/**
* @swagger
* tags:
*   name: Message
*   description: The Messages Api
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
*     getMessage:
*       type: object
*       properties:
*         from:
*           type: string
*           description: The user who send the message
*         to:
*           type: string
*           description: The user who get the message
*       example:
*         from: someone
*         to: someone
*/

/**
* @swagger
* components:
*   schemas:
*     addMessage:
*       type: object
*       properties:
*         from:
*           type: string
*           description: The user who send the message
*         to:
*           type: string
*           description: The user who get the message
*         message:
*           type: string
*           description: The message sent
*       example:
*         from: someone
*         to: someone
*         message: hi
*/


/**
* @swagger
* /messages/addMsg:
*   post:
*     summary: Send message
*     tags: [Message]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*                 $ref: '#/components/schemas/addMessage'
*     responses:
*       201:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               msg: string
*               example: 
*                     msg: Message added successfully.
*       401:
*         description: Unauthorized - Invalid token or token expired
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Unauthorized - Invalid token or token expired"
*       500:
*         description: Failed to add message to the database
*         content:
*           application/json:
*             schema:
*               type: object
*               msg: string
*               example: 
*                     msg: Failed to add message to the database.
*/
router.post("/addMsg",authMiddleware, addMessage);

/**
* @swagger
* /messages/getMsg:
*   post:
*     summary: Send message
*     tags: [Message]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*                 $ref: '#/components/schemas/getMessage'
*     responses:
*       201:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               fromSelf: string
*               message: string
*               example: 
*                     fromSelf: string.
*                     message: string.
*       401:
*         description: Unauthorized - Invalid token or token expired
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Unauthorized - Invalid token or token expired"
*       500:
*         description: Internal server error
*         content:
*           application/json:
*             schema:
*               type: string
*               example: Internal server error
*/
router.post("/getMsg",authMiddleware, getMessages);

export default router;