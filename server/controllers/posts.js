import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts= async (req,res)=>{
    try{
        const postMessage= await PostMessage.find();

        // console.log(postMessage);

        res.status(200).json(postMessage);

    }catch(error){
            res.status(404).json({message:error.message});
    }
}

export const createPost= async(req,res)=>{
    const post = req.body;
    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()});
    try{
        await newPost.save();
            res.status(200).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message});
    }

}

export const updatePost=async(req,res)=>{
    // id :_id means rename id =_id beacuase in moongose _id
    const {id:_id}=req.params;
  const post = req.body;
    // for check if _id exist in 
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No Post with that id');

    const  updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatedPost);
}


export const deletePost=async(req,res)=>{
    const {id:_id}=req.params;
    
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('No Post with that id');

    await PostMessage.findByIdAndRemove(_id);

    res.json({message:"Post Deleted Succesfully"});

}

export const likePost=async(req,res)=>{

    // {id} is post id
    const {id} = req.params;

    // getting userid 
console.log(req.userId)
// console.log(res.userId)
                //
        if(!req.userId)return res.json({message:'Unauthenticated'})

        //check if post not available
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('No Post with that id');


    const post= await PostMessage.findById(id);

            //get if user already like the post or not if like output will be 1 if not like -1
    const index=post.likes.findIndex((id)=>id===String(req.userId));

        if(index ===-1){
            // like the post
            post.likes.push(req.userId);
        }else{
            // dislike post
            post.likes=post.likes.filter((id)=>id != String(req.userId))   
        }

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
// console.log(updatedPost)
    res.json(updatedPost);

}
// export default getPosts;