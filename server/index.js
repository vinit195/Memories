import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';


const app=express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/posts',postRoutes);
// routes for login & signup
app.use('/user',userRoutes);
//mongo db connection
const PORT=process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>app.listen(PORT,()=>{console.log(`server running on port:${PORT}`)}))
    .catch((error)=>console.log(error.message));


// mongoose.connect(CONNECTION_URL, () => {
//   console.log("Connected to MongoDB");
// });
// app.listen(PORT,()=>{
//     console.log("ddsd");
// })
