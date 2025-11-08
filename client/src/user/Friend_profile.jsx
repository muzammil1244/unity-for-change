import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";
import { TbUserMinus } from "react-icons/tb";
import { useEffect, useState } from "react";

import { FcLike } from "react-icons/fc";
import { randomImage } from "../profileimage";
import { Zoom } from "./Zoom_image";
import { API } from "../../domain";

export const Friend_Profile = ({ Profile_data, self_id }) => {
  const token = localStorage.getItem("token");

  // States
  const [profile, setProfile] = useState(Profile_data);
  const [isFollowing, setIsFollowing] = useState(
    Profile_data.followers?.some((f) => f.user_id._id === self_id) || false
  );
  const [loading, setLoading] = useState(false);
  const [active_follower_list, set_active_follower_list] = useState(false);
  const [active_following_list, set_active_following_list] = useState(false);
  const [get_all_post, set_posts_all] = useState([])
  const [active_all_post, set_active_allpost] = useState(true)
  const [active_aboute, set_active_aboute] = useState(false)
const [active_zoom ,set_active_zoom] = useState({active:false,url:""})

  console.log("user posts", profile)
  const handle_All_user_posts = async () => {

    try {

      const data = await fetch(`${API}/api/client/specific_user/${profile._id}`, {
        method: "GET",

      })

      const post_data2 = await data.json()
      console.log("owen posts ", post_data2)
      set_posts_all(post_data2)

    } catch (err) {

      return console.log(err.message)
    }


  }

  useEffect(() => {
    handle_All_user_posts()
  }, [])

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      let url = "";

      if (isFollowing) {
        url = `${API}/api/user/remove_following/${profile._id}`;
        setProfile((prev) => ({
          ...prev,
          followers: prev.followers.filter((f) => f.user_id._id !== self_id),
        }));
      } else {
        url = `${API}/api/user/follow_to/${profile._id}`;
        setProfile((prev) => ({
          ...prev,
          followers: [
            ...prev.followers,
            { user_id: { _id: self_id, username: "You", profileimage: "" } },
          ],
        }));
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to follow/unfollow");

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow/Unfollow error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove follower handler
  const handleRemoveFollower = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API}/api/user/remove_follower/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to remove follower");

      setProfile((prev) => ({
        ...prev,
        followers: prev.followers.filter((f) => f.user_id._id !== userId),
      }));
    } catch (err) {
      console.error("Remove follower error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Unfollow from following list
  const handleUnfollow = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API}/api/user/remove_following/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to unfollow");

      setProfile((prev) => ({
        ...prev,
        following: prev.following.filter((f) => f.user_id._id !== userId),
      }));
    } catch (err) {
      console.error("Unfollow error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  h-full  bg-white overflow-x-hidden overflow-y-scroll">
      {/* Cover Image + Profile */}
      <div className="relative  w-full md:h-1/3 h-25 bg-gray-500">
        <div onClick={() => {
          window.location.reload()
        }} className="size-fit top-2 left-2 absolute p-1 rounded-full bg-white">
          <IoMdArrowRoundBack className="  z-20 cursor-pointer" />

        </div>
        <img
          className="w-full h-full bg-cover"
          src={profile.cover_image && profile.cover_image.trim() !== ""?profile.cover_image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAABwCAMAAAC6s4C9AAAAYFBMVEWgs7e/0tba5efY5ufT5OXB1Nba5emfsragtLWgs7nV4+ahs7fa6OqhsrTa6OnZ6Oimt7rP3eC1xMm6ycysvL+zw8TC0NO2ycmsv7+kuLnH1tqcr7HP3uGwwcW9ztDH2Nq2R52oAAAC7klEQVR4nO3d0XKqMBRGYY7Y7kCIhoIej1r7/m95CNI7k142/8xaM/UB+k2AgG6ahl7lP4Z+t9u9v+/ytevH/u3P7/bb/6pqi0kQQuG8vw4QaucnCLUzP7cthNrFkVUonp0HCLWzE4TSOfPhAKFy3UI49gU/CGuv8z6kkyGEsnWNt4+hhVC3hdDHFkLhuuWKJtwhFC4R3t6OpQtSCOsuEbq/rELhVsLLHkLdfCL8B6FwbvkzG4vbCgir7kn4GA4QqvYkPLEKdUuEjc09hLI9CeOdA6lsT8IwQijbei5swvkIoWrrKmzCBKFs24H0s/TIEML6Mx8hFM9iX3hWAaFCfoRQO7MrhNqZnSEUzyYIxbNPCLXzfoZQPIt5QQjrz5bLmaZv20PmiROECtntfmhz3wiGUKLbeMh+pxvC+rOF8AqheHbmQCqePViF4tkEoXh2yh5HIdQIQvls7t9zMxMglMjmITv1AkKJLEKoXhyyw2cg1Cj2rELxIpcz6gUI1YNQvsC5UD1Ls/Re36CBUCMI5YNQPgjlg1A+COWDUD6ffiQKoXK+/8aCULSQXvvzUhBCjVzMj/CCUCII5XNzfqwshBK5S5sdPQOhRO7EgVQ8O+WnsEEokZvy4ywhlMggVM/OWUEINbpBqN7tCqF4txFC5dK4hMLLYCGsP1sMIRTPCne5IZTI5sJwbggFMiuNyIew6rr04VyY8oIQ1t03YWFnD2HdrYSNK+3sIay7jdDdIVRtI4yFbSGEdbcRlvYUENbdRniCULaN8AGhdhauEMq2vcu38KgJwspbCX3xghTCukuEvniTG8LKex5IJwh1W9+obWcIdVtXYRgh1G09F8YeQt3WA+nnAKF0zor3ZiCsvC49LPzK/54CwupLhK4vfH0Nwtrr1m+vQajdsrGHULofHlNAKJAv3uOGsPa6ZWP/wyKEsPb8lJ2rDqFEFr7KFzMQ1l6I+9z77CHUyC7H7LsnIZQoPI6ZMaQQimR3lVX4H8R/beJRzhocAAAAAElFTkSuQmCC"}
          alt=""
        />
        <div className="absolute md:size-30 size-20 transform -translate-x-1/4 translate-y-1/2 overflow-hidden bottom-0 left-1/6 rounded-full border-white border-2 bg-green-400">
          <img
            className= " h-full w-full bg-cover"
            src={profile.profileimage && profile.profileimage.trim() !== "" ?profile.profileimage:randomImage}
            alt=""
          />
        </div>
      </div>

      {/* User Info + Follow Button */}
      <div className="px-5 w-full border-b pb-5 border-gray-500 h-fit mt-20">
        <div className="flex pb-10 justify-between items-center">
          <div className="flex-col w-full h-full gap-10">
            <h1 className="font-semibold md:text-sm text-[12px] text-gray-700">{profile.username}</h1>
            <p className="text-gray-600 md:text-sm text-[12px]">{profile.email}</p>
          </div>

          {/* Follow / Unfollow */}
          {profile._id !== self_id && (
            <button
              onClick={handleFollowToggle}
              disabled={loading}
              className={`md:px-4 px-2 text-[12px] py-1 rounded-lg md:text-sm font-medium ${isFollowing
                ? "bg-white text-black hover:bg-gray-100 border"
                : "bg-black text-white hover:bg-gray-900"
                }`}
            >
              {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Followers & Following Counts */}
        <div className="w-full flex md:gap-3 gap-1 h-fit">
          <div
            onClick={() => {
              set_active_follower_list(false)
              set_active_following_list(true)
              set_active_allpost(false)
            }}
            className="cursor-pointer"
          >
            <h1 className="md:text-sm text-[12px] flex text-gray-500 items-center gap-1 md:gap-2">
              <HiOutlineUserGroup /> Following{" "}
              <span className="text-sm">{profile.following?.length || 0}</span>
            </h1>
          </div>

          <div
            onClick={() => {
              set_active_follower_list(true)
              set_active_following_list(false)
              set_active_allpost(false)
            }}
            className="cursor-pointer"
          >
            <h1 className="md:text-sm text-[12px] flex text-gray-500 items-center gap-1 md:gap-2">
              <HiOutlineUserGroup /> Followers{" "}
              <span className="text-sm">{profile.followers?.length || 0}</span>
            </h1>
          </div>

          <div
            onClick={() => {
              set_active_following_list(false)
              set_active_follower_list(false)
              set_active_allpost(true)
            }}
            className="cursor-pointer"
          >
            <h1 className="md:text-sm text-[12px] flex text-gray-500 items-center gap-1 md:gap-2">
              <HiOutlineUserGroup /> posts{" "}
              <span className="text-sm">{get_all_post?.length || 0}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className={`${active_aboute ? "h-fit " : "h-20 overflow-hidden pb-2"} rounded-2xl bg-gray-100 p-4 m-4 `}>
        {/* heading and icon */}

        <div onClick={() => set_active_aboute(!active_aboute)} className="flex bg-white/50 mb-3 px-2 py-1 rounded border w-fit cursor-pointer  border-gray-500 backdrop-blur-[4px] items-center gap-2" >
          <h1 className=" font-bold text-sm text-gray-500  ">about user</h1>
        </div>
        {/* user about section */}
        <p className=" text-sm ">
          {profile.aboute_user}
        </p>
      </div>

      {/* Followers List */}
      {active_follower_list && (
        <div className="w-full flex flex-col h-full gap-5 px-5 py-5">
          <h1 className="text-gray-900 text-lg font-bold">Follower List</h1>
          {profile.followers?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white shadow flex justify-between px-3 py-2"
            >
              <div className="flex gap-2">
                <img
                  className="md:size-8 size-4  rounded-full"
                  src={item.user_id.profileimage && item.user_id.profileimage.trim() !== "" ?item.user_id.profileimage:randomImage}
                  alt=""
                />
                <h1 className="text-[12px] md:text-sm">{item.user_id.username}</h1>
              </div>

              {item.user_id._id === self_id && (
                <button
                  onClick={() => handleRemoveFollower(item.user_id._id)}
                  className="md:px-2 px-1 text-[12px] text-sm py-1 bg-black text-white rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Following List */}
      {active_following_list && (
        <div className="w-full flex  flex-col h-full gap-5 md:px-5 py-5">
          <h1 className="text-gray-900 text-lg font-bold">Following List</h1>
          {profile.following?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white shadow flex justify-between md:px-3 py-2"
            >
              <div className="flex gap-2">
                <img
                  className="md:size-8 size-4 rounded-full"
                  src={item.user_id.profileimage && item.user_id.profileimage.trim() !== "" ?item.user_id.profileimage:randomImage}
                  alt=""
                />
                <h1 className="text-[12px] md:text-sm" >{item.user_id.username}</h1>
              </div>


            </div>
          ))}
        </div>
      )}

      {/* Following List */}
      {active_all_post && get_all_post.length > 0 && (
        <div className="mb-60">
          {
            get_all_post.map((items, index) => {

              return (
                <div
                  key={index}
                  className="  h-fit grid-cols-1 flex flex-col w-full   shadow-md rounded-2xl border border-gray-200 mb-5"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center p-3">
                    <div className="flex gap-3 items-center">
                      <img
                        className="w-10 h-10 rounded-full object-contain "
                        src={items?.create_by_id && items?.create_by_id?.profileimage.trim() !== "" ? items.create_by_id?.profileimage : randomImage}
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

          alt="post-img"
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

            alt={`post-img-${i}`}
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



                </div>
              );
            })
          }
        </div>
      )}

        {
      
                      active_zoom.active && <div className='w-full  h-full fixed backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>
      <ImCancelCircle onClick={(prev)=>set_active_zoom({active:false,...prev})} className=' size-5 text-white absolute left-5 top-5  ' />
      
      
                          <Zoom data={active_zoom.url} />
      
      
                      </div>
      
      
                  }
    </div>
  );
};
