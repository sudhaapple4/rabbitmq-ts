import { Request, Response, NextFunction } from "express";
import { ProductInput } from "../dto";
import { Product } from "../models";

export const CreateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const {title,image,likes} = <ProductInput>req.body;
    console.log(req.body)
    const createdProduct = await Product.create(
        {
            title:title,
            image:image,
            likes:likes
        }
    )
    let channel = req.channel;
    // createdProduct.admin_id=createdProduct.id;
    channel.sendToQueue('product_created', Buffer.from(JSON.stringify(createdProduct)))
    return res.json(createdProduct)
}

export const GetProducts = async (req: Request, res: Response, next: NextFunction) => {

    const products = await Product.find()

    if(products !== null){
        return res.json(products)
    }

    return res.json({"message": "products data not available"})
    

}