import { FaUserCircle, FaCalendarAlt, FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { randomImage } from "../profileimage";

export const View_Post = ({ post_data, close }) => {
  console.log(post_data);

  
  if (!post_data) return <p className="text-center text-gray-500">No post data found.</p>;

  return (
    <div className="md:w-1/2 w-[80%] flex flex-col h-full overflow-y-scroll rounded-2xl bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <FaFileAlt className="text-gray-600" /> Report Details
      </h2>

      <div className="border border-gray-200 p-4 rounded-2xl mb-4 hover:shadow-lg transition-all duration-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-2">
          {post_data.create_by_id?.profileimage ? (
            <img
              src={ post_data.create_by_id.profileimage && post_data.create_by_id.profileimage.trim() !== ""?`https://unity-for-change-ggbn.onrender.com/uploads/${post_data.create_by_id.profileimage}`:randomImage}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-400 text-4xl" />
          )}
          <div>
            <p className="font-semibold text-gray-800">
              {post_data.create_by_id?.username || "Unknown User"}
            </p>
            <p className="text-sm text-gray-500">{post_data.create_by_id?.email}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 mb-2 text-gray-700">
          <MdOutlineDescription className="text-gray-500 text-lg mt-1" />
          <p>{post_data.description}</p>
        </div>

        {/* Reported Post */}
      {post_data.Images.map((media, index) => {
  const isVideo = media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg');

  return isVideo ? (
    <video
      key={index}
      src={`https://unity-for-change-ggbn.onrender.com${media}`}
      controls
      className="w-full bg-gray-200 h-70 col-span-1 row-span-1 rounded-xl object-contain"
    />
  ) : (
    <img
      key={index}
      src={`https://unity-for-change-ggbn.onrender.com${media}`}
      alt="Reported Post"
      className="w-full bg-gray-200 h-70 col-span-1 row-span-1 rounded-xl object-contain"
    />
  );
})}


        {/* Date and Delete */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
    

          <button
            onClick={close}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer "
          >
            <MdCancel /> close
          </button>
        </div>
      </div>
    </div>
  );
};
