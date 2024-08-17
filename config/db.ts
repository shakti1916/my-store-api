import mongoose from "mongoose"

export const connectDb = () => {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI as string).then(()=>{
        console.log("mongodb connected");
    }).catch((error)=>{
        console.log("error in mongodb connection",error)

    })
}