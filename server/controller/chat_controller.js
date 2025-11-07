import { Message } from "../module/chat.js";
import cloudinary from "../midlleware/cloudinary .js";
import streamifier from "streamifier"// Upload media


export const uploadMedia =async (req, res) => {


  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("mid")

  const uplaodiamges = (fillpath)=>{

    return new Promise((resolve,reject)=>{

     const stream = cloudinary.uploader.upload_stream(
      {resource_type:"auto"},
      (err,result)=>{
if(err){
  return reject(err.message)
}
return resolve(result.secure_url)

      }
    )
      streamifier.createReadStream(fillpath).pipe(stream)
    })
    

  }

  console.log("end")

  const data = await uplaodiamges(req.file?.buffer)
 
  

  console.log('cat image',data)
  res.json({ filePath: data });
};



// Get messages of a group
export const getMessages = async (req, res) => {
  try {
 
    const messages = await Message.find().populate("sender","username profileimage");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save & emit message
export const sendMessage = async (io, data) => {
  try {
    const { group, sender, message, media } = data;

    const newMessage = new Message({ group, sender, message, media });
   await newMessage.save()
   const populatedMsg = await Message.findById(newMessage._id).populate("sender", "username profileimage");


    io.emit("receive-message",populatedMsg );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
