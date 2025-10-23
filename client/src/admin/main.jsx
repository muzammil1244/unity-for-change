
import { FaBug, FaBiohazard, FaPlusSquare, FaUser } from 'react-icons/fa';
import { PiPlusCircleLight } from "react-icons/pi";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import bgImage from "../user/images/admin_bg.jpeg";
import { Admin_Post } from './AdminPost';
import  {Suggestion}  from './Suggestion';
import { ReportList } from './ReportList';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { PostList } from './userPosts';
import  { PostForm } from './creat_post';
import { useEffect } from 'react';
import { View_Post } from './view_post';
import { IoAddOutline } from "react-icons/io5";
import { Make_admin } from './make_admin';
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import {jwtDecode} from "jwt-decode";

export const Main=()=>{
const [menuOpen, setMenuOpen] = useState(null);
const [viewPost, setViewPost] = useState(null);
const [search, setSearch] = useState("");
const [active_massage,set_active_massage] = useState(false)
const [messageText, setMessageText] = useState("");
const [messageUser, setMessageUser] = useState(null);
const [active_create_post,set_active_create_post] = useState(false) 
const [selectedPostId, setSelectedPostId] = useState(null);
const [reposts, setReposts] = useState([]);
const [active_update_post,set_active_update_post] = useState(false)
const [usersData, setUsersData] = useState([]);
const [active_view_post,set_active_view_post] = useState(false)
  const [post_data,set_post_data] = useState({})
const [mak_active,set_make_active] = useState(false)
const token = localStorage.getItem("token")
const navigate = useNavigate()
 const filteredUsers = usersData.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
useEffect(()=>{

 const token = localStorage.getItem("token")


if(!token ){
navigate("/")
}

 if(token){
    const decoded = jwtDecode(token);

    if(decoded.role !== "admin"){
navigate("/")
    }
  }

})

 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://unity-for-change-ggbn.onrender.com/api/admin/all/users"); // 👈mhara API route
        const data = await res.json();
        console.log("Users fetched:", data);
        setUsersData(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = async(item) => {
    const data = await fetch(`https://unity-for-change-ggbn.onrender.com/api/admin/${item}/news`,{
      method:"DELETE"  
    
    })

    if(!data) return console.log("data not deleted")

      const deletedData= await data.json()
      return console.log( deletedData)
  };

 const handleRemoveReport = async (id) => {
  try {
    const res = await fetch(`https://unity-for-change-ggbn.onrender.com/api/admin/${id}/message`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data.message);
  } catch (err) {
    console.error("Error deleting report:", err);
  }
};

 const handleMessage = (user) => {

    const normalizedUser = user.create_by_id ? user.create_by_id : user;

  setMessageUser(normalizedUser)
  set_active_massage(true);

};

  const handle_active_update=(data)=>{
    set_active_update_post(data)
  }
  const handle_post_id=(post)=>{
  setSelectedPostId(post)
  }

  const sendMessage = async () => {
  if (!messageText || !messageUser) {
    alert("Please enter a message");
    return;
  }

  try {
    const res = await fetch(
      `https://unity-for-change-ggbn.onrender.com/api/admin/${messageUser._id}/message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      }
    );

    const data = await res.json();
    console.log("Message sent:", data);
    alert("Message sent successfully");
    setMessageText("");
    set_active_massage(false);
  } catch (err) {
    console.log(err);
    alert("Error sending message");
  }
};


const handleView = (items)=>{
set_active_view_post(true)
set_post_data(items)
}


  useEffect(()=>{

    const messageport=async()=>{

const data = await fetch("https://unity-for-change-ggbn.onrender.com/api/admin/reports",{
method:"GET",
headers:{
"Authorization": `Bearer ${token}`
}
    })

    const repordata = await data.json()
console.log(" reportmesages",repordata[0].report) 
setReposts(repordata[0].report)

    }

    messageport()

    

},[])
  
console.log("users ",filteredUsers)
return(
  <div  className="w-full   h-full  " >
<div className='  lg:hidden  w-screen flex flex-col p-1 justify-center items-center  h-screen'>

<h1 className='flex gap-3 items-center'> <IoInformationCircleOutline/> only admin can access at desktop log in with  </h1>

<p>admin@gmail.com</p>
<p>pass:123</p>

</div>
    <div className="w-full hidden lg:block  bg-cover overflow-x-scroll h-full  " 
       >

{/* headers */}
<div  className="w-full px-4 flex justify-between pt-2 items-center h-fit">
<h1 className=" flex gap-3 items-center font-bold text-sm ">Humanity for Change <FaPlusSquare/> </h1>

<div onClick={()=>set_make_active(true)} className='bg-black px-3 hover:bg-gray-900 duration-150 cursor-pointer py-1 rounded-2xl  '>
  <h1 className='text-white text-sm flex items-center justify-center gap-2 '>new admin <IoAddOutline/></h1>
</div>
</div>

{/* containers */}

<div className="grid h-full grid-cols-10 overscroll-x-scroll w-400  grid-rows-4 gap-4 p-4">
{/* admin posts */}

  <div className="bg-black/20 backdrop-blur-[4px] overflow-hidden rounded-2xl shadow  row-start-1 col-start-1 col-span-3 row-span-4 p-4 text-white">
<Admin_Post active_update={handle_active_update} post_id={handle_post_id}/>

<div onClick={()=>set_active_create_post(!active_create_post)} className='absolute top-0 px-1 cursor-pointer  py-1 left-0 flex gap-2 items-center rounded-6xl bg-black/30 backdrop-blur-[2px] text-white'>
<h1 className='text-[10px]'>New</h1> <PiPlusCircleLight />
</div>
  </div>

{/* suggestion */}
  <div className="bg-black/20 relative backdrop-blur-[4px] overflow-y-scroll scrollbar-hide rounded-2xl shadow col-start-4 row-start-1 col-span-3 row-span-2 ">
  
  <Suggestion user_data={handleMessage} activeMessage={()=>set_active_massage(!active_massage)}/>
  <h1 className=' sticky hover:bg-gray-100/20 duration-200 hover:backdrop-blur-[3px] font-bold border text-sm border-white/30 bottom-2 ml-2  bg-white/20 backdrop-blur-[5px] rounded-2xl w-fit py-1 px-2 '>Suggestions</h1>
  
  </div>

    <div className="bg-black/20 backdrop-blur-[4px] overflow-y-scroll scrollbar-hide rounded-2xl shadow col-start-4 row-start-3 row-span-2 col-span-3 p-4">
<div className="w-full h-fit p-5   rounded-2xl ">
      <div className="flex flex-col gap-4">
     { reposts.map((item) => (
        <div
          key={item._id}
          className="w-full relative flex items-start justify-between p-4 bg-white/50 backdrop-blur-[5px] rounded-xl border border-white/30 shadow-sm relative"
        >
          {/* Left section (User and report info) */}
          <div className="flex overflow-hidden gap-4 w-[90%]">
            <img
              src={`https://unity-for-change-ggbn.onrender.com/uploads/${item.user_id.profileimage}`}
              alt={item.user_id.username}
              className="size-12 rounded-full border flex-shrink-0"
            />
            <div className="flex pr-10 flex-col w-full">
              <h2 className="font-semibold">{item.user_id.username}</h2>
              <p className="text-sm text-gray-500">{item.user_id.email}</p>

              {/* Report text with wrapping */}
              <p className="text-sm mt-1 pr-10 text-red-600 break-words overflow-hidden whitespace-pre-wrap">
                {item.report_content}
              </p>

              {/* Original post user */}
              { item.report_by_id != null &&
                <div className="mt-3 flex items-center gap-2 border-t pt-2">
                <img
                  src={`https://unity-for-change-ggbn.onrender.com/uploads/${item.report_by_id.create_by_id.profileimage}`}
                  alt={item.report_by_id.create_by_id.username}
                  className="size-8 rounded-full border"
                />
                <div>
                  <h3 className="text-sm font-medium">
                    {item.report_by_id.create_by_id.username}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {item.report_by_id.create_by_id.email}
                  </p>
                </div>
              </div>
              }
              
            </div>
          </div>

          {/* Menu button */}
          <div className="">
            <button
              onClick={() =>
                setMenuOpen(menuOpen === item._id ? null : item._id)
              }
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiMoreVertical size={20} />
            </button>

            {menuOpen === item._id && (
              <div className="absolute right-10 backdrop-blur-[2px] top-0 z-50 mt-1 w-44 bg-white/50 shadow-lg rounded-xl border border-gray-200  overflow-hidden">
                <button
                  onClick={() => handleView(item.report_by_id)}
                  className="w-full text-sm text-left px-4 py-1 hover:bg-gray-100"
                >
                  View Post
                </button>
                <button
                  onClick={() => handleMessage(item.report_by_id)}
                  className="w-full text-sm text-left px-4 py-1 hover:bg-gray-100"
                >
                  Message
                </button>
                <button
                  onClick={() =>{
console.log("delted post id ",item.report_by_id._id)
                    handleDelete(item.report_by_id._id)
                  } }
                  className="w-full text-sm text-left px-4 py-1 hover:bg-gray-100"
                >
                  Delete post
                </button>
                  <button
                  onClick={() => handleRemoveReport(item._id)}
                  className="w-full text-sm text-left px-4 py-1 hover:bg-gray-100"
                >
                  Delete Message
                </button>
              </div>
            )}
          </div>
        </div>
      ))}


      </div>

   
    </div>   
    
  <h1 className=' sticky hover:bg-gray-100/20 duration-200 hover:backdrop-blur-[3px] font-bold border text-sm border-white/30 bottom-2 ml-2  bg-white/20 backdrop-blur-[5px] rounded-2xl w-fit py-1 px-2 '>User Report</h1>
     
    
    </div>

  <div className="bg-black/20 backdrop-blur-[4px] rounded-2xl shadow col-start-7 row-start-1 col-span-2 row-span-4  p-4">
  
   <div className="w-full h-full flex flex-col">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 mb-3 shadow-sm">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* User List */}
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white/50 backdrop-blur-[5px] rounded-xl shadow-sm p-3"
          >
            {/* left side */}
            <div className="flex items-center gap-3">
              <img
                src={`https://unity-for-change-ggbn.onrender.com/uploads/${user.profileimage}`}
                alt={user.username}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <h3 className="font-medium text-sm">{user.username}</h3>
                <p className="text-xs w-full overflow-x-hidden text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* right side - Message button */}
            <button
              onClick={() =>{
                
                handleMessage(user)
            set_active_massage(true)
            }}
              className=" absolute right-2 px-3 py-1 text-xs rounded-lg bg-black text-white hover:bg-gray-600"
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  
  </div>

  <div className="bg-black/20 backdrop-blur-[4px] rounded-2xl shadow col-start-9 row-start-1 col-span-2 row-span-4  p-4">
  <PostList/>
  </div>

</div>

   {/* Glass effect popup */}
        {viewPost && (
          <div
           
           className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50"
          >
            <div
             
              className="bg-white/70 h-full backdrop-blur-[5px] w-2/3 p-5 h-fit  rounded-2xl  overflow-y-auto"
            >
<FaArrowLeftLong  onClick={() => setViewPost(null)}
 className='hover:scale-110 duration-100 cursor-pointer'/>

              <h2 className="text-xl font-bold mb-2">{viewPost.title}</h2>
              <p className="text-gray-700 mb-4">{viewPost.content}</p>

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

          
            </div>
          </div>
        )}

   {/* Glass messages */}
     {active_massage && (
  <div className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50">
    <div className="bg-white/30 backdrop-blur-lg w-2/3 p-5 rounded-2xl flex flex-col gap-4 h-full max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <FaArrowLeftLong
          onClick={() => set_active_massage(false)}
          className="hover:scale-110 duration-100 cursor-pointer text-xl"
        />
        <h2 className="font-bold text-lg">Messages</h2>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 p-3 bg-white/30 backdrop-blur-md rounded-xl shadow-sm">
       <img
  src={
    messageUser?.profileimage?.startsWith("/uploads")
      ? `https://unity-for-change-ggbn.onrender.com${messageUser.profileimage}`
      : `https://unity-for-change-ggbn.onrender.com/uploads/${messageUser.profileimage}`
  }
  alt={messageUser?.username || "User"}
  className="w-12 h-12 rounded-full border"
/>
        <div>
          <h3 className="font-semibold">{messageUser?.username || "User Name"}</h3>
          <p className="text-sm text-gray-500">{messageUser?.email || "user@example.com"}</p>
        </div>
      </div>

      {/* Message Input */}
      <textarea
        rows={10}
        placeholder="Write message..."
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="bg-white/60 p-5 rounded-2xl"
      />

      {/* Send Button */}
      <div className="flex gap-3 justify-end mt-auto">
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-black/50 text-white rounded-xl hover:bg-black duration-150 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  </div>
)}



 {/* Glass create post  */}
        {active_create_post && (
  <div
   className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50"
  >
  <PostForm close_tab={()=>set_active_create_post(!active_create_post)}/>
   </div>
)}

{/* update post  */}

  {active_update_post && (
        <div className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50">
          <PostForm close_tab={()=>set_active_update_post(!active_update_post)} postData={selectedPostId} />
        </div>
      )}


{active_view_post && (
        <div className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50">
       <View_Post  close={()=>set_active_view_post(false)} post_data={post_data}/>
        </div>
      )}




{mak_active && (
        <div className="absolute top-0 flex backdrop-blur-[2px] bg-white/50 items-center justify-center  w-full h-full z-50">
<Make_admin close={()=>set_make_active(false)}/>        </div>
      )}


    </div></div>
    
)

}