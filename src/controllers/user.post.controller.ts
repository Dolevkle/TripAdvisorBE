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
    
    async putById(req: AuthResquest, res:Response) {
        const user_id = req.user._id;
        const userPost = await UserPost.findById(req.params.id);
        if(userPost == null)
        {
            res.status(404).send("post doesnt exist");
        }
        else if(userPost.owner != user_id){
            res.status(401).send("cant update posts of other users");
        }
        else{
            super.putById(req,res);
        }
        
    }

    async getPostsByOwner(req: AuthResquest, res: Response) {
        console.log("getAll");
        try {
            if (req.user._id) {
                const objects = await this.model.find({ owner: req.user._id });
                res.send(objects);
            } else {
                res.status(404).send("user not found");
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async deleteById(req:AuthResquest,res:Response) {
        const user_id = req.user._id;
        const userPost = await UserPost.findById(req.params.id);
        if(userPost == null)
        {
            res.status(404).send("post doesnt exist");
        }
        else if(userPost.owner != user_id){
            res.status(401).send("cant delete posts of other users");
        }
        else{
            super.deleteById(req,res);
        }
        
    }
}

export default new UserPostController();