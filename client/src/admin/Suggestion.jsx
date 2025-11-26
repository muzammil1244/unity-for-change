import { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { randomImage } from "../profileimage";
import { API } from "../../domain.js";

export const Suggestion = ({ user_data,activeMessage }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
 const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${API}/api/admin/suggestions`);
      const data = await res.json();

      // Flatten kar do suggestions array
      const flattened = data.flatMap(item => item.suggestion);

      setSuggestions(flattened);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };
  // Fetch suggestions from API
 useEffect(() => {
 

  fetchSuggestions();
}, []);


  const handleView = (item) => {
    console.log("View Data:", item);
    setMenuIndex(null);
  };

 
  const handleDelete = async (suggestionId) => {
  try {
    const res = await fetch(
      `${API}/api/admin/${suggestionId._id}`,
      {
        method: "DELETE",
      }
    );
console.log(suggestionId)
    const data = await res.json();
    alert(data.message);

    // Remove from local state
    fetchSuggestions()
    setSuggestions(suggestions.filter((s) => s._id !== suggestionId));
  } catch (err) {
    console.error(err);
    alert("❌ Error deleting suggestion");
  }
};

  const handleMessage = (item) => {
    console.log("Message:", item);
    user_data(item)
    setMenuIndex(null);
    activeMessage();
  };

  return (
   <div className="w-full h-fit p-5 rounded-2xl">
  <div className="flex flex-col gap-4">
    {suggestions.length === 0 && (
      <p className="text-white text-center">No suggestions found.</p>
    )}

    {suggestions.map((item, index) => (
      <div
        key={item.id}
        className="relative w-full flex items-start justify-between p-4 bg-white/50 backdrop-blur-[5px] rounded-xl border border-white/30 shadow-sm overflow-hidden"
      >
        {/* === LEFT SECTION === */}
        <div className="flex items-start gap-3 w-[85%] sm:w-[88%]">
          <img
            src={
              item.create_by_id.profileimage &&
              item.create_by_id.profileimage.trim() !== ""
                ? item.create_by_id.profileimage
                : randomImage
            }
            alt={item.create_by_id.username}
            className="w-12 h-12 rounded-full border border-white/50 flex-shrink-0 object-cover"
          />

          <div className="flex flex-col w-full min-w-0">
            <h2 className="font-semibold text-gray-900 text-lg truncate sm:whitespace-normal">
              {item.create_by_id.username}
            </h2>
            <p className="text-gray-600 text-sm truncate sm:whitespace-normal">
              {item.create_by_id.email}
            </p>
            <p className="text-gray-800 text-sm mt-1 break-words leading-snug">
              {item.message}
            </p>
          </div>
        </div>

        {/* === MENU ICON === */}
        <div className="relative">
          <CiMenuKebab
            size={22}
            className="cursor-pointer hover:scale-110 transition-transform text-gray-700"
            onClick={() => setMenuIndex(menuIndex === index ? null : index)}
          />

          {/* === DROPDOWN MENU === */}
          {menuIndex === index && (
            <div
              className="absolute bottom-3 right-5 bg-white shadow-xl rounded-lg w-36 flex flex-col z-50 border border-gray-100 overflow-hidden"
              style={{ maxWidth: "200px" }}
            >
              <button
                onClick={() => handleDelete(item)}
                className="px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleMessage(item)}
                className="px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-700"
              >
                Message
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  );
};
