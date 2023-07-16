import mongoose, { Schema, Document, Model } from 'mongoose';


interface MainDoc extends Document {
    admin_id: string;
    title: string;
    image: string;
    likes: number;
}

const MainSchema  = new Schema({
    admin_id:{type:String},
    title:{type:String},
    image:{type:String},
    likes:{type:Number}},
    {
        timestamps: true
    }
)

const Main = mongoose.model<MainDoc>('main', MainSchema);

export {Main}