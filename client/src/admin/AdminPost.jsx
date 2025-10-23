import { useState, useEffect } from "react";
import { FaBullseye, FaRegHeart } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { CiMenuKebab } from "react-icons/ci";
import { FaGlobe } from "react-icons/fa";

export const Admin_Post = ({ active_update, post_id }) => {
  const [posts, setPosts] = useState([]);
  const [currentindex, setcurrentindex] = useState(null);
  const [active_comment, set_active_comment] = useState(false);
  const [menuIndex, setMenuIndex] = useState(null);
const [ comment_index,set_comment_index] = useState(null)
  useEffect(() => {
    fetch("https://unity-for-change-ggbn.onrender.com/api/admin/get_post")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handleUpdate = (post) => {
    active_update(true);
    post_id(post);
  };

  const handleDelete = async (post) => {
    try {
      const res = await fetch(
        `https://unity-for-change-ggbn.onrender.com/api/admin/delete_post/${post._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      alert("✅ Post deleted successfully!");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting post!");
    }
  };

  return (
    <div className="w-full overflow-y-scroll scrollbar-hide h-full relative">
      {posts.map((items, index) => {
        return (
          <div
            key={items._id}
            className="p-4 w-full border shadow-sm mb-6 rounded-lg bg-white/10"
          >
            {/* Post Header */}
            <div
              onMouseEnter={() =>{
                set_comment_index(index)
                setcurrentindex(index)}}
              className="flex gap-5 bg-white/30 backdrop-blur-[5px] px-4 py-3 rounded-2xl justify-between items-center"
            >
              <div className="flex-col gap-1">
                <h1 className="font-bold text-lg">Muzammil</h1>
                <p className="text-gray-500 text-sm">
                  muzammil844641@gmail.com
                </p>
              </div>

              <div>
                <CiMenuKebab
                  className="cursor-pointer"
                  size={22}
                  onClick={() =>
                    setMenuIndex(menuIndex === index ? null : index)
                  }
                />

                {menuIndex === index && (
                  <div className="absolute right-0 mt-2 w-28 overflow-hidden bg-white border shadow rounded-lg z-10">
                    <p
                      onClick={() => handleUpdate(items)}
                      className="px-4 py-2 text-black text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      Update
                    </p>
                    <p
                      onClick={() => handleDelete(items)}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer text-black"
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Post Description */}
            <div className="my-4">
              <h1 className=" font-bold text-gray-600">{items.title}</h1>

            </div>
            <div className="my-4">
              <p>{items.description}</p>
            </div>

            {/* images */}

            <div className="w-full grid grid-cols-1 gap-2">
  {items.images?.map((img, i) => {
    const fileUrl = `https://unity-for-change-ggbn.onrender.com/${img}`;
    const lower = img.toLowerCase();
    const isVideo =
      lower.endsWith(".mp4") ||
      lower.endsWith(".mov") ||
      lower.endsWith(".webm") ||
      lower.endsWith(".avi");

    return (
      <div key={i} className="relative">
        {isVideo ? (
          <video
            controls
            className="w-full h-60 object-cover rounded-lg bg-black"
          >
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={fileUrl}
            alt={`media-${i}`}
            className="w-full h-60 object-cover rounded-lg"
          />
        )}
      </div>
    );
  })}
</div>


            {/* Platforms */}
            {items.platforms && items.platforms.length > 0 && (
              <div className="mt-4 p-3 bg-white/20 rounded-lg">
                <h3 className="font-semibold text-white mb-2 flex gap-3 items-center"><FaGlobe/> Platforms</h3>
                {items.platforms.map((platform, i) => (
                  <div
                    key={i}
                    className="mb-2 p-2 bg-white/10 rounded-md"
                  >
                    <p className="font-bold text-white">{platform.title}</p>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline break-all"
                    >
                      {platform.url}
                    </a>
                    <p className="text-sm text-white/70">
                      {platform.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Likes & Comments */}
            <div className="w-full flex items-center justify-around py-4 border-t border-white/20">
             

              <div className="flex gap-1 items-center">
                <p>{items.comments?.length || 0}</p>
                <LiaCommentsSolid
                onClick={()=>{
                  set_active_comment(!active_comment)
                }}
                  size={25}
                  className=""
                />
              </div>

           
            </div>

            {
             items.comments.length >0 &&  active_comment && comment_index == currentindex && <div className="w-full bg-gray-300 overflow-y-scroll scrollbar-hide rounded-xl h-40 p-3 ">

{items.comments.length > 0 ? items?.comments?.map(item => {

return <div className='flex rounded-xl p-3 shadow flex-col gap-3'>

    <div className='flex gap-5 items-center'>
        <img className='size-5 object-cover rounded' src={`https://unity-for-change-ggbn.onrender.com/uploads/${item.user_id.profileimage}`} alt="" />

        <div className='flexflex-col'>
            <h1 className=' text-sm '>{item.user_id.username}</h1>
            <h1 className=' text-gray-500 text-sm'>{item.user_id.email}</h1>

        </div>
    </div>

    <p className='px-4 text-sm'>{item.user_comment}</p>
</div>



}) : <div className='w-full py-3 flex justify-center'>
<h1>No Comments</h1>
</div>}


              </div>
            }
          </div>
        );
      })}
    </div>
  );
};
