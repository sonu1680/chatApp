import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/authRoute.js"
dotenv.config();
const app=express();
const port=process.env.PORT || 3031;
const dbUrl=process.env.DB_URL;


app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","PUT","PATCH","DELETE","POST"],
    credentials:true,

}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
});

mongoose.connect(dbUrl).then(()=>{
    console.log('Database Connected')
}).catch((err)=>{
    console.log('DB err',err.message)
});