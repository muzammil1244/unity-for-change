
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState, useTransition } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";
import { CgLayoutGridSmall } from "react-icons/cg";
import { dataauther } from "./mainpostdata";
import { MdOutlineModeComment, MdOutlineToken } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { MdDeleteOutline } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

import { HiArrowCircleUp } from "react-icons/hi";
import { FcDeleteColumn } from "react-icons/fc";
import { UpdateProfile } from "./updateprofile";
import { TbUserMinus } from "react-icons/tb";
import { FcLike } from "react-icons/fc";
import { Liked_post } from "./liked_post";
import { CommentedPosts } from "./comment_post";
import { PostForm } from "./post_up_cr";
import { MdOutlineCancel } from "react-icons/md";

export const Profile = ({off_profile}) => {

    const [menu, setmenu] = useState(false)







    const [commitypost, setcommitypost] = useState(false)


    const [openIndex, setOpenIndex] = useState(null);
    const [openIndexforcomment, setcommentindex] = useState(null)
    
    const [activeupdateprofile, setactiveprofileupdate] = useState(false)
    const [active_your_post, set_active_your_post] = useState(true)
    const [acitve_follower_list, set_follower_list] = useState(false)
    const [active_following_list, set_active_following_list] = useState(false)
    const [profile_data, set_profile_data] = useState({})
    const [follower_list, set_follower_list_data] = useState({})
    const [following_list, set_following_lis] = useState({})
    const [posts_all, set_posts_all] = useState([])
    const [comment_data, set_cooment_data] = useState("")
    const [active_liked_post,set_active_liked_post] = useState(false)
        const [active_commented_post,set_active_commented_post] = useState(false)
const[active_update_post,set_active_update_post] = useState(false)
const [update_post_data,set_update_post_data] = useState({})
const [active_aboute,set_active_aboute]= useState(false)
    const token = localStorage.getItem("token")

    const handle_get_profile = async () => {


        const data = await fetch("http://localhost:8000/api/client/profile", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })

        const profile_data2 = await data.json()

        console.log("user infor",profile_data2)
        set_profile_data(profile_data2)


    }








    // follower list

    const get_follower_list_data = async () => {

        try {
            const data = await fetch("http://localhost:8000/api/user/followers", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const follower_list_data = await data.json()
            set_follower_list_data(follower_list_data)
        } catch (error) {
            return console.log(error.message)
        }
    }

    const handle_remove_follower_function = async (item) => {
        const user_id = item.user_id?._id;

        try {
            const response = await fetch(
                `http://localhost:8000/api/user/remove_follower/${user_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();
        } catch (error) {
            console.log("Error:", error.message);
        }
    };

    const handle_list_following = async () => {
        try {
            const data = await fetch("http://localhost:8000/api/user/following", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }


            })
            const following_data = await data.json()

            set_following_lis(following_data)
        } catch (err) {
            console.log(err.message)
        }
    }
    const handle_remove_following = async (item) => {

        const user_id = item.user_id?._id;

        try {
            const response = await fetch(
                `http://localhost:8000/api/user/remove_following/${user_id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

        } catch (error) {
            console.log("Error:", error.message);
        }



    }

    const handle_All_user_posts = async () => {

        try {

            const data = await fetch("http://localhost:8000/api/client/all/post", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const post_data2 = await data.json()
            console.log("owen posts ",post_data2)
            set_posts_all(post_data2)

        } catch (err) {

            return console.log(err.message)
        }


    }




    const handle_comment_to_post = async (items) => {

        try {

            const data = await fetch(`http://localhost:8000/api/client/comment/${items}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
                body: JSON.stringify({ comment: comment_data })
            })

            if (!data.ok) {
                return console.log("not working")
            }
            set_cooment_data("")

            return console.log("data submitted")
        } catch (err) {
            return console.log(err)
        }


    }

 const handle_like_to_post = async (postId) => {
  set_posts_all(prev =>
    prev.map(p => 
      p._id === postId 
        ? { ...p, likes: [...p.likes, profile_data._id] } 
        : p
    )
  ); // pehle UI update kar diya

  try {
    await fetch(`http://localhost:8000/api/client/like/${postId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  } catch (err) {
    console.log(err);
    // rollback karna ho to yahan karo
  }
};



    const handle_Delete_post = async(item)=>{

       try {

            const data = await fetch(`http://localhost:8000/api/admin/${item}/delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
            })

            if (!data.ok) {
                return console.log("not working")
            }






          

            return console.log("data submitted")
        } catch (err) {
            return console.log(err)
        }
    }
    
   const handle_unlike_post = async (postId) => {

    set_posts_all((prev=> prev.map((p)=>p._id === postId?{...p,likes:p.likes.filter(id=>id !== profile_data._id)}:p )))
  try {
    const res = await fetch(`http://localhost:8000/api/client/${postId}/unlike`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const updatedPost = await res.json();

    // Update posts_all
    set_posts_all(prev =>
      prev.map(p => p._id === updatedPost._id ? updatedPost : p)
    );
  } catch (err) {
    console.log(err.message);
  }
};


    // /////////////////////////////////////////////////

   useEffect(() => {
    const fetchData = async () => {
        await handle_All_user_posts();
        await handle_get_profile();
     
        await get_follower_list_data();
        await handle_list_following();

       
    };

    fetchData();
}, []);




const is_liked=(post)=>{

   return    post?.likes?.includes(profile_data._id)

    
   

   

}











    return (

        <div onMouseEnter={() => setcommentindex(null)} className="w-full h-full  overflow-x-hidden px-4 overflow-y-scroll ">
            <div className=" relative w-full h-1/3  bg-gray-500">
                <IoMdArrowRoundBack onClick={off_profile} className=" absolute hover:scale-110 cursor-pointer  z-2 top-2 left-2 z-2" />
                <img className=" w-full h-full bg-cover " src={ profile_data.cover_image? `http://localhost:8000/uploads/${profile_data.cover_image}`:null} alt="" />
                <div className=" absolute size-30 transform -translate-x-1/4 translate-y-1/2 overflow-hidden   bottom-0 left-1/6 rounded-full border-white border-2 bg-cover  bg-green-400">
                    <img className=" bg-cover  " src={ profile_data.profileimage?`http://localhost:8000/uploads/${profile_data.profileimage}`:null} alt="" />
                </div>
                <div className="absolute backdrop-blur-[4px] bg-white/20 bottom-5 right-5 w-fit h-fit px-3 py-1  border border-white/20 scale-80 hover:bg-gray-50/20 duration-200  cursor-pointer  rounded-2xl ">
                    <h1 onClick={() => setactiveprofileupdate(!activeupdateprofile)} className=" font-bold tex-tsm text-gray-300">Edite Image</h1>

                </div>
            </div>

            <div className="px-5 w-full border-b pb-5  mb-5 rounded-xl overflow-hidden border-gray-500 h-fit mt-20 py3">
                {/* email id and username  */}
                 <div className="flex-col  w-full h-full gap-10">
                        <h1 className=" font-semibold text-gray-700 ">{profile_data.username}</h1>
                        <p className=" text-gray-600">{profile_data.email}</p>

                    </div>
                <div className="flex  pb-10  justify-between items-center ">
                   

<div className="w-full flex  gap-3 h-fit p">
                    <div onClick={() => {
                        set_active_your_post(false)
                        set_follower_list(false)
                        set_active_following_list(true)
                                                        set_active_liked_post(false)

                    }} className="">
                        <h1 className=" text-sm flex cursor-pointer text-gray-500 items-center  hover:text-black  duration-200  gap-2"> <HiOutlineUserGroup /> following <span className="text-sm">{profile_data.following?.length || 0}</span></h1>

                    </div>
                    <div onClick={() => {
                        set_active_your_post(false)
                        set_follower_list(true)
                        set_active_following_list(false)
                                                                                set_active_liked_post(false)

                    }} className="">

                        <h1 className=" text-sm flex cursor-pointer text-gray-500 items-center hover:text-black  duration-200  gap-2"> <HiOutlineUserGroup /> follower <span className="text-sm">{profile_data.followers?.length || 0}</span></h1>
                    </div>

                    <div onClick={() => {
                        set_active_your_post(true)
                        set_follower_list(false)
                        set_active_following_list(false)
                                                                                set_active_liked_post(false)


                    }} className="">

                        <h1 className=" text-sm flex cursor-pointer text-gray-500 items-center hover:text-black  duration-200  gap-2"> <CgLayoutGridSmall /> Post <span className="text-sm">{posts_all.length}</span></h1>
                    </div>
                </div>
                    

{/* menu icon */}
                    <div className="flex gap-4 justify-end w-full  items-center   ">

                        <div className={`flex-col ${menu ? "scale-100" : "scale-0"} transition-all ease-in-out duration-200 gap-10 rounded-xl px-3 py-3 bg-gray-100    `}>
                            <h1 onClick={()=>{
                                set_active_liked_post(true)
                                  set_active_your_post(false)
                        set_follower_list(false)
                        set_active_following_list(false)
                            }} className="text-sm flex gap-2 items-center hover:text-gray-800 font-semibold lack text-gray-700 cursor-pointer  "><FaRegHeart />  like posts</h1>
                            <h1  onClick={()=>{
                                set_active_liked_post(false)
                                  set_active_your_post(false)
                        set_follower_list(false)
                        set_active_following_list(false)
                        set_active_commented_post(true)
                            }} className="text-sm flex gap-2 my-2 items-center hover:text-gray-800 lack font-semibold text-gray-700 cursor-pointer "><LiaCommentsSolid /> comment posts</h1>

                        </div>


                        <CiMenuKebab size={20} onClick={() => setmenu(!menu)} className=" cursor-pointer hover:scale-110 duration-150 " />

                    </div>


  
                </div>
              
             
              

            </div>



 <div className={`${active_aboute?"h-fit ":"h-20 overflow-hidden pb-2"} rounded-2xl bg-gray-100 p-4 `}>
{/* heading and icon */}

<div onClick={()=>set_active_aboute(!active_aboute)} className="flex bg-white/50 mb-3 px-2 py-1 rounded border w-fit cursor-pointer  border-gray-500 backdrop-blur-[4px] items-center gap-2" >
    <h1 className=" font-bold text-sm text-gray-500  ">about user</h1>
</div>
{/* user about section */}
<p className=" text-sm ">
{profile_data.aboute_user}
</p>
              </div>
            {/* active Profile */}

            {
                active_your_post && posts_all.length && <div className="w-full grid grid-cols-2 h-full gap-5 px-5 py-5 ">
                    {
                        posts_all.map((items, index) => {

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
                                                src={`http://localhost:8000/uploads/${profile_data.profileimage}`}
                                                alt="profile"
                                            />
                                            <div className="flex flex-col">
                                                <h1 className="text-sm font-bold text-gray-900">{profile_data.username}</h1>
                                                <p className="text-xs text-gray-500">{profile_data.email}</p>
                                            </div>
                                        </div>
                                        {/* Menu Button */}
                                        <div
                                            onMouseEnter={() => setOpenIndex(index)}
                                            onMouseLeave={() => setOpenIndex(null)}
                                            className="flex items-center relative"
                                        >
                                            <div
                                                className={` top-6 right-0 relative flex-col ${openIndex === index ? "scale-100" : "scale-0"
                                                    } transition-all duration-300 ease-in-out gap-2 bg-gray-500 relative rounded-xl shadow-lg`}
                                            >
                                                <div className='w-full h-fit'>
                                                    <h1 onClick={()=>{handle_Delete_post(items._id)}} className="text-[12px] flex gap-2 items-center text-white hover:text-black cursor-pointer hover:bg-gray-100 duration-150 px-3 py-1 border-b border-gray-400">
                                                        <MdDeleteOutline size={18} /> Delete
                                                    </h1>



                                                </div>

                                                <h1 onClick={()=>{
                                                    set_update_post_data(items)
                                                    set_active_update_post(true)}} className="text-[12px] flex items-center gap-2 text-white hover:text-black  cursor-pointer hover:bg-gray-100 duration-150 px-3 py-1">
                                                    <MdEditNote size={20} /> Edite
                                                </h1>
                                            </div>
                                            <CiMenuKebab className="text-gray-500 hover:scale-125 hover:text-black cursor-pointer" />
                                        </div>
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
                                                                        const fileUrl = `http://localhost:8000${file}`;
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
                                                                            const fileUrl = `http://localhost:8000${file}`;
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
                                                                            const fileUrl = `http://localhost:8000${file}`;
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
  {is_liked(items)
    ? <FcLike onClick={() => handle_unlike_post(items._id)} />
    : <FaRegHeart onClick={() => handle_like_to_post(items._id)} />
  }

  <span className="text-sm text-gray-600">
    {items.likes.length}
  </span>
</div>

                                            <div


                                                onClick={() => {

                                                    setcommentindex(index)
                                                    setcommitypost(!commitypost)
                                                }} className="flex gap-2 items-center cursor-pointer hover:text-blue-500">
                                                <MdOutlineModeComment />


                                                <span className="text-sm text-gray-600">{items.comments.length}</span>



                                            </div>

                                        </div>

                                        <div className={`w-full ${commitypost && openIndexforcomment == index ? " h-90" : " h-0  "} overflow-hidden transition-all duration-500 delay-200 ease-in-out   bg-white`}>
                                            <div className=' w-full h-78 overflow-y-scroll'>
                                                {
                                                    items.comments.map((item, index) => {
                                                        return <div key={index} className='w-full px-5 py-1 border-b my-2  border-gray-300'>
                                                            <div className='flex-col  gap-2 items-center '>

                                                                <div className='flex gap-2'>
                                                                    <img className='size-8 bg-cover rounded-full' src={`http://localhost:8000/uploads/${item.comment_by_id.profileimage}`} alt="" />

                                                                    <h1 className='text-sm font-bold '>{item.comment_by_id.username}</h1>
                                                                </div>    <p className='text-sm mt-3'>{item.comment_content}</p>

                                                            </div>
                                                        </div>

                                                    })
                                                }
                                            </div>

                                            <div className='px-2 py-3 w-full  flex justify-around items-center  bg-green h-fit'>
                                                <img className='size-8 rounded-full' src={`http://localhost:8000/uploads/${profile_data.profileimage}`} alt="" />

                                                <input type="text" value={comment_data} onChange={(e) => set_cooment_data(e.target.value)} className='px-4  py-1 border border-gray-500 textc rounded-2xl' placeholder='you comment' />
                                                <HiArrowCircleUp onClick={() => {
                                                    handle_comment_to_post(items._id)

                                                }} size={35} />
                                            </div>
                                        </div>



                                    </div>


                                </div>
                            );
                        })
                    }
                </div>
            }

            {/* acitve follower list */}
            {
                acitve_follower_list && <div className="w-full flex flex-col  h-full gap-5 px-5 py-5 ">
                    <h1 className="text-gray-900 text-lg font-bold"> Follower List</h1>

                    {
                        follower_list.followers.map((item, index) => {
                            return <div key={index} className=" relative bg-white shadow flex justify-between px-3 py-2">
                                <div className="flex gap-2">
                                    <img className="size-8 rounded-full" src={`http://localhost:8000${item.user_id.profileimage}`} alt="" />
                                    <h1>{item.user_id.username}</h1>

                                </div>

                                <div onClick={() => handle_remove_follower_function(item)} className="flex absolute hover:bg-gray-900 cursor-pointer bg-black rounded-bl-xl px-2 py-1  top-0 right-0 gap-2 items-center">
                                    <TbUserMinus className="text-white" size={15} />
                                    <h1 className="text-sm text-white">remove</h1>
                                </div>


                            </div>
                        })
                    }


                </div>

            }

            {/* following list */}

            {
                active_following_list && <div className="w-full flex flex-col  h-full gap-5 px-5 py-5 ">
                    <h1 className="text-gray-900 text-lg font-bold"> Following List</h1>

                    {
                        following_list.following.map((item, index) => {
                            return <div key={index} className=" relative bg-white shadow flex justify-between px-3 py-2">
                                <div className="flex gap-2">
                                    <img className="size-8 rounded-full" src={`http://localhost:8000/uploads/${item.user_id.profileimage}`} alt="" />
                                    <h1>{item.user_id.username}</h1>

                                </div>

                                <div onClick={() => handle_remove_following(item)} className="flex absolute hover:bg-gray-900 cursor-pointer bg-black rounded-bl-xl px-2 py-1  top-0 right-0 gap-2 items-center">
                                    <TbUserMinus className="text-white" size={15} />
                                    <h1 className="text-sm text-white">Unfollow</h1>
                                </div>


                            </div>
                        })
                    }


                </div>

            }

{/* liked post */}

{
    active_liked_post&&
     <div className="w-full grid grid-cols-2 h-full gap-5 px-5 py-5 ">
    <Liked_post />
    </div>
}


{/* cpmmented post */}

{
    active_commented_post&&
     <div className="w-full grid grid-cols-2 h-full gap-5 px-5 py-5 ">
    <CommentedPosts />
    </div>
}








            {/* updat profile option */}
            {
                activeupdateprofile &&
                <div className="w-full h-full z-3 flex justify-center items-center absolute top-0 right-0 bg-black/30">
                    <UpdateProfile activeprofileupdat={() => setactiveprofileupdate(!activeupdateprofile)} />
                </div>
            }


{
    active_update_post &&  <div className='w-full h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/80'>
                        <ImCancelCircle size={30} className=' absolute top-9 left-10 text-white/30 cursor-pointer ' onClick={() => set_active_update_post(false)} />

<PostForm mode="update"  postToUpdate={update_post_data}
          onSuccess={() => set_active_update_post(false)}/>


    </div>
}

        </div>


    )
}