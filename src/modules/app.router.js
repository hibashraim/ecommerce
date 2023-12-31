import connectDB from '../../DB/connection.js';
import categoriesRouter from './categories/categories.router.js'
import productsRouter from './products/product.router.js';
import authRouter from './auth/auth.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import cartRouter from './cart/cart.router.js'

import couponRoutr from './coupon/coupon.router.js'
import { sendEmail } from '../services/email.js';
const initApp=(app,express)=>{
    app.use(express.json());
    connectDB();
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"welcome"});
    })
    app.use('/auth',authRouter);
app.use('/categories',categoriesRouter);
app.use('/subcategory',subcategoryRouter);
app.use('/coupon',couponRoutr);
app.use('/product',productsRouter);
app.use('/cart',cartRouter);


app.get("*",(req,res)=>{
    return res.status(500).json({message:"page not found"});
})
}

export default initApp;