import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

// sample repost data
const repostData = [
  {
    id: 1,
    repostUser: {
      username: "Muzammil",
      email: "muzammil@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    message: "This post spreads wrong information.",
    originalPost: {
      username: "Rahul",
      email: "rahul@example.com",
      profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
      title: "Important Update",
      content: "We are launching a new feature soon!",
      images: [
        "https://picsum.photos/400/200",
        "https://picsum.photos/401/200",
      ],
    },
  },
  {
    id: 2,
    repostUser: {
      username: "Ayesha",
      email: "ayesha@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    message: "Inappropriate language in this post.",
    originalPost: {
      username: "Fatima",
      email: "fatima@example.com",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
      title: "Motivation",
      content: "Never give up on your dreams!",
      images: ["https://picsum.photos/402/200"],
    },
  },
];

export const ReportList = ({activeMessage}) => {
  const [reposts, setReposts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [viewPost, setViewPost] = useState(null);

  const handleDelete = (item) => {

    const data = fetch(`https://unity-for-change-ggbn.onrender.com/api/${item}/admin//news`)



    };


  

  useEffect(async()=>{

    const data = fetch("https://unity-for-change-ggbn.onrender.com/api/admin/reports",{

    })

    const repordata = await data.json()
setReposts(repordata)
  },[])

  console.log("report data",reposts)
  return (
    <div className="w-full h-fit p-5 bg-gray-50 rounded-2xl shadow-md">
      <div className="flex flex-col gap-4">
        {reposts.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-start justify-between p-4 bg-white rounded-xl border shadow-sm relative"
          >
            {/* Left section (user + repost msg) */}
            <div className="flex gap-4">
              <img
                src={`https://unity-for-change-ggbn.onrender.com/uploads/${item.user_id.profileimage}`}
                alt={item.user_id.username}
                className="size-12 rounded-full border"
              />
              <div>
                <h2 className="font-semibold">{item.repostUser.username}</h2>
                <p className="text-sm text-gray-500">{item.repostUser.email}</p>
                <p className="text-sm mt-1 text-red-600">{item.message}</p>

                {/* original post user */}
                <div className="mt-3 flex items-center gap-2 border-t pt-2">
                  <img
                    src={item.originalPost.profileImage}
                    alt={item.originalPost.username}
                    className="size-8 rounded-full border"
                  />
                  <div>
                    <h3 className="text-sm font-medium">
                      {item.originalPost.username}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {item.originalPost.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu button */}
            {/* <div className="relative">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === item.id ? null : item.id)
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiMoreVertical size={20} />
              </button>

              {menuOpen === item.id && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border z-10">
                  <button
                    onClick={() => setViewPost(item.originalPost)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    View Post
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Delete Post
                  </button>
                  <button
                    onClick={() => handleRemoveReport(item)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Remove Report
                  </button>
                  <button
                    onClick={() => {activeMessage() 
                      handleMessage(item)}}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Message
                  </button>
                </div>
              )}
            </div> */}
          </div>
        ))}
      </div>

      {/* Glass effect popup */}
        {viewPost && (
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
          >
            <div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold mb-2">{viewPost.title}</h2>
              <p className="text-gray-700 mb-4">{viewPost.content}</p>

              <div className="grid gap-3">
                {viewPost.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="post"
                    className="w-full rounded-lg"
                  />
                ))}
              </div>

              <button
                onClick={() => setViewPost(null)}
                className="mt-5 w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
