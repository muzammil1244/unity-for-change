
import jwt   from "jsonwebtoken"

export const Authmiddleware = async(req,res,next)=>{

  const token = req.headers.authorization?.split(" ")[1]; 

  if(!token){
    return res.status(401).send("token required ")
  }

  try{


    const user = jwt.verify(token,process.env.JWT_TOKEN)
    console.log(user)
req.user = user; 
    next();
  }catch(err){

return res.status(500).json(err)

  }

  token

}