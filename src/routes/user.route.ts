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
*     User:
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

// didnt finished yet
/**
* @swagger
* /user/allUsers:
*   get:
*     summary: Get all users
*     tags: [User]
*     description: need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
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
router.get("/allUsers", authMiddleware, userController.getAll.bind(userController));


/**
* @swagger
* /user/{id}:
*   get:
*     tags: [User]
*     summary: Get user by id
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
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
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
*     summary: Get users who include full name
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: fullName
*         in: path
*         description: Full name of the user to search
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized - Invalid token or token expired
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Unauthorized - Invalid token or token expired"
*       404:
*         description: Couldnt find by name and last name
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Couldnt find by name and last name"
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
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       401:
*         description: Unauthorized - Invalid token or token expired
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Unauthorized - Invalid token or token expired"
*       404:
*         description: Not found, update failed
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Not found, update failed"
*/
router.put("/:id", authMiddleware, userController.putById.bind(userController));

/**
* @swagger
* /user:
*   delete:
*     summary: Delete user
*     tags: [User]
*     description: Delete own user
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Deleted successfully
*         content:
*           application/json:
*             schema:
*               type: string
*               example: "Deleted successfully"
*/
router.delete("/", authMiddleware, userController.deleteById.bind(userController));
router.get("/", authMiddleware, userController.getByToken.bind(userController));

export default router;