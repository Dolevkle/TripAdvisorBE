import UserModel, { IUser } from "../models/user.model";
import { BaseController } from "./base.controller";
import {Request, Response } from "express";
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
    async getById(req: AuthResquest, res: Response) {
        req.params.id = req.user._id;
        super.getById(req,res);
    }

    
    //using contains and not match 
    async getUserByName(req: Request, res:Response)
    {

        //splits the first space from the string incase someone has last name with spaces
        const [first_name, last_name] = req.params.fullName.replace(/\s+/, '\x01').split('\x01');
        let users =[];
        //query for searching string that contains
        if(!last_name){
            users = await UserModel.find({firstName :{$regex: first_name, $options: 'i'}});
        }
        else{
             users = await UserModel.find({$and:[{
                firstName :{$regex: first_name, $options: 'i'}},{
                lastName:{$regex: last_name, $options: 'i'}}]});
        }
        if(!users)
        {
            res.status(404).send("Couldnt find by name and last name");
        }
        else
        {
            res.status(200).send(users);
        }
    }

    async deleteById(req: AuthResquest, res: Response) {
        req.params.id = req.user["_id"];
        super.deleteById(req,res);
    }


}


export default new UserController