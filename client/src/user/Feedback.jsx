import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { API } from "../../domain";

export const Feedback = ({is_active}) => {
  const [suggestion, setSuggestion] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!suggestion.trim()) {
      setMessage("Please enter your feedback first!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/api/client/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`, // 👈 agar token use karte ho
        },
        body: JSON.stringify({ suggestion }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Thank you! Your feedback has been submitted.");
        setSuggestion("");
        is_active()
                window.location.reload()

      } else {
        setMessage(`⚠️ ${data.message || "Something went wrong!"}`);
      }
    } catch (err) {
      setMessage("❌ Internal server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex relative md:w-1/2 w-[100%] justify-center flex-col items-center min-h-screen bg-gradient-to-br bg-transparent p-4">
     <MdOutlineCancel onClick={is_active} className=" absolute top-8 left-4 size-5 text-white  cursor-pointer"/>
     
     <h1 className="text-gray-500 font-bold ">We Value Your <span className="text-gray-700">Feedback</span>  </h1>   
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <p className="text-gray-600 text-center mb-6">
          Share your thoughts or suggestions to help us improve.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Write your suggestion here..."
            className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 cursor-pointer text-white font-semibold rounded-lg transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {loading?<div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin"></div>
    </div>:<span>submit</span>}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};
