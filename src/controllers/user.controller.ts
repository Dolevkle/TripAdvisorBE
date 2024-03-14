import UserModel, { IUser } from "../models/user.model";
import { BaseController } from "./base.controller";
import { Response } from "express";
import { AuthResquest } from "../common/auth.middleware";
import bcrypt from "bcrypt";

// const UserController = createController<IUser>(UserModel);

class UserController extends BaseController<IUser>{
    constructor() {
        super(UserModel)
    }

    async putById(req: AuthResquest, res: Response) {
        console.log("putUser:" + req.body);
        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        super.putById(req,res);
    }
}


export default new UserController