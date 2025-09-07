import { AdminDB } from "../module/AdminPost.js"
import { PostDB } from "../module/clientPos.js"

export const Getnews = async (req, res) => {
    try {

        const allnews = await PostDB.find().populate("comments.comment_by_id", "username profileimage")

        return res.status(200).json(allnews)

    } catch (err) {
        return res.status(500).json(err)
    }

}




export const Suggestion = async (req, res) => {
  const { suggestion } = req.body;

  if (!suggestion || suggestion.trim() === "") {
    return res.status(400).json({ message: "Suggestion is required" });
  }

  const newSuggestion = {
    create_by_id: req.user._id,
    message: suggestion.trim()
  };

  try {
    const data = await AdminDB.updateOne(
      {}, // empty filter means global document
      { $push: { suggestion: newSuggestion } },
      { upsert: true } // return updated doc, create if not exists
    );

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Internal problem",
      error: err.message
    });
  }
};


export const Report = async(req, res) => {
const {message} = req.body
const user_id = req.user._id
const report_id = req.params?.user
try{
  const data ={
    user_id:user_id,
    report_by_id:report_id,
    report_content:message
  }
 const updated = await AdminDB.updateOne(
      {}, 
      { $push: { report: data } },
      { upsert: true } 
    );

    return res.status(200).json(updated);

}catch(err){
  return res.status(500).json({
    err,
    message:"something wrong"
  })
}
}

export const LikedUsersNews = async(req, res) => {
  const user_id = req.user._id
  const post = req.params?.post

  try{

    const data = await PostDB.updateOne({_id:post},{$push:{likes:user_id}})

    if(!data){
      return res.status(200).send("data in not defined ")
    }

    return res.status(200).json(data)

  }catch(err){

    return res.status(500).json(err)
  }
}

export const LikedMainPOst = (req, res) => {
    return res.send("hi liked post of auther")
}

export const CommentToNews = (req, res) => {
    return res.send(" hi comment to the news sction ")
}

export const GetAllPost = (req, res) => {
    return res.send("hi all post of users")
}

export const DeleteComment = (req, res) => {
    return res.send("hi delete comment form user")
}
