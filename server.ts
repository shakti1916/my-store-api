

import express, { Request, Response } from "express"
import router from "./routes"
import dotenv from "dotenv";
import { connectDb } from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;
app.use("/api",router)
connectDb();

app.get("/shakti",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"hi"
    })
})

app.listen(PORT,()=>{
    console.log("server connected")
})