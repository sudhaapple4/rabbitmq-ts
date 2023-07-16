import express , { Application } from 'express';
import { MainRoute } from '../routes/MainRoute';

export default async(app: Application) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true}))
    
    app.use(express.json());
    app.use('/main', MainRoute);


    return app;

}