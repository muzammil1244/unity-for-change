import mongoose, { Schema } from "mongoose";

const Admindata = new mongoose.Schema({
    report:[{
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"},
        report_by_id:{type:mongoose.Schema.Types.ObjectId,ref:"Post"},
        report_content:{type:String,required:true}
}],

suggestion:[
    {
        create_by_id:{type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"},
        message:{type:String,required:true}
    }
]

},{timestamps:true})


export const AdminDB = mongoose.model("AdminDB",Admindata)