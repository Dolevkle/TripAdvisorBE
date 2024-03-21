import express from "express";
import { addMessage, getMessages } from "../controllers/message.controller";
import authMiddleware from "../common/auth.middleware";
const router = express.Router();


/**
* @swagger
* tags:
*   name: Messege
*   description: The Messeges Api
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
*     getMessege:
*       type: object
*       properties:
*         from:
*           type: string
*           description: The user who send the messege
*         to:
*           type: string
*           description: The user who get the messege
*       example:
*         from: someone
*         to: someone
*/

/**
* @swagger
* components:
*   schemas:
*     addMessege:
*       type: object
*       properties:
*         from:
*           type: string
*           description: The user who send the messege
*         to:
*           type: string
*           description: The user who get the messege
*         messege:
*           type: string
*           description: The messege sent
*       example:
*         from: someone
*         to: someone
*         messege: hi
*/


/**
* @swagger
* /messages/addMsg:
*   post:
*     summary: Send messeg
*     tags: [Messege]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*                 $ref: '#/components/schemas/addMessege'
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
*     summary: Send messeg
*     tags: [Messege]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*                 $ref: '#/components/schemas/getMessege'
*     responses:
*       201:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               fromSelf: string
*               messege: string
*               example: 
*                     fromSelf: string.
*                     messege: string.
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