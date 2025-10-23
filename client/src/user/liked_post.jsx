import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { randomImage } from "../profileimage";

export const Liked_post = () => {
const [ likes,setLikes] = useState([])
console.log(likes,"liekd post ")
const token = localStorage.getItem("token")
    const handle_likes_post = async () => {
    try {
      const res = await fetch("https://unity-for-change-ggbn.onrender.com/api/client/all/likes", {
        method: "GET",
        headers: {
         "Authorization":`Bearer ${token}`
        },
       
      });

      const data = await res.json();

      // Agar backend updated likes return karta hai
      if (!data) {

console.log("data not founded")

    } 
    setLikes(data)
    return console.log(data)
    
    } catch (error) {
      console.error("Like API Error:", error);
    } finally {
    }
  };

 const handle_unlike_post = async (postId) => {
    try {
      const res = await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/${postId}/unlike`, {
        method: "PATCH",   // <-- PATCH request
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (res.ok) {
        // UI se turant hatao
        setLikes(prev => prev.filter(item => item._id !== postId));
      }

      console.log("Unlike Response:", data);
    } catch (error) {
      console.error("Unlike API Error:", error);
    }
  };



  useEffect(()=>{

handle_likes_post()

  },[])

    

  return (
<div>
      {
                            likes.map((items, index) => {
    
                                return (
                                    <div
                                        key={index}
                                        className="  h-fit grid-cols-1 flex flex-col w-full   shadow-md rounded-2xl border border-gray-200 mb-5"
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-center p-3">
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    src={items.create_by_id.profileimage && items.create_by_id.profileimage.trim() !== "" ?`https://unity-for-change-ggbn.onrender.com/uploads/${items.create_by_id.profileimage}`:randomImage}
                                                    alt="profile"
                                                />
                                                <div className="flex flex-col">
                                                    <h1 className="text-sm font-bold text-gray-900">{items.create_by_id?.username}</h1>
                                                    <p className="text-xs text-gray-500">{items.create_by_id?.email}</p>
                                                </div>
                                            </div>
                                            {/* Menu Button */}
                                           
                                        </div>
                                        {/* title */}
                                        <div className="px-3 my-2 ">
                                            <h1 className=" font-bold text-sm">{items.title}</h1>
                                        </div>
    
                                        {/* Description */}
    
                                        <div className="px-3 pb-2">
                                            <p className="text-gray-800 text-sm">{items.description}</p>
                                        </div>
    
                                        {/* Images Section */}
                                          <div className="w-full">
                                                                {items.Images.length === 1 && (
                                                                    items.Images.map((file, i) => {
                                                                        const fileUrl = `https://unity-for-change-ggbn.onrender.com${file}`;
                                                                        const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".webm");

                                                                        return isVideo ? (
                                                                            <video
                                                                                key={i}
                                                                                controls
                                                                                className="w-full h-72 object-cover rounded-md bg-black"
                                                                            >
                                                                                <source src={fileUrl} type="video/mp4" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        ) : (
                                                                            <img
                                                                                key={i}
                                                                                src={fileUrl}
                                                                                alt="post-img"
                                                                                className="w-full h-72 object-cover hover:object-contain"
                                                                            />
                                                                        );
                                                                    })
                                                                )}

                                                                {items.Images.length === 2 && (
                                                                    <div className="grid grid-cols-2 gap-1">
                                                                        {items.Images.map((file, i) => {
                                                                            const fileUrl = `https://unity-for-change-ggbn.onrender.com${file}`;
                                                                            const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".webm");

                                                                            return isVideo ? (
                                                                                <video
                                                                                    key={i}
                                                                                    controls
                                                                                    className="w-full h-60 object-cover rounded-md bg-black"
                                                                                >
                                                                                    <source src={fileUrl} type="video/mp4" />
                                                                                </video>
                                                                            ) : (
                                                                                <img
                                                                                    key={i}
                                                                                    src={fileUrl}
                                                                                    alt={`post-img-${i}`}
                                                                                    className="w-full h-60 hover:object-contain object-cover rounded-md"
                                                                                />
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}

                                                                {items.Images.length === 3 && (
                                                                    <div className="grid grid-cols-2 gap-1">
                                                                        {items.Images.map((file, i) => {
                                                                            const fileUrl = `https://unity-for-change-ggbn.onrender.com${file}`;
                                                                            const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".webm");

                                                                            return (
                                                                                <div
                                                                                    key={i}
                                                                                    className={`${i === 2 ? "col-span-2" : ""}`}
                                                                                >
                                                                                    {isVideo ? (
                                                                                        <video
                                                                                            controls
                                                                                            className="w-full transition-all duration-500 ease-in-out hover:object-contain h-40 object-cover rounded-md bg-black"
                                                                                        >
                                                                                            <source src={fileUrl} type="video/mp4" />
                                                                                        </video>
                                                                                    ) : (
                                                                                        <img
                                                                                            src={fileUrl}
                                                                                            alt={`post-img-${i}`}
                                                                                            className={`w-full transition-all duration-500 ease-in-out hover:object-contain ${i === 2 ? "h-60" : "h-40"} object-cover rounded-md`}
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>
    
                                        {/* Footer (Like & Comment) */}
                                        <div className="flex-col justify-between  items-center px-3 py-2 border-t border-gray-200">
                                            <div className='flex justify-between py-3'><div className="flex gap-2 items-center cursor-pointer hover:text-red-500">
  
       <FcLike               onClick={() => handle_unlike_post(items._id)}
  />
      
    
      <span className="text-sm text-gray-600">
        {items.likes.length}
      </span>
    </div>

                                               
    
                                            </div>
    
                                     
    
    
    
                                        </div>
    
    
                                    </div>
                                );
                            })
                        }
</div>
  )
};