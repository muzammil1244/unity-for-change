import React, { useState, useEffect } from "react";
import { FaRegImage } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { API } from "../../domain.js";

export const PostForm = ({ mode = "create", postToUpdate = null, onSuccess }) => {
  const [postdata, setPostdata] = useState({
    title: "",
    description: "",
    comment: "",
    image: [],

  });
  const [showEmoji, setShowEmoji] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (mode === "update" && postToUpdate) {
      setPostdata({
        description: postToUpdate.description || "",
        comment: "",
        title: postToUpdate.title || "",
        image: postToUpdate.Images
          ? postToUpdate.Images.map((img) => ({
            preview: img,
            existing: true, 
            path: img,        
          }))
          : [],
      });
    }
  }, [mode, postToUpdate]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setPostdata((prev) => ({
        ...prev,
        image: [...prev.image, ...newImages],
      }));
    } else {
      setPostdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEmojiClick = (emoji) => {
    setPostdata((prev) => ({
      ...prev,
      posttext: prev.posttext + emoji.emoji,
    }));
  };

  const Postdata = async () => {
    try {
      const formData = new FormData()
      formData.append("title", postdata.title);
      formData.append("description", postdata.description);
    formData.append("comments", postdata.comment); // yeh missing tha ✅

      postdata.image.forEach((imgObj) => {
        if (imgObj.existing) {
          formData.append("existingImages", imgObj.path);
        }
      });


      postdata.image.forEach((imgObj) => {
        if (imgObj.file) {
          formData.append("file", imgObj.file);
        }
      });

      let url = `${API}/api/client/news`;
      let method = "POST";

      if (mode === "update" && postToUpdate) {
        url = `${API}/api/client/${postToUpdate._id}/updatenews`;
        method = "PATCH";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,

        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Success:", data);
        if (onSuccess) onSuccess(); // callback to refresh UI
        window.location.reload()
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Post Error:", error);
    }
  };

  return (
    <div className="md:w-1/2 w-[70%] bg-white rounded-2xl md:h-fit overflow-y-scroll max-h-full h-fit scrollbar-hide   shadow-md px-5 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex gap-3 items-center">
        
        <h1 className="font-semibold text-gray-700">
          {mode === "create" ? "Create Post" : "Update Post"}
        </h1>
      </div>

      {/* Text Area */}
      <div className="relative w-full">
        <input
          type="text"
          name="title"
          value={postdata.title}
          onChange={handleChange}
          placeholder="title"
          className="w-full px-3 mb-1 py-2 border border-gray-300 outline-blue-400 rounded-t-xl"
        />
        <textarea
          onChange={handleChange}
          maxLength={300}
          value={postdata.description}

          name="description"
          placeholder="What's happening?"
          className="w-full py-3 px-3 border border-gray-300  outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows={4}
        />
        <p className="absolute bottom-2 right-3 text-gray-500 text-xs">
          {postdata.description.length}/300
        </p>

        {/* Comment */}
        <div>
          <input
            type="text"
            name="comment"
            onChange={handleChange}
            placeholder="Comment"
            className="w-full px-3 py-2 border border-gray-300 outline-blue-400 rounded-b-xl"
          />
        </div>

        {/* Images Preview */}
        {postdata.image.length > 0 && (
  <div
    className={`grid gap-2 
      ${
        postdata.image.length === 1
          ? "grid-cols-1"
          : postdata.image.length === 2
          ? "grid-cols-1 md:grid-cols-2"
          : "grid-cols-1 md:grid-cols-3"
      }`}
  >
    {postdata.image.map((img, i) => (
      <div key={i} className="relative">
        <img
          src={img.preview}
          alt={`preview-${i}`}
          className="w-full h-40 object-cover rounded-lg"
        />
        {/* Remove Image Button */}
        <button
          type="button"
          onClick={() =>
            setPostdata((prev) => ({
              ...prev,
              image: prev.image.filter((_, index) => index !== i),
            }))
          }
          className="absolute cursor-pointer top-2 right-2 bg-gray-500/30 hover:scale-110 text-white rounded-full p-1"
        >
          <IoRemoveCircleOutline />
        </button>
      </div>
    ))}
  </div>
)}

      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          {/* Image Upload */}
          <label htmlFor="image">
            <FaRegImage
              className="text-gray-600 cursor-pointer hover:text-gray-500"
              size={20}
            />
          </label>
          <input
            className="hidden"
            id="image"
            type="file"
            name="image"
            max={3}
            multiple
            onChange={handleChange}
          />

        
        </div>

        {/* Post Button */}
        <button
          onClick={Postdata}
          className="bg-black cursor-pointer text-white px-4 py-1 rounded-full disabled:opacity-40 hover:bg-gray-600 transition"
        >
          {mode === "create" ? "Post" : "Update"}
        </button>
      </div>
    </div>
  );
};
