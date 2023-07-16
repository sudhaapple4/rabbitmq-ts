import { Express, Request, Response, NextFunction } from "express";
import { MainInput } from "../dto";
import { Main } from "../models";

export const CreateMain = async (req: Request, res: Response, next: NextFunction)=>{
    const {admin_id,title,image,likes} = <MainInput>req.body;
    const createMain = await Main.create({
        admin_id:admin_id,
        title:title,
        image:image,
        likes:likes
    })
    return res.json(createMain);
}

export const GetMain = async (req: Request, res: Response, next: NextFunction)=>{
    const mains = await Main.find();
    if(mains !== null){
        return res.json(mains)
    }
    return res.json({"message": "Mains data not available"})
}