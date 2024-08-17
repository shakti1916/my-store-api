import mongoose from "mongoose"
const userSchema = new mongoose.Schema({

    username:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:String,
   

},{timestamps:true}) 

export const userModel = mongoose.model("user",userSchema);