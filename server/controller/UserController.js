import { AdminDB } from "../module/AdminPost.js"
import { PostDB } from "../module/clientPos.js"
import { mainPostDb } from "../module/MaiPost.js"
import { ProfileData } from "../module/Profile.js"
import mongoose from "mongoose"
//for get news all
export const Getnews = async (req, res) => {
  try {

    const allnews = await PostDB.find().populate("comments.comment_by_id", "username profileimage").populate("create_by_id","username profileimage email").sort({ createdAt: -1 })

    return res.status(200).json(allnews)

  } catch (err) {
    return res.status(500).json(err)
  }

}



//add suggestion for the admin
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

// report any post 
export const Report = async (req, res) => {
  const { message } = req.body
  const user_id = req.user._id
  const report_id = req.params?.user
  try {
    const data = {
      user_id: user_id,
      report_by_id: report_id,
      report_content: message
    }
    const updated = await AdminDB.updateOne(
      {},
      { $push: { report: data } },
      { upsert: true }
    );

    return res.status(200).json(updated);

  } catch (err) {
    return res.status(500).json({
      err,
      message: "something wrong"
    })
  }
}
// like any post 
export const LikedUsersNews = async (req, res) => {
  const user_id = req.user._id;
  const post = req.params?.post;

  try {
    const data = await PostDB.updateOne(
      { _id: post },
      { $addToSet: { likes: user_id } } // prevents duplicate likes
    );

    if (!data) {
      return res.status(404).send("Post not found");
    }

    return res.status(200).json({ message: "Like added (if not already present)", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const LikedMainPOst = async (req, res) => {
  const user_id = req.user._id;
  const post = req.params?.post;

  try {
    const data = await mainPostDb.updateOne(
      { _id: post },
      { $addToSet: { likes: user_id } } // prevents duplicate likes
    );

    if (!data) {
      return res.status(404).send("Post not found");
    }

    return res.status(200).json({ message: "Like added (if not already present)", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



//commetn any post 
export const CommentToNews = async (req, res) => {
  const { comment } = req.body
  const user_id = req.user?._id
  console.log("user id",user_id)
  const post = req.params?.post

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" })
  }

  const comment_data = {
    comment_by_id: user_id,
    comment_content: comment
  }

  try {
    await PostDB.updateOne(
      { _id: post },
      { $push: { comments: comment_data } }
    )

    const updatedPost = await PostDB.findById(post)

if(!post){
  return res.json({message:"post not found"}).status(200)
}    return res.status(200).json(updatedPost)

  } catch (err) {
    return res.status(500).json(err)
  }
}

// for getting the post of there owen
export const GetAllPost = async (req, res) => {

  const user_id = req.user?._id
  console.log(user_id)
  try {
    const data = await PostDB.find({ create_by_id: user_id }).populate("comments.comment_by_id","username profileimage").sort({ createdAt: -1 })

console.log("owen data ",data)

    return res.status(200).json(data)


  } catch (err) {

    return res.status(500).json(err)
  }
}


export const Delete_comment = async (req, res) => {
  const user_id = req.user?._id
  const post_id = req.params?.post

  try {

    const data = await PostDB.findByIdAndUpdate(post_id, {
      $pull: { comments:{comment_by_id:user_id}}

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

export const Comment_main_post =async(req,res)=>{
  const { comment } = req.body
  const user_id = req.user?._id
  const post = req.params?.post
  const comment_data = {
    comment_by_id: user_id,
    comment_content: comment



  }

  try {

    const data = await mainPostDb.updateOne({ _id: post }, { $push: { comments: comment_data } })

    if (!data) {
      return res.status(200).send("data in not defined ")
    }

    const dapost = await mainPostDb.findById(post)

    return res.status(200).json(dapost)

  } catch (err) {

    return res.status(500).json(err)
  }
}

export const unlike_main_post = async(req,res)=>{

    const user_id = req.user?._id
    const post_id = req.params?.post 
  
    try{
  
      const data = await mainPostDb.findByIdAndUpdate(post_id,{
        $pull:{likes:user_id}
        
      }, { new: true })
  
  
      if(!data){
        return res.status(200).json({
          message:"data not founded "
        })
      }
      
      return res.status(200).json({
        message:"data have been updated",data
      })
    }catch(err){
  
      return res.status(500).json(err)
    }
  
  
}

export const Delete_main_comment = async(req,res)=>{
  const { postId, commentId } = req.params;
  const userId = req.user?._id; // assuming user is authenticated

  try {
    const result = await mainPostDb.updateOne(
      { _id: postId },
      {
        $pull: {
          comments: {
            _id: commentId,
            comment_by_id: userId
          }
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Comment not found or not authorized" });
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};





// followers management 
export const followers_List = async (req, res) => {
  const self_user_id = req.user?._id;

  try {
    const user_data = await ProfileData.findById(self_user_id).select("followers").populate("followers.user_id","username email profileimage").sort({ createdAt: -1 })
  

return res.json(user_data)
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export const follow_to_user= async(req,res)=>{
const self_user_id = req.user?._id
const user_id = req.params.userId
  try {

    const update_follower = await ProfileData.updateOne({ _id: user_id }, { $addToSet: { followers: { user_id: self_user_id } } })
const update_following = await ProfileData.updateOne({_id:self_user_id},{$addToSet:{following:{user_id:user_id}}})

    if(!update_follower || !update_following){

      return res.json({message:"user not found "})
    }
    

    return res.send("data have been updated")

    
  } catch (error) {
    return res.json(error.message)
  }
}

export const following_list = async(req,res)=>{
  
  const self_id = req.user?._id

  try {
    
    const user_following = await ProfileData.findById(self_id).select("following").populate("following.user_id","username email profileimage").sort({ createdAt: -1 })


    if(!user_following){


      return res.json({message:"not found"}).status(200)
    }

    return res.json(user_following).status(200)
  } catch (error) {
    return res.json(error.message)
  }



}



// Remove a follower
export const remove_follower = async (req, res) => {
  const self_id = req.user?._id;
  const remove_id = req.params?.userId;

  try {
    // 1️⃣ Remove that follower from your followers list
    const updated_data = await ProfileData.updateOne(
      { _id: self_id },
      {
        $pull: {
          followers: { user_id: new mongoose.Types.ObjectId(remove_id) },
        },
      }
    );

    // 2️⃣ Also remove YOU from the other user's following list
    await ProfileData.updateOne(
      { _id: remove_id },
      {
        $pull: {
          following: { user_id: new mongoose.Types.ObjectId(self_id) },
        },
      }
    );

    if (updated_data.modifiedCount === 0) {
      return res.json({ message: "Follower not found or already removed" });
    }

    return res.json({ message: "Follower removed successfully", updated_data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Remove a following
export const remove_following = async (req, res) => {
  const self_id = req.user?._id;
  const remove_id = req.params?.userId;

  try {
    // 1️⃣ Remove that user from your 'following' list
    const updated_data = await ProfileData.updateOne(
      { _id: self_id },
      {
        $pull: {
          following: { user_id: new mongoose.Types.ObjectId(remove_id) },
        },
      }
    );

    // 2️⃣ Also remove YOU from their 'followers' list
    await ProfileData.updateOne(
      { _id: remove_id },
      {
        $pull: {
          followers: { user_id: new mongoose.Types.ObjectId(self_id) },
        },
      }
    );

    if (updated_data.modifiedCount === 0) {
      return res.json({ message: "User not found or already removed from following" });
    }

    return res.json({ message: "Following removed successfully", updated_data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



 export const user_profile =async (req,res)=>{
  
  const self_id = req.user._id
  try {

    const data =await ProfileData.findById(self_id)

    if(!data){
       console.log("user not found")
      return res.json({message:"user not foun  "})
    }


    return res.json(data).status(200)
    
  } catch (error) {
    
    return res.json(err.message)
  }
}

export const update_profile = async (req, res) => {
  try {
    const self_id = req.user?._id; // logged-in user id
    if (!self_id) return res.status(401).json({ error: "Unauthorized" });

    // Body fields
    const { email, username, gender, role, aboute_user } = req.body;

    // Multer se images (single ya multiple)
    const profileImage = req.files?.profileimage ? req.files.profileimage[0].filename: undefined;
    const coverImage = req.files?.cover_image ? req.files.cover_image[0].filename : undefined;

    // Build update object dynamically
    const updateFields = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;
    if (gender) updateFields.gender = gender;
    if (role) updateFields.role = role;
    if (aboute_user) updateFields.aboute_user = aboute_user;
    if (profileImage) updateFields.profileimage = profileImage;
    if (coverImage) updateFields.cover_image = coverImage;

    // MongoDB update
    const updatedProfile = await ProfileData.findByIdAndUpdate(
      self_id,
      { $set: updateFields },
      { new: true } // ye updated document return karega
    );

    if (!updatedProfile) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


// main post like and comments

export const likePost_admin = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id; //

    const post = await PostDB.findById(postId).populate("create_by_id","username email profileimage");
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: "Like updated", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const post = await mainPostDb.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ userId, text });
    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// add comment to the main post 

export const add_main_Comment = async (req, res) => {
  try {
    const  postId  = req.params?.post;
    const { text } = req.body;
    const userId = req.user._id;

    const post = await mainPostDb.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ user_id:userId , user_comment:text });
    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const get_all_post_by_id = async (req, res) => {
  const userId = req.params?.userId;
  console.log("Requested user ID:", userId);

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    // find all posts where post.user_id == userId
    const data = await PostDB.find({ create_by_id: userId }).populate("create_by_id","username profileimage email").sort({ createdAt: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const get_following_posts = async (req, res) => {
  const userId = req.user?._id;
  console.log("✅ Logged-in User ID:", userId);

  try {
    // Step 1: Get current user's following list
    const userProfile = await ProfileData.findById(userId).select("following");
    if (!userProfile) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const followingIds = userProfile.following.map(f => f.user_id.toString());
    console.log("📌 Following IDs:", followingIds);

    // Step 2: Get all posts and filter those created by followed users
    const posts = await PostDB.find()
      .populate("comments.comment_by_id", "username profileimage").populate("create_by_id"," _id username profileimage email")
      .sort({ createdAt: -1 });

    // Step 3: Filter posts where create_by_id._id is in followingIds
    const filteredPosts = posts.filter(post =>
      followingIds.includes(post.create_by_id?._id.toString())
    );

    console.log("post",filteredPosts)

    if (filteredPosts.length === 0) {
      return res.json({ message: "Nothing to show" });
    }

    return res.json(filteredPosts);
  } catch (err) {
    console.error("🔥 Error in get_following_posts:", err);
    return res.status(500).json({ message: "Server error" });
  }
};




