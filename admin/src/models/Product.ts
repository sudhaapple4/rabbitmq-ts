import mongoose, { Document, Schema, Model } from "mongoose";

export interface ProductDoc extends Document{
        title: string;
        image: string;
        likes: number;
}

const ProductSchema = new Schema(
    {
        title: {type: String},
        image: {type: String},
        likes: {type: Number},
        admin_id:{type: String}
    },
    {
        timestamps:true
    }
)

const Product = mongoose.model<ProductDoc>('product',ProductSchema);

export {Product}