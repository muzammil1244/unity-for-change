import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { randomImage } from "../profileimage";
import { API } from "../../domain.js";

export const Liked_post = () => {
const [ likes,setLikes] = useState([])
console.log(likes,"liekd post ")
const token = localStorage.getItem("token")
    const handle_likes_post = async () => {
    try {
      const res = await fetch(`${API}/api/client/all/likes`, {
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
      const res = await fetch(`${API}/api/client/${postId}/unlike`, {
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
        handle_likes_post()
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
<div className="p-1 w-full">
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
                                                    src={items.create_by_id.profileimage && items.create_by_id.profileimage.trim() !== "" ?items.create_by_id.profileimage:randomImage}
                                                    alt="profile"
                                                />
                                                <div className="flex flex-col">
                                                    <h1 className="text-sm font-bold break-words text-gray-900">{items.create_by_id?.username}</h1>
                                                    <p className="text-xs break-words text-gray-500">{items.create_by_id?.email}</p>
                                                </div>
                                            </div>
                                            {/* Menu Button */}
                                           
                                        </div>
                                        {/* title */}
                                        <div className="px-3 my-2 ">
                                            <h1 className=" break-words font-bold text-sm">{items.title}</h1>
                                        </div>
    
                                        {/* Description */}
    
                                        <div className="px-3 pb-2">
                                            <p className="text-gray-800 break-words text-sm">{items.description}</p>
                                        </div>
    
                                        {/* Images Section */}
                                                                                          <div className="w-full">
  {items.Images.length === 1 && (
    items.Images.map((file, i) => {
      const fileUrl = file; // ✅ Cloudinary URL direct use
      const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);

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
                  onClick={()=>set_active_zoom({active:true,url:fileUrl})}

          alt="items-img"
          className="w-full [&>div]:bg-gray-200 h-72 object-contain"
        />
      );
    })
  )}

  {items.Images.length === 2 && (
    <div className="grid [&>div]:bg-gray-200 grid-cols-2 gap-1">
      {items.Images.map((file, i) => {
        const fileUrl = file;
        const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);

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
                    onClick={()=>set_active_zoom({active:true,url:fileUrl})}

            alt={`items-img-${i}`}
            className="w-full h-60 object-contain rounded-md"
          />
        );
      })}
    </div>
  )}

  {items.Images.length === 3 && (
    <div className="grid [&>div]:bg-gray-200 grid-cols-2 gap-1">
      {items.Images.map((file, i) => {
        const fileUrl = file;
        const isVideo = fileUrl.match(/\.(mp4|mov|webm)$/i);

        return (
          <div key={i} className={`${i === 2 ? "col-span-2" : ""}`}>
            {isVideo ? (
              <video
                controls
                className={`w-full transition-all duration-500 ease-in-out object-contain ${i === 2 ? "h-60" : "h-40"}  rounded-md bg-black`}
              >
                <source src={fileUrl} type="video/mp4" />
              </video>
            ) : (
              <img
                src={fileUrl}
                        onClick={()=>set_active_zoom({active:true,url:fileUrl})}

                alt={`post-img-${i}`}
                className={`w-full transition-all duration-500 ease-in-out object-contain ${i === 2 ? "h-60" : "h-40"} rounded-md`}
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