
import slugify from "slugify";
import cloudinary from "../../services/cloudinary.js";
import categoryModel from '../../../DB/model/category.model.js'

export const getCategories= (req,res)=>{
    return res.json({messages:"categories"})
}

export const createCategories= async(req,res)=>{
    const name=req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        return res.status(409).json({message:"category name already exists"})
    }


    const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{
        folder: `${process.env.APP_NAME}/category`
    });
const cat=await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}})
return res.status(201).json({message:"success",cat})
}
// slug: مشان يحط - بدل الفراغ بين الكلمات
