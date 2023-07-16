import  * as express from 'express'
import { CreateProduct, GetProducts } from '../controllers/ProductController';

const router = express.Router();

router.post('/',CreateProduct);
router.get('/',GetProducts);

export {router as ProductRoute};