import mongoose from "mongoose"



const Profile = new mongoose.Schema({

    email:{
type:String,
required:true,

    unique: true, 
 },

 username:{
    type: String,
    required: false, // 🔄 changed
  default: "Unnamed User"
 },


 password:{
    type:String,
    required:true
 }

,
 profileimage:{
type:String,
default: ""

 },

 gender:{
   type:String
 }

 ,



 cover_image:{
   type:String
 }
,

 authermessage:[
   
   {type:String }

],

role: {
   type: String,
   enum: ["user", "admin"],
   default: "user"
 },
 

aboute_user:{
   type:String
},

followers:[
   {
        user_id:{
      type:mongoose.Schema.Types.ObjectId ,
      ref:"ProfileData"
   }
   }
 
],

following:[
   {
       user_id:{
    type:mongoose.Schema.Types.ObjectId,
      ref:"ProfileData"
   }
   }
  
]

})


export const ProfileData = mongoose.model("ProfileData",Profile)