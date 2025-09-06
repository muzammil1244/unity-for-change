import { ProfileData } from "../module/Profile.js"
import bcrypt, { genSalt, hash } from "bcrypt"


export const Register = async(req,res)=>{

    const { email , name ,password ,profileimage} = req.body
    const lenghtofsalt = 10
    const salt = await genSalt(lenghtofsalt)
    const hashedPassword = await hash(password,salt)
    try{
console.log( email , name ,hashedPassword ,profileimage)
        if(!email ,!name ,!password ){
          return  console.log("all data required")
        }

        const profiledata = await ProfileData({
            email:email,
            username:name,
            password:hashedPassword,
            profileimage:profileimage || "muzmamil.png"
        })

        const data = await profiledata.save()

        

        if(data){
            console.log("yes data has uploaded successfully")
        }

       return   res.json(data).status(200)




    
    }catch(err){
        return res.status(401).json(err.errmsg||err)
    }
}


export const Login = (req,res)=>{

res.send("hi login")
}