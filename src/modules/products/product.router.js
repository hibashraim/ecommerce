import { Router } from "express";
import * as productController from './product.controller.js'
import {endPoint} from './product.endpoint.js';
import {auth}from '../../middleware/auth.js'
import fileUpload,{fileValidation}from '../../services/multer.js'
const router=Router();

router.get('/',productController.getProduct)
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).fields([
    {name:'mainImage',maxCount:1},
    {name:"subImages",maxCount:4},
]),productController.createProduct)

export default router;