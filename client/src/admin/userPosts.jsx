import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { randomImage } from "../profileimage";
import { API } from "../../domain";

export const PostList = () => {
  const [posts, setPosts] = useState([]); // API data
  const [search, setSearch] = useState("");
  const [menuIndex, setMenuIndex] = useState(null);

  // 🔹 Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API}/api/client/all/news`);
        const data = await res.json();
        setPosts(data); // API se aaya hua post data
      } catch (err) {
        console.error("❌ Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  console.log("pst data",posts)
  // 🔹 Search filter
  const filteredPosts = posts.filter(
    (post) =>
      post.username?.toLowerCase().includes(search.toLowerCase()) ||
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.message?.toLowerCase().includes(search.toLowerCase()) ||
      post.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Delete Post (API call)
  const handleDelete = async (post) => {
    if (!window.confirm(`Are you sure to delete "${post.title}"?`)) return;

    try {
      const res = await fetch(
        `${API}/api/admin/${post._id}/delete`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      alert(data.message);

      // Local state se remove
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (err) {
      console.error("❌ Error deleting post:", err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-3">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 mb-4 shadow-sm">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Post List */}
      <div className="flex flex-col gap-4 overflow-y-auto scrollbar-hide">
        {filteredPosts.map((post, index) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 relative"
          >
            {/* User info */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    post.create_by_id.profileimage && post.create_by_id.profileimage.trim() !== ""
                      ? post.create_by_id.profileimage:randomImage
                  }
                  alt={post.username}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <h3 className="font-medium text-sm">{post.create_by_id.username}</h3>
                  <p className="text-xs text-gray-500">{post.create_by_id.email}</p>
                </div>
              </div>

              {/* Menu Icon */}
              <div className="relative">
                <CiMenuKebab
                  className="cursor-pointer text-gray-600"
                  size={20}
                  onClick={() =>
                    setMenuIndex(menuIndex === index ? null : index)
                  }
                />

                {/* Dropdown menu */}
                {menuIndex === index && (
                  <div className="absolute right-0 top-6 bg-white border rounded shadow-lg w-32 z-10">
                    <button
                      onClick={() => handleDelete(post)}
                      className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600"
                    >
                      Delete Post
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Post content */}
            <div>
              <h2 className="font-bold break-words text-lg">{post.title}</h2>
              <p className="text-sm break-words text-gray-700">{post.description}</p>
            </div>

            {/* Images */}
          <div className="w-full space-y-1">
  {/* === 1 IMAGE / VIDEO === */}
  {post.Images?.length === 1 && (
    post.Images.map((file, i) => {
      const fileUrl = file;
      const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);

      return isVideo ? (
        <video
          key={i}
          controls
          className="w-full h-72 sm:h-80 md:h-96 object-cover rounded-2xl bg-black"
        >
          <source src={fileUrl} type="video/mp4" />
        </video>
      ) : (
        <img
          key={i}
          src={fileUrl}
          alt="post-img"
          className="w-full h-72 sm:h-80 md:h-96 object-cover hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
        />
      );
    })
  )}

  {/* === 2 IMAGES / VIDEOS === */}
  {post.Images?.length === 2 && (
    <div className="grid grid-cols-2 gap-1">
      {post.Images.map((file, i) => {
        const fileUrl = file;
        const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);

        return (
          <div key={i} className="w-full overflow-hidden rounded-xl">
            {isVideo ? (
              <video
                controls
                className="w-full h-60 sm:h-72 object-cover rounded-xl bg-black"
              >
                <source src={fileUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={fileUrl}
                alt={`post-img-${i}`}
                className="w-full h-60 sm:h-72 object-cover hover:scale-[1.03] transition-transform duration-300 rounded-xl"
              />
            )}
          </div>
        );
      })}
    </div>
  )}

  {/* === 3 IMAGES / VIDEOS === */}
  {post.Images?.length === 3 && (
    <div className="grid grid-cols-2 gap-1">
      {post.Images.map((file, i) => {
        const fileUrl = file;
        const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);
        const isLast = i === 2;

        return (
          <div
            key={i}
            className={`${isLast ? "col-span-2" : ""} overflow-hidden rounded-xl`}
          >
            {isVideo ? (
              <video
                controls
                className={`w-full ${
                  isLast ? "h-60 sm:h-72 md:h-80" : "h-40 sm:h-48 md:h-56"
                } object-cover rounded-xl bg-black`}
              >
                <source src={fileUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={fileUrl}
                alt={`post-img-${i}`}
                className={`w-full ${
                  isLast ? "h-60 sm:h-72 md:h-80" : "h-40 sm:h-48 md:h-56"
                } object-cover hover:scale-[1.03] transition-transform duration-300 rounded-xl`}
              />
            )}
          </div>
        );
      })}
    </div>
  )}
</div>

          </div>
        ))}
      </div>
    </div>
  );
};
