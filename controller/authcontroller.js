import { ProfileData } from "../module/Profile.js"
import bcrypt, { genSalt, hash } from "bcrypt"
import dotnev from "dotenv"
import  jwt  from "jsonwebtoken"
dotnev.config()

export const Register = async(req,res)=>{

    const { email , username ,password } = req.body
    const image = req.file
    const lenghtofsalt = 10
    const salt = await genSalt(lenghtofsalt)
    const hashedPassword = await hash(password,salt)
    try{
console.log( email , username ,hashedPassword )
        if (!email || !username || !password) {
  return res.status(400).send("All fields are required");
}


        const profiledata = await ProfileData({
            email:email,
            username:username,
            password:hashedPassword,
            profileimage:`/uploads/${image.filename}` || "muzmamil.png"
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


export const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await ProfileData.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found for login");
    }
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){

    return res.status(401).send("user invalid bro ")
}

const payload = { _id:user._id , email:user.email}
const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1h' });
return res.status(200).json({
    token,
    isMatch
})

  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
};
