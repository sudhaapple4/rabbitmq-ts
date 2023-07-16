import express, {Request,Response,NextFunction} from 'express'
import {CreateMain,GetMain} from '../controller';

const router = express.Router();

router.post('/',CreateMain);
router.get('/',GetMain);

export {router as MainRoute};
