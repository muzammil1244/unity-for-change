import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { randomImage } from "../profileimage";
import { API } from "../../domain.js";

// sample repost data


export const ReportList = ({activeMessage}) => {
  const [reposts, setReposts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [viewPost, setViewPost] = useState(null);

  const handleDelete = (item) => {

    const data = fetch(`${API}/api/${item}/admin//news`)

fetchReports()

    };


  console.log("reports ",reposts)
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API}/api/admin/reports`);
      const repordata = await response.json();
      setReposts(repordata);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };
 useEffect(() => {


  fetchReports();
}, []); // Empty dependency array means it runs once on mount


  console.log("report data",reposts)
  return (
       <div className="w-full h-fit p-5 bg-gray-50 rounded-2xl shadow-md">
      <div className="flex flex-col gap-4">
        {reposts.length>0? reposts.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-start justify-between p-4 bg-white rounded-xl border shadow-sm relative overflow-hidden"
          >
            {/* Left section (user + repost msg) */}
            <div className="flex gap-4 w-[90%]">
              <img
                src={
                  item.user_id?.profileimage &&
                  item.user_id?.profileimage.trim() !== ""
                    ? item.user_id.profileimage
                    : randomImage
                }
                alt={item.user_id.username}
                className="size-12 rounded-full border object-cover"
              />
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-800 truncate">
                  {item.repostUser.username}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {item.repostUser.email}
                </p>
                <p className="text-sm mt-1 text-red-600 break-words">
                  {item.message}
                </p>

                {/* Original post user */}
                <div className="mt-3 flex items-center gap-2 border-t pt-2">
                  <img
                    src={item.originalPost.profileImage}
                    alt={item.originalPost.username}
                    className="size-8 rounded-full border object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {item.originalPost.username}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {item.originalPost.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu button */}
            <div className="relative">
              <button
                onClick={() =>
                  setMenuOpen(menuOpen === item.id ? null : item.id)
                }
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiMoreVertical size={20} />
              </button>

              <AnimatePresence>
                {menuOpen === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border z-10 overflow-hidden"
                  >
                    <button
                      onClick={() => setViewPost(item.originalPost)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      View Post
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Delete Post
                    </button>
                    <button
                      onClick={() => handleRemoveReport(item)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Remove Report
                    </button>
                    <button
                      onClick={() => {
                        activeMessage();
                        handleMessage(item);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )):<div className="w-full  flex justify-center items-center "><TEXT title={"nothing to show "}/></div>}
      </div>

      {/* Glass effect popup */}
      <AnimatePresence>
        {viewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800 truncate">
                {viewPost.title}
              </h2>
              <p className="text-gray-700 mb-4 break-words">
                {viewPost.content}
              </p>

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
                className="mt-5 w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

};
