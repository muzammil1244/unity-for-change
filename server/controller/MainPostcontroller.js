
import { mainPostDb } from "../module/MaiPost.js";
export const Create = async (req, res) => {
  const { title, description, comment } = req.body;

  try {
    const imagePaths = req.files.map(file => file.path); // array of image paths

    const newPost = new mainPostDb({
      title,
      description,
      Images: imagePaths, // save array of image paths
      comments: [
        {
          comment_by_id: req.user?._id,
          comment_content: comment,
        },
      ],
      likes: [req.user?._id],
    });

    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const Update = async (req, res) => {
  const { title, description, comment } = req.body;
  const postId = req.params.id;

  try {
    const imagePaths = req.files?.map(file => file.path); // optional new images

    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(imagePaths?.length && { Images: imagePaths }),
      ...(comment && {
        $push: {
          comments: {
            comment_by_id: req.user?._id,
            comment_content: comment,
          },
        },
      }),
    };

    const updatedPost = await mainPostDb.findByIdAndUpdate(postId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

import fs from "fs";

export const Delete = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await mainPostDb.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Optional: delete images from disk
    post.Images.forEach(imgPath => {
      fs.unlink(imgPath, err => {
        if (err) console.log("Image delete error:", err);
      });
    });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const Get_all_POST = async(req,res)=>{
console.log("yessss")
    try{
const data = await mainPostDb.find()
if(!data){
    return res.status(200).json({message:"data not found "})
}

return res.status(200).json(data)
    }catch(err){
return res.status(200).json(err)
    }
    

}
