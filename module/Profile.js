import mongoose from "mongoose"



const Profile = new mongoose.Schema({

    email:{
type:String,
required:true,

    unique: true, 
 },
 username:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 }
,
 profileimage:{
type:String
 }
,
 authermessage:[
   
   {type:String }

]


})


export const ProfileData = mongoose.model("ProfileData",Profile)