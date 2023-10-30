import {Router} from 'express'
import * as categoriesController from './categories.controller.js';
import fileUpload, { fileValidation } from '../../services/multer.js';

const router=Router();


router.get('/',categoriesController.getCategories)
router.get('/active',categoriesController.getAciveCategory)
router.post('/',fileUpload(fileValidation.image).single('image'),categoriesController.createCategories)
router.get('/:id',categoriesController.getspecificCategory)
router.put('/:id',fileUpload(fileValidation.image).single('image'),categoriesController.updateCategory)

export default router;