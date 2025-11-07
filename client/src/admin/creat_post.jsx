import React, { useState, useEffect } from "react";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaArrowLeftLong  } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

import { FaMinusCircle } from "react-icons/fa";

import { BiImageAdd } from "react-icons/bi";
import { API } from "../../domain.js";

export const PostForm = ({ postData, close_tab }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // Stores File objects
  const [previewUrls, setPreviewUrls] = useState([]); // Stores local preview URLs
  const [platforms, setPlatforms] = useState([{ url: "", title: "", description: "" }]);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setDescription(postData.description || "");
      setPlatforms(postData.platforms || [{ url: "", title: "", description: "" }]);
      setImages([]);
      setPreviewUrls(postData.images || []); // if existing post already has URLs
    }
  }, [postData]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handlePlatformChange = (index, field, value) => {
    const newPlatforms = [...platforms];
    newPlatforms[index][field] = value;
    setPlatforms(newPlatforms);
  };

  const addPlatform = () => {
    setPlatforms([...platforms, { url: "", title: "", description: "" }]);
  };

  const removePlatform = (index) => {
    const newPlatforms = [...platforms];
    newPlatforms.splice(index, 1);
    setPlatforms(newPlatforms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("platforms", JSON.stringify(platforms));

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const url = postData
        ? `${API}/api/admin/update_post/${postData._id}`
        : `${API}/api/admin/main_post`;

      const method = postData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const data = await res.json();
      alert(`✅ Post ${postData ? "updated" : "created"} successfully!`);
      close_tab();
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting post!");
    }
  };

  return (
    <div className="bg-black/50 h-screen overflow-y-scroll backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-2xl border border-white/20 mx-auto relative">
      <h2 className="text-2xl font-bold flex justify-center gap-3 text-white mb-6">
        <BsFileEarmarkPost /> {postData ? "Update Post" : "Create New Post"}
      </h2>

      <FaArrowLeftLong
        onClick={close_tab}
        className="absolute top-5 left-3 hover:scale-110 duration-100 cursor-pointer text-xl text-white"
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400"
          rows="3"
          required
        />

        {/* Image/Video Upload */}
        <div>
          <label htmlFor="imgs" className="flex items-center gap-2 text-white cursor-pointer">
            <BiImageAdd className="size-5" /> Add Images/Videos
          </label>
          <input
            type="file"
            multiple
            id="imgs"
            accept="image/*,video/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Preview Section */}
          {previewUrls.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {previewUrls.map((url, i) => {
                const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
                return isVideo ? (
                  <video
                    key={i}
                    src={url}
                    controls
                    className="w-full h-28 rounded-lg object-cover border border-white/30 bg-black"
                  />
                ) : (
                  <img
                    key={i}
                    src={url}
                    alt="preview"
                    className="w-full h-28 rounded-lg object-cover border border-white/30"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-3 text-white">
            <FaGlobe /> Platforms
          </h3>

          {platforms.map((p, index) => (
            <div key={index} className="space-y-2 p-3 bg-white/10 rounded-xl relative">
              <input
                type="text"
                placeholder="Platform URL"
                value={p.url}
                onChange={(e) => handlePlatformChange(index, "url", e.target.value)}
                className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70"
              />
              <input
                type="text"
                placeholder="Platform Title"
                value={p.title}
                onChange={(e) => handlePlatformChange(index, "title", e.target.value)}
                className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70"
              />
              <input
                type="text"
                placeholder="Platform Description"
                value={p.description}
                onChange={(e) => handlePlatformChange(index, "description", e.target.value)}
                className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70"
              />

              {/* Remove Button */}
              {platforms.length > 1 && (
                <FaMinusCircle
                  onClick={() => removePlatform(index)}
                  className="absolute top-3 right-3 text-gray-300 cursor-pointer hover:scale-110"
                  size={20}
                />
              )}
            </div>
          ))}

          {/* Add Platform Button */}
          <button
            type="button"
            onClick={addPlatform}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <FaPlusCircle /> Add Platform
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gray-500 hover:bg-gray-600 cursor-pointer text-white py-3 rounded-xl transition"
        >
          {postData ? "🚀 Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
