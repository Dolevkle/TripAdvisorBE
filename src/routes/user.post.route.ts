import express from "express";
const router = express.Router();
import userPostController from "../controllers/user.post.controller";
import authMiddleware from "../common/auth.middleware";


/**
* @swagger
* tags:
*   name: UserPost
*   description: The User Post Api
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
* /userPost:
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
router.get("/", userPostController.get.bind(userPostController));

router.get("/:id", userPostController.getById.bind(userPostController));

router.post("/", authMiddleware, userPostController.post.bind(userPostController));

router.get("/user/allPosts", authMiddleware,userPostController.getPostsByOwner.bind(userPostController));

router.put("/:id", authMiddleware, userPostController.putById.bind(userPostController));

router.put("/addComment/:id", authMiddleware, userPostController.addComment.bind(userPostController));

router.delete("/:id", authMiddleware, userPostController.deleteById.bind(userPostController));

export default router;