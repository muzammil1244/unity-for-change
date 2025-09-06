import mongoose from "mongoose"

export const DBconnection = (url)=>{
try{

     mongoose.connect(url)

     console.log("Mongodb connected successfully")
}catch(err){

    console.log("mongodb connection erore",err)
}
    


}