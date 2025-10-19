import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

export const CommentedPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Fetch all commented posts
  const fetchCommentedPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/client/all/comment", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setPosts(data);
      else console.log("Error:", data);
    } catch (error) {
      console.error("Fetch Comments Error:", error);
    }
  };

  // ✅ Delete comment
  const handleDeleteComment = async (commentId, postId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/client/${commentId}/delete/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // UI se comment hatao
              setPosts((prev) => prev.filter((p) => p._id !== postId));

      }

      console.log("Delete Comment Response:", data);
    } catch (error) {
      console.error("Delete Comment Error:", error);
    }
  };

  useEffect(() => {
    fetchCommentedPosts();
  }, []);

  return (
    <div className="p-3">
      {posts.map((post) => (
        <div
          key={post._id}
          className="mb-5 p-3 relative border rounded-xl shadow-sm bg-white"
        >
          {/* Post Title */}
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-700 text-sm">{post.description}</p>

          {/* Images */}
  <div className="w-full">
                                            {post.Images.length === 1 && (
                                                <img
                                                    src={`http://localhost:8000${post.Images[0]}`}
                                                    alt="post-img"
                                                    className="w-full h-72 object-cover"
                                                />
                                            )}
    
                                            {post.Images.length === 2 && (
                                                <div className="grid grid-cols-2 gap-1">
                                                    {post.Images.map((img, i) => (
                                                        <img
                                                            key={i}
                                                            src={`http://localhost:8000${img}`} alt={`post-img-${i}`}
                                                            className="w-full h-60 object-cover"
                                                        />
                                                    ))}
                                                </div>
                                            )}
    
                                            {post.Images.length === 3 && (
                                                <div className="grid grid-cols-2 gap-1">
                                                    <img
                                                        src={`http://localhost:8000${post.Images[0]}`}
                                                        alt="post-img-0"
                                                        className="w-full h-40 object-cover"
                                                    />
                                                    <img
                                                        src={`http://localhost:8000${post.Images[1]}`}
                                                        alt="post-img-1"
                                                        className="w-full h-40 object-cover"
                                                    />
                                                    <img
                                                        src={`http://localhost:8000${post.Images[2]}`}
                                                        alt="post-img-2"
                                                        className="col-span-2 w-full h-60 object-cover"
                                                    />
                                                </div>
                                            )}
    
                                            
                                        </div>

          {/* Comments */}
          <div className="mt-3 border-t pt-2">
            <h3 className="font-semibold text-sm mb-2">Your Comments:</h3>
            {post.comments.map((c) => (
              <div
                key={c._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
              >
                <span className="text-sm text-gray-800">
                  {c.comment_content}
                </span>
                
              </div>
            ))}
          </div>
          <div  className=" absolute right-3 top-3 ">
<MdDeleteOutline size={20} className=" text-gray-600 hover:scale-110 cursor-pointer " onClick={()=>handleDeleteComment(post._id)}/>
          </div>
        </div>
      ))}
    </div>
  );
};
