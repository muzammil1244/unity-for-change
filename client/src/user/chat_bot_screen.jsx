import { IoMdArrowRoundBack } from "react-icons/io";
import { HiArrowCircleUp } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { useState } from "react";

export const Chat_Bot_Screen = ({ Inactive_chat_screen }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  // typing effect
  const showTypingEffect = async (text) => {
          setMessage("")

    setResponse("");
    for (let i = 0; i < text.length; i++) {
      await new Promise((r) => setTimeout(r, 25)); 
      setResponse((prev) => prev + text[i]);
    }
  };

  const handleAskAI = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("")
    try {
    
    const data = await fetch("http://localhost:8000/api/Ai",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",

      },
body: JSON.stringify({ message: message })

    })

    const final_data = await data.json()
    console.log("AI " , final_data)
showTypingEffect(final_data.reply || "No response")

    } catch (e) {
      setResponse(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-center relative py-3">
        <IoMdArrowRoundBack
          onClick={Inactive_chat_screen}
          className="absolute left-2 cursor-pointer hover:scale-110"
        />
        <h1 className="flex items-center gap-2 font-bold text-lg">
          <BsStars /> Ask Anything to AI
        </h1>
      </div>

      {/* Input */}
      <div className="flex items-center border rounded-2xl px-3 py-2 shadow-sm">
        <input
          className="flex-1 outline-none"
          placeholder="Ask Anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
        />
        <HiArrowCircleUp
          onClick={handleAskAI}
          size={25}
          className="cursor-pointer hover:scale-110"
        />
      </div>

      {/* Response */}
      <div className="mt-4 p-3 bg-gray-100 rounded whitespace-pre-wrap min-h-[80px]">
        {loading && !response ? (
          <span>Thinking...</span>
        ) : (
          <span className="relative">
            <strong>AI:</strong> {response}
            {/* Blinking cursor */}
            <span className="ml-1 animate-pulse">|</span>
          </span>
        )}
      </div>
    </div>
  );
};
