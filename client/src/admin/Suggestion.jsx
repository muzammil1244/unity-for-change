import { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";

export const Suggestion = ({ user_data,activeMessage }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);

  // Fetch suggestions from API
 useEffect(() => {
  const fetchSuggestions = async () => {
    try {
      const res = await fetch("https://unity-for-change-ggbn.onrender.com/api/admin/suggestions");
      const data = await res.json();

      // Flatten kar do suggestions array
      const flattened = data.flatMap(item => item.suggestion);

      setSuggestions(flattened);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  fetchSuggestions();
}, []);


  const handleView = (item) => {
    console.log("View Data:", item);
    setMenuIndex(null);
  };

 
  const handleDelete = async (suggestionId) => {
  try {
    const res = await fetch(
      `https://unity-for-change-ggbn.onrender.com/api/admin/${suggestionId._id}`,
      {
        method: "DELETE",
      }
    );
console.log(suggestionId)
    const data = await res.json();
    alert(data.message);

    // Remove from local state
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
          <p className="text-white">No suggestions found.</p>
        )}
        {suggestions.map((item, index) => (
          <div
            key={item.id}
            className="relative w-full flex items-center justify-between p-4 bg-white/50 backdrop-blur-[5px] rounded-xl border border-white/30 shadow-sm overflow-visible"
          >
            {/* Left section */}
            <div key={item._id} className="...">
    <div className="flex items-center gap-4">
      <img
        src={`https://unity-for-change-ggbn.onrender.com/uploads/${item.create_by_id.profileimage}`}
        alt={item.create_by_id.username}
        className="w-12 h-12 rounded-full border"
      />
      <div>
        <h2 className="font-semibold text-lg">{item.create_by_id.username}</h2>
        <p className="text-gray-500 text-sm">{item.create_by_id.email}</p>
        <p className="text-gray-700 text-sm mt-1">{item.message}</p>
      </div>
    </div>
  </div>

            {/* Menu section */}
            <div>
              <CiMenuKebab
                size={22}
                className="cursor-pointer hover:scale-110"
                onClick={() =>
                  setMenuIndex(menuIndex === index ? null : index)
                }
              />

              {/* Dropdown menu */}
              {menuIndex === index && (
                <div className="absolute right-10 top-[0px] bg-white shadow-lg rounded-lg w-36 flex flex-col z-50">
                 
                  <p
                    onClick={() => handleDelete(item)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Delete
                  </p>
                  <p
                    onClick={() => handleMessage(item)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Message
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
