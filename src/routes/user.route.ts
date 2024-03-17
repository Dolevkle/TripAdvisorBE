import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";
import authMiddleware from "../common/auth.middleware";


/**
* @swagger
* tags:
*   name: User
*   description: The User Api
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
*     userUpdate:
*       type: object
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
* /user/allUsers:
*   get:
*     summary: logout a user
*     tags: [User]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*/
router.get("/allUsers", authMiddleware, userController.get.bind(userController));


/**
* @swagger
* /user/{id}:
*   get:
*     tags: [User]
*     description: Get user by id
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         description: ID of the user to retrieve
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: logout completed successfully
*/
router.get("/:id", authMiddleware, userController.getById.bind(userController));


// /**
// * @swagger
// * /user:
// *   get:
// *     summary: get user details by his access token
// *     tags: [User]
// *     description: need to provide the refresh token in the auth header
// *     security:
// *       - bearerAuth: []
// *     responses:
// *       200:
// *         description: logout completed successfully
// */
// router.get("/", authMiddleware, userController.getById.bind(userController));


/**
* @swagger
* /user/filter/{fullName}:
*   get:
*     tags: [User]
*     description: Get users who include full name
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: fullName
*         in: path
*         description: full name of the user to search
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: returned users successfully
*/
router.get("/filter/:fullName",authMiddleware,userController.getUserByName.bind(userController))

/**
* @swagger
* /user/{id}:
*   put:
*     summary: Update user by ID
*     tags: [User]
*     description: Update user information. Refresh token is required in the auth header.
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         description: ID of the user to update
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/userUpdate'
*     responses:
*       200:
*         description: User updated successfully
*       404:
*         description: User not found
*/
router.put("/:id", authMiddleware, userController.putById.bind(userController));

/**
* @swagger
* /user:
*   delete:
*     summary: delete user
*     tags: [User]
*     description: delete own user
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: delete succeeded
*/
router.delete("/", authMiddleware, userController.deleteById.bind(userController));

export default router;