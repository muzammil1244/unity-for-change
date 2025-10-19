import mongoose from "mongoose";


const Mainpostschema  = new mongoose.Schema({

 title:{
    type:String
 },

 


 description:{
type:String
 },


 images:{
    type:[String]
 },


 likes:[
    {user_id:{
        type:mongoose.Schema.Types.ObjectId
    }}
 ],
 
 comments:[
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"
        },
        user_comment:{
            type:String
        }
    }
 ],

 platforms:[
    {
        url:{
            type:String
        },

        title:{
            type:String
        },

        description:{
            type:String
        }
    }

 ]


})


export const mainPostDb = mongoose.model("mainpost",Mainpostschema)