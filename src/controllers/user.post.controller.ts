import UserPost, { IUserPost } from "../models/user.post.model";
import { BaseController } from "./base.controller";
import { Response } from "express";
import { AuthResquest } from "../common/auth.middleware";

class UserPostController extends BaseController<IUserPost>{
    constructor() {
        super(UserPost)
    }

    async post(req: AuthResquest, res: Response) {
        console.log("postUser:" + req.body);
        const _id = req.user._id;
        req.body.owner = _id;
        super.post(req, res);
    }
}

export default new UserPostController();