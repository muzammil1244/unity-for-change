import mongoose from "mongoose";

const Admindata = new mongoose.Schema({
    report:[{
        report_by_id:{type:mongoose.Schema.Types.ObjectId,ref:"ProfileData"},
        report_content:{type:String,required:true}
}],

suggestion:[
    {
        create_by_id:{type:mongoose.Schema.Types.ObjectId,red:"ProfileData"},
        message:{type:String,ref:"ProfileData"}
    }
]

},{timestamps:true})


export const AdminDB = mongoose.model("AdminDB",Admindata)