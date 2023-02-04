import bcrypt from 'bcryptjs';
import  jwt from 'jsonwebtoken';
// import  jwt_decode from 'jwt-decode';
import User from '../models/user.js';


export const signin=async(req,res)=>{
const {email,password}=req.body;
// console.log(req.body)
    try{
        // console.log('testing')
        const existingUser=await User.findOne({email})
        if(!existingUser)return res.status(404).json({message:"User Doesn't exist"})
        
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credential"});

        const token =jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"});
                res.status(200).json({result:existingUser,token});

    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }

}

export const signup=async(req,res)=>{
    // console.log(req.body)
        const{email,password,confirmPassword,FirstName,lastName}=req.body;
    
        try{
            const existingUser=await User.findOne({email})
            if(existingUser)return res.status(404).json({message:"User Already exist"});
            if(password != confirmPassword)return res.status(400).json({message:"Password don't match"});
            const hasedPassword = await bcrypt.hash(password,12);

            const result=await User.create({email,password : hasedPassword,name:`${FirstName} ${lastName}`})
            const token =jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"});

            res.status(200).json({result,token})

        }catch(error){
                res.status(500).json({message:"Something went wrong"});
        }
}