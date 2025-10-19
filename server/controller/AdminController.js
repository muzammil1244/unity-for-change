
import { AdminDB } from "../module/AdminPost.js"
import { PostDB } from "../module/clientPos.js"
import { ProfileData } from "../module/Profile.js"
import { mainPostDb } from "../module/MaiPost.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, platforms } = req.body;

    const images = req.files ? req.files.map((file) => "uploads/" + file.filename) : [];

    const newPost = new mainPostDb({
      title,
      description,
      images,
      platforms: JSON.parse(platforms || "[]"), // agar array string aaye toh parse karna
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await mainPostDb.find().populate("comments.user_id", "username email profileimage");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, platforms } = req.body;

    let updateData = { title, description };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) =>  "uploads/" + file.filename);
    }

    if (platforms) {
      updateData.platforms = JSON.parse(platforms);
    }

    const updated = await mainPostDb.findByIdAndUpdate(id, updateData, { new: true });

    res.json({ message: "Post updated", post: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await mainPostDb.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};











export const NewsPos = async (req, res) => {
  const { title, comments, description } = req.body;

  try {
    if (!title || !comments || !description) {
      console.log("All data required");
      return res.status(400).send("All fields are essential");
    }

    let Images = [];
    if (req.files && req.files.length > 0) {
      Images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const postdata = new PostDB({
      title: title,
      create_by_id: req.user?._id,
      comments: [
        {
          comment_content: comments,
          comment_by_id: req.user?._id,
        },
      ],
      Images: Images,
      description: description,
    });

    await postdata.save();

    console.log("Post created successfully");
    return res.status(200).json(postdata);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const UpdatePost = async (req, res) => {
  const { title, description, existingImages = [] } = req.body;
  const postid = req.params.postid;

  try {
    // post fetch karo
    const existingPost = await PostDB.findById(postid);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // UpdateData prepare karo
    let updateData = {
      title,
      description,
      Images: Array.isArray(existingImages) ? existingImages : [existingImages],
    };

    // nayi images agar hai to add karo
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      updateData.Images = [...updateData.Images, ...newImages];
    }

    const updatedPost = await PostDB.findByIdAndUpdate(
      postid,
      { $set: updateData },
      { new: true, runValidators: true }
    );

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


// delete reported post 
export const ReportAction = async (req, res) => {

  const newsid = req.params?.userpostid


  try {

    const deletedpost = await PostDB.findByIdAndDelete(newsid)

    if (!deletedpost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({message:"data have been deleted"})



  } catch (err) {

    return res.status(500).json(err.message)
  }






}

export const ReportMessage = async (req, res) => {
  try {
    const messages = await AdminDB.find()
      .select("report")
      .populate("report.user_id", "username email profileimage")
.populate({
  path: "report.report_by_id",            // 1️⃣ first level populate
  select: "title Images description create_by_id", // 2️⃣ select fields from post
  populate: {                        // 3️⃣ second level populate (inside Post)
    path: "create_by_id",            // the field inside Post schema
    select: "username email profileimage" // what you want from user
  }
})

    if (!messages) {
      return res.status(500).send("Internal server problem");
    }

    return res.status(200).json(messages);
  } catch (err) {
    console.error("ReportMessage Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// delete report message 

export const deleteReport = async (req, res) => {
  try {
    const { userpostid } = req.params; 
    console.log("Deleting report with id:", userpostid);

    const updatedAdmin = await AdminDB.findOneAndUpdate(
      { "report._id": userpostid }, 
      { $pull: { report: { _id: userpostid } } },
      { new: true } 
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report deleted successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const Suggestion = async (req, res) => {

  try {
    const messages = await AdminDB.find().select("suggestion").populate("suggestion.create_by_id", "email username profileimage")


    if (!messages) {
      return res.status(500).send("internal server problem ")
    }

    return res.status(200).json(messages)
  } catch (err) {
    return res.json(err)
  }
}
// controllers/suggestionController.js


export const deleteSuggestion = async (req, res) => {
  try {
    const { suggestionId } = req.params; // frontend se ye ID aayegi

    const updatedDoc = await AdminDB.findOneAndUpdate(
      { "suggestion._id": suggestionId }, // find document with this suggestion id
      { $pull: { suggestion: { _id: suggestionId } } }, // remove suggestion
      { new: true } // updated document return kare
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    return res.status(200).json({ message: "Suggestion deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetallUserList = async (req, res) => {

  try {

    const allusers = await ProfileData.find().populate("followers.user_id","username email profileimage").populate("following.user_id","username email profileimage")
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


export const Get_your_liked_video = async (req, res) => {


  const user_id = req.user?._id
  try {


    const data = await PostDB.find({ likes: user_id }).populate("create_by_id","username profileimage email")

    if (!data) {
      return res.status(200).json({ message: "data not found bro" })
    }

    return res.status(200).json(data)

  } catch (err) {

    return res.status(200).json(err)

  }


}

export const Get_your_comment = async (req, res) => {
  const user_id = req.user?._id
  try {

    const data = await PostDB.find({ "comments.comment_by_id": user_id })

    if (!data) {
      return res.status(200).json({
        message: "dat not found by user id "
      })
    }

    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const Unlike_Post_news = async (req, res) => {

  const user_id = req.user?._id
  const post_id = req.params?.post

  try {

    const data = await PostDB.findByIdAndUpdate(post_id, {
      $pull: { likes: user_id }

    }, { new: true })


    if (!data) {
      return res.status(200).json({
        message: "data not founded "
      })
    }

    return res.status(200).json({
      message: "data have been updated", data
    })
  } catch (err) {

    return res.status(500).json(err)
  }

}
