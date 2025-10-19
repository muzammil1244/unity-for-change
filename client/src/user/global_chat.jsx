import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSendOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export const Global_chat = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [socket, setSocket] = useState(null);

  const navigation = useNavigate();
  const location = useLocation();
  const { user_id } = location.state || {}; // group name passed

  console.log("Online Users:", onlineUsers);
  console.log("Messages:", messages);

  useEffect(() => {
    if (!user_id ) return;

    const s = io("http://localhost:8000");
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      s.emit("userOnline", user_id);
    });

    s.on("userlist",(data=>{
      setOnlineUsers(data)
    }))

    s.on("receive-message", (msg) => {
  setMessages((prev) => [...prev, msg]);
    });

    fetchMessages();

    return () => s.disconnect();
  }, [user_id,]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/chat/messages`,
        {method:"GET"}
      );

      setMessages(await res.json());
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() && !file) return;

    let mediaPath = "";

    if (file) {
      const formData = new FormData();
      formData.append("media", file);

      try {
       const res = await fetch("http://localhost:8000/api/chat/upload", {
  method: "POST",
  body: formData
});
       const data = await res.json();
mediaPath = data.filePath;
      } catch (err) {
        console.error("File upload error:", err);
      }
    }

    const msgData = {
    
      sender: user_id,
      message: newMessage,
      media: mediaPath,
    };

    socket.emit("senderMessage", msgData);

    setNewMessage("");
    setFile(null);
  };

  return (
    <div className="w-full h-screen grid grid-cols-4 gap-3 p-4 bg-white text-black">
      {/* Left Sidebar */}
      <div className="col-span-1 border-r bg-white shadow rounded-2xl border-gray-300 p-3">
        <div className="flex items-center mb-4">
          <IoMdArrowRoundBack
            className="text-xl cursor-pointer"
            onClick={() => navigation(-1)}
          />
          <h2 className="ml-2 font-bold">Online Users</h2>
        </div>
        <div className="space-y-3">
          {onlineUsers.map((user, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg shadow-sm"
            >
              <img
                src={`http://localhost:8000/uploads/${user.profileImage}`}
                alt="profile"
                className="w-10 h-10 rounded-full border border-gray-400"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Box */}
      <div className="col-span-3 flex flex-col overflow-y-scroll h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 overflow-y-scroll bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 max-w-xs rounded-2xl shadow-md ${
                msg.sender._id === user_id
                  ? "bg-black text-white ml-auto"
                  : "bg-white text-black "
              }`}
            >
              <div className="w-fit h-fit">
                <div className={`bg-cover flex gap-2 items-center px-3 py-2 rounded-2xl  ${
                msg.sender._id === user_id
                  ? "bg-gray-900  text-white ml-auto"
                  : "bg-gray-100 border-0 shadow text-black "
              }`}>
                  <img className="size-5 rounded-full" src={`http://localhost:8000/uploads/${msg.sender.profileimage}`} alt="" />
                <h1>{msg.sender.username}</h1>
                </div>

{msg.media && (
  <div className="mt-2">
    {msg.media.endsWith(".mp4") ? (
      <video src={`http://localhost:8000${msg.media}`} width="200" controls />
    ) : msg.media.endsWith(".pdf") ? (
      <a href={`http://localhost:8000${msg.media}`} target="_blank" rel="noreferrer">
        View PDF
      </a>
    ) : msg.media.endsWith(".docx") ? (
      <a href={`http://localhost:8000${msg.media}`} target="_blank" rel="noreferrer">
        View DOCX
      </a>
    ) : (
      <img src={`http://localhost:8000${msg.media}`} width="200" alt="media" />
    )}
  </div>
)}


               {msg.message && <p>{msg.message}</p>}
              </div>
             
             

            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="p-3 border-t border-gray-300 flex items-center bg-white">
          <input
            type="text"
            className="flex-1 p-2 rounded-xl border border-gray-400 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input
            type="file"
            className="ml-2"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-black text-white px-4 py-2 rounded-xl hover:opacity-80 flex items-center"
          >
            <IoSendOutline className="mr-1" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
