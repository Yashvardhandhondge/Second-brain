import { Response,Request } from "express";
import { Router } from "express";
import Zod from 'zod'
import { User } from "../models/db";
// import { compare, hash } from "bcrypt-ts";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const Jwt_scerate = process.env.JWT_SECRET;

const router = Router();

router.post("/signup", async (req:Request,res : Response) => {
    try{
    const User1 = Zod.object({
        email : Zod.string().email(),
        password : Zod.string().min(4),
        username : Zod.string().min(3),
        image : Zod.string().optional()
    })
    
   

    const SafeParse = User1.safeParse(req.body);

    if(!SafeParse.success){
        res.status(400).json({
            message : " Something is wrong",
            error : SafeParse.error
        })
    }

    const {email , password , username , image} = req.body;
    
    // const hashedPassword = await hash(password,5);

    const user = await User.create({
        email,
        password  ,
        username,
        image
    })

    const token = jwt.sign({
        id : user._id
    },Jwt_scerate || "")
    
    
    {user ?
        res.status(201).json({
           token,
           user,
           message : "User Created"
        }) 
        : 
        res.status(400).json({
            message : "User Not Created"
        })
    }
    } catch(error) {
        console.error(error);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
})

export default router;