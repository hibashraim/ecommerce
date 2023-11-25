import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/model/product.model.js";


export const getProduct=(req,res)=>{
    return res.json({message:"product"})
}

export const createProduct=async(req,res)=>{
    try{
   const {name,price,discount,categoryId,subcategoryId}=req.body;
   const checkCategory=await categoryModel.findById(categoryId);
   if(!checkCategory){
    return res.status(404).json({message:"category not found"});
   }
const checksubCategory=await subcategoryModel.findById(subcategoryId);
if(!checksubCategory){
    return res.status(404).json({message:"subCategory not found"});
}
req.body.slug=slugify(name);
req.body.finalPrice= price- (price * (discount||0) / 100);

const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,
{folder:`${process.env.APP_NAME}/product/mainImages`});

req.body.mainImage={secure_url,public_id};
  req.body.subImages=[];
  for(const file of req.files.subImages){
  const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,
    {folder:`${process.env.APP_NAME}/product/subimages`});
   req.body.subImages.push({secure_url,public_id})
  }
req.body.createdBy=req.user._id;
req.body.updateBy=req.user._id;

const product =await productModel.create(req.body);
if(!product){
    return res.status(400).json({message:"error while creating product"});
}

    return res.status(201).json({message:"success",product});

}catch(er){
        return res.json(er)
    }
}