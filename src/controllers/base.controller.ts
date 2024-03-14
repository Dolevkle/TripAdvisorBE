import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        console.log("getAllUsers");
        try {
            if (req.query.name) {
                const users = await this.model.find({ name: req.query.name });
                res.send(users);
            } else {
                const users = await this.model.find();
                res.send(users);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        console.log("getUserById:" + req.params.id);
        try {
            const user = await this.model.findById(req.params.id);
            res.send(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async post(req: Request, res: Response) {
        console.log("postUser:" + req.body);
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("error: " + err.message);
        }
    }
    async putById(req: Request, res: Response) {
        const filter = { _id: req.params.id };
        console.log("put by id: " +req.params.id);
        try {
            const updatedUser = await this.model.findOneAndUpdate(filter,req.body,{
                new : true
            });
            res.status(200).send(updatedUser);
        }
        catch (err){
            console.log(err);
            res.status(406).send("error: " + err.message);
        }
    }

    async deleteById(req: Request, res: Response) {
        console.log("delete by id: " +req.params.id);
        try{
           const deletedCount = await this.model.deleteOne({_id: req.params.id});
           res.status(200).send(deletedCount);
        }
        catch(err){
            console.log(err);
            res.status(406).send("error: "+ err.message);
        }
    }
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseController<ModelType>(model);
}

export default createController;