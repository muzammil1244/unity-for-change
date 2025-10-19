import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { ImCancelCircle } from "react-icons/im";
import { TbUserMinus } from "react-icons/tb";
import { useEffect, useState } from "react";

import { FcLike } from "react-icons/fc";

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
  const [active_aboute,set_active_aboute]= useState(false)

  console.log("user posts", profile)
  const handle_All_user_posts = async () => {

    try {

      const data = await fetch(`http://localhost:8000/api/client/specific_user/${profile._id}`, {
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
        url = `http://localhost:8000/api/user/remove_following/${profile._id}`;
        setProfile((prev) => ({
          ...prev,
          followers: prev.followers.filter((f) => f.user_id._id !== self_id),
        }));
      } else {
        url = `http://localhost:8000/api/user/follow_to/${profile._id}`;
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
        `http://localhost:8000/api/user/remove_follower/${userId}`,
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
        `http://localhost:8000/api/user/remove_following/${userId}`,
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
    <div className="w-full h-full bg-white overflow-x-hidden overflow-y-scroll">
      {/* Cover Image + Profile */}
      <div className="relative  w-full h-1/3 bg-gray-500">
      <div onClick={()=>{
        window.location.reload()
      }} className="size-fit top-2 left-2 absolute p-1 rounded-full bg-white">
        <IoMdArrowRoundBack className="  z-20 cursor-pointer" />

      </div>
        <img
          className="w-full h-full bg-cover"
          src={`http://localhost:8000/uploads/${profile.cover_image}`}
          alt=""
        />
        <div className="absolute size-30 transform -translate-x-1/4 translate-y-1/2 overflow-hidden bottom-0 left-1/6 rounded-full border-white border-2 bg-green-400">
          <img
            className="bg-cover"
            src={`http://localhost:8000/uploads/${profile.profileimage}`}
            alt=""
          />
        </div>
      </div>

      {/* User Info + Follow Button */}
      <div className="px-5 w-full border-b pb-5 border-gray-500 h-fit mt-20">
        <div className="flex pb-10 justify-between items-center">
          <div className="flex-col w-full h-full gap-10">
            <h1 className="font-semibold text-gray-700">{profile.username}</h1>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          {/* Follow / Unfollow */}
          {profile._id !== self_id && (
            <button
              onClick={handleFollowToggle}
              disabled={loading}
              className={`px-4 py-1 rounded-lg text-sm font-medium ${isFollowing
                ? "bg-white text-black hover:bg-gray-100 border"
                : "bg-black text-white hover:bg-gray-900"
                }`}
            >
              {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* Followers & Following Counts */}
        <div className="w-full flex gap-3 h-fit">
          <div
            onClick={() => {
              set_active_follower_list(false)
              set_active_following_list(true)
              set_active_allpost(false)}}
            className="cursor-pointer"
          >
            <h1 className="text-sm flex text-gray-500 items-center gap-2">
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
            <h1 className="text-sm flex text-gray-500 items-center gap-2">
              <HiOutlineUserGroup /> Followers{" "}
              <span className="text-sm">{profile.followers?.length || 0}</span>
            </h1>
          </div>

          <div
            onClick={() => {
              set_active_following_list(false)
              set_active_follower_list(false)
              set_active_allpost(true)}}
            className="cursor-pointer"
          >
            <h1 className="text-sm flex text-gray-500 items-center gap-2">
              <HiOutlineUserGroup /> posts{" "}
              <span className="text-sm">{get_all_post?.length || 0}</span>
            </h1>
          </div>
        </div>
      </div>
      
 <div className={`${active_aboute?"h-fit ":"h-20 overflow-hidden pb-2"} rounded-2xl bg-gray-100 p-4 m-4 `}>
{/* heading and icon */}

<div onClick={()=>set_active_aboute(!active_aboute)} className="flex bg-white/50 mb-3 px-2 py-1 rounded border w-fit cursor-pointer  border-gray-500 backdrop-blur-[4px] items-center gap-2" >
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
                  className="size-8 rounded-full"
                  src={`http://localhost:8000${item.user_id.profileimage}`}
                  alt=""
                />
                <h1>{item.user_id.username}</h1>
              </div>

              {item.user_id._id === self_id && (
                <button
                  onClick={() => handleRemoveFollower(item.user_id._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
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
        <div className="w-full flex flex-col h-full gap-5 px-5 py-5">
          <h1 className="text-gray-900 text-lg font-bold">Following List</h1>
          {profile.following?.map((item, index) => (
            <div
              key={index}
              className="relative bg-white shadow flex justify-between px-3 py-2"
            >
              <div className="flex gap-2">
                <img
                  className="size-8 rounded-full"
                  src={`http://localhost:8000${item.user_id.profileimage}`}
                  alt=""
                />
                <h1>{item.user_id.username}</h1>
              </div>


            </div>
          ))}
        </div>
      )}

      {/* Following List */}
      {active_all_post && (
        <div>
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
                        className="w-10 h-10 rounded-full hover:object-contain object-cover"
                       src={ items?.create_by_id? `http://localhost:8000/uploads/${items.create_by_id?.profileimage}`:null} 
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
                      <img
                        src={`http://localhost:8000${items.Images[0]}`}
                        alt="post-img"
                        className="w-full hover:object-contain  h-72 object-cover"
                      />
                    )}

                    {items.Images.length === 2 && (
                      <div className="grid grid-cols-2 gap-1">
                        {items.Images.map((img, i) => (
                          <img
                            key={i}
                            src={`http://localhost:8000${img}`} alt={`post-img-${i}`}
                            className="w-full h-60 hover:object-contain  object-cover"
                          />
                        ))}
                      </div>
                    )}

                    {items.Images.length === 3 && (
                      <div className="grid grid-cols-2 gap-1">
                        <img
                          src={`http://localhost:8000${items.Images[0]}`}
                          alt="post-img-0"
                          className="w-full h-40 hover:object-contain  object-cover"
                        />
                        <img
                          src={`http://localhost:8000${items.Images[1]}`}
                          alt="post-img-1"
                          className="w-full h-40 hover:object-contain  object-cover"
                        />
                        <img
                          src={`http://localhost:8000${items.Images[2]}`}
                          alt="post-img-2"
                          className="col-span-2 hover:object-contain  w-full h-60 object-cover"
                        />
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
    </div>
  );
};
