import jwt from 'jsonwebtoken';
// import  jwt_decode from 'jwt-decode';

const auth =async(req,res,next)=>{
   
    try{
        console.log(req.headers)
        const token= req.headers.authorization.split(" ")[1];

        // if length  less than 500 that means is user not login by googleauth else if greater means user login 
        // by google auth 
        const isCustomAuth=token.length<500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id;

        }else{
            decodedData=jwt.decode(token)
            req.userId=decodedData?.sub;
        }
       console.log(decodedData, req.userId)
        next()
    }catch(error){
        console.log(error)
    }
}

export default auth;
