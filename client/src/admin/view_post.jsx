import { FaUserCircle, FaCalendarAlt, FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { randomImage } from "../profileimage";

export const View_Post = ({ post_data, close }) => {
  console.log(post_data);

  
  if (!post_data) return <p className="text-center text-gray-500">No post data found.</p>;

  return (
    <div className="md:w-1/2 w-[90%] flex flex-col h-full overflow-y-auto rounded-2xl bg-white shadow-md p-4">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <FaFileAlt className="text-gray-600" /> Report Details
      </h2>

      {/* Card */}
      <div className="border border-gray-200 p-4 rounded-2xl mb-4 hover:shadow-lg transition-all duration-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          {post_data.create_by_id?.profileimage &&
          post_data.create_by_id?.profileimage.trim() !== "" ? (
            <img
              src={post_data.create_by_id.profileimage?post_data.create_by_id.profileimage:randomImage}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-4xl" />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">
              {post_data.create_by_id?.username || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {post_data.create_by_id?.email}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col items-start gap-2 mb-3 text-gray-700">
                              <p className="break-words text-black">{post_data.title}</p>

          <div className=" flex gap-4">
               <MdOutlineDescription className="text-gray-500 text-lg mt-1" />
                         <p className="break-words">{post_data.description}</p>

          </div>
       

        </div>

        {/* Reported Media (Images/Videos) */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {post_data.Images?.length > 0 ? (
            post_data.Images.map((media, index) => {
              const fullUrl = media.startsWith("http")
                ? media
                : `http://localhost:8000${media}`;
              const isVideo = /\.(mp4|webm|ogg)$/i.test(fullUrl);

              return isVideo ? (
                <video
                  key={index}
                  src={fullUrl}
                  controls
                  className="w-full max-h-[400px] bg-gray-100 rounded-xl object-contain"
                />
              ) : (
                <img
                  key={index}
                  src={fullUrl}
                  alt="Reported Post"
                  className="w-full max-h-[400px] bg-gray-100 rounded-xl object-contain"
                />
              );
            })
          ) : (
            <p className="text-sm text-gray-500 italic">No media available</p>
          )}
        </div>

        {/* Footer (Close Button) */}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={close}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            <MdCancel className="text-lg" /> Close
          </button>
        </div>
      </div>
    </div>
  );
};
