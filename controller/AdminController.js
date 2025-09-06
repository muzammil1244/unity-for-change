
import { AdminDB } from "../module/AdminPost.js"
import { PostDB } from "../module/clientPos.js"
import { ProfileData } from "../module/Profile.js"
export const Post = (req, res) => {
  return res.send("hi  admin post")


}

export const NewsPos = async (req, res) => {
  const { title, comments } = req.body
  const Images = req.file
  try {

    console.log("started ")
    const postdata = await PostDB({
      title: title,
       comments: [
        {
          comment_content,
          comment_by_id: req.user?._id // optional
        }
      ],

      Images: [`/uploads/${Images.filename}`]

    })
    await postdata.save(); // ✅ Save to MongoD


    // B
    return res.status(200).json(postdata)


  } catch (err) {
    return res.json(err)
  }
}

export const UpdatePost = async (req, res) => {
  const { title, comments, discription } = req.body;
  const imageFile = req.file;
  const postid = req.params.postid;

  console.log("Post ID:", postid);

  try {
    // ✅ Build update object dynamically
    const updateData = {
      title,
      discription,
       comments: [
        {
          comment_content,
          comment_by_id: req.user?._id // optional
        }
      ],
    };

    // ✅ Add image if file is present
    if (imageFile) {
      updateData.Images = [`/uploads/${imageFile.filename}`];
    }

    // ✅ Update the post
    const updatedPost = await PostDB.findByIdAndUpdate(
      postid,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Post updated:", updatedPost);
    return res.status(200).json(updatedPost);

  } catch (err) {
    console.error("Error updating post:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const DeletePost = async (req, res) => {
  const postid = req.params.postid;

  console.log("Post ID:", postid);

  try {
    // ✅ Build update object dynamically




    const deletedpost = await PostDB.findByIdAndDelete(postid);

    if (!deletedpost) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Post updated:", deletedpost);
    return res.status(200).json(deletedpost);

  } catch (err) {
    console.error("Error updating post:", err);
    return res.status(500).json({ error: err.message });
  }
};



export const ReportAction = async (req, res) => {

  const newsid = req.params.userpostid


  try {

    const deletedpost = await PostDB.findByIdAndDelete(newsid)

    if (!deletedpost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(deletedpost)



  } catch (err) {

    return res.status(500).json(err)
  }






}

export const ReportMessage = async (req, res) => {
  const messages = await AdminDB.find()
  try {
    if (!messages) {
      return res.status(500).send("internal server problem ")
    }

    const data = messages.map(msg => msg.report)
    return res.status(200).json(data)
  } catch (err) {
    return res.json(err)
  }


}

export const Suggestion = async (req, res) => {
  const messages = await AdminDB.find()
  try {
    if (!messages) {
      return res.status(500).send("internal server problem ")
    }

    const data = messages.map(msg => msg.suggestion)
    return res.status(200).json(data)
  } catch (err) {
    return res.json(err)
  }
}

export const GetallUserList = async (req, res) => {

  try {

    const allusers = await ProfileData.find()
    if (allusers.length === 0) {

      return res.send("there is nothing to show  ")
    }


    return res.json(allusers)

  } catch (err) {

    return res.status(500).json(err)
  }

}

export const Add_message_to_usres = async (req, res) => {

  const { message } = req.body;
  const id = req.params.userid
  try {

    const user = await ProfileData.findById(id)

    if (!user) {
      return res.status(200).send("user not found")
    }

   const data = await ProfileData.updateOne(
      { _id: id },
      { $push: { authermessage: message } }
    );

      return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json(err)
  }


}
