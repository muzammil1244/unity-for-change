
import { FaBug, FaBiohazard, FaPlusSquare, FaUser } from 'react-icons/fa';
import { PiUserCircleLight } from "react-icons/pi";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { SlLike, SlSizeActual, SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineModeComment } from "react-icons/md";
import { HiArrowCircleUp } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa6";
import { LiaCommentsSolid } from "react-icons/lia";
import { SiRobotframework } from "react-icons/si";

import { FcLike } from "react-icons/fc";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";

import { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router';

import { ImCancelCircle } from "react-icons/im";
import { Profile } from './profile';
import { GoHome } from "react-icons/go";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Report } from './report';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Admin_message } from './admin_message';
import { Chat_Bot_Screen } from './chat_bot_screen';
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { Login } from './login';
import { CiLogout } from "react-icons/ci";
import { Register } from './register';
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { PostForm } from './post_up_cr';
import { Friend_Profile } from './Friend_profile';
import { Feedback } from './Feedback';
import { Comment_main_post } from '../../../server/controller/UserController';
import { randomImage } from '../profileimage';
import { RiUserFollowLine } from "react-icons/ri";

export const Home = () => {
    const [search_data, set_search_data] = useState("")

    const [container1, setconatiner1] = useState({
        w: "70%",
        active: true
    })

    const [container2, setconatiner2] = useState({
        w: "40%",
        active: false,
    })


    const [mainpostcommentshow, setmainsetcommentshow] = useState(false)

    const [commitypost, setcommitypost] = useState(false)


    const [openIndex, setOpenIndex] = useState(null);
    const [openIndexforcomment, setcommentindex] = useState(null)
    const [likeindex, setlikeindex] = useState(null)
    const [like, setlike] = useState(false)
    const [currentindex, setcurrentindex] = useState(null)


    const [active_post, set_active_post] = useState(false)


    const [profile, set_profile] = useState(false)

    const [active_report, set_active_report] = useState({
        active: false,
        image: "",
        username: "",
        email: "",
        post_id: ""
    })
    const [active_admin_message, set_active_message] = useState(false)
    const [active_chat_bot, set_active_chat_bot] = useState(false)
    const [login, set_login] = useState(false)
    const [register_active, set_register_active] = useState(false)
    const [acitve_ai, set_active_ai] = useState(false)
    const [get_all_post, set_all_post] = useState([])
    const [profile_data, set_profile_data] = useState({})
    const [comment_data, set_comment_data] = useState("")
    const [get_user, set_users] = useState([])

    const [search_filter, set_search_filter] = useState([])
    const [active_friend_profile, set_friend_profile] = useState(false)
    const [active_friend_profile_data, set_friend_profile_data] = useState({})
    const [get_token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);
    const [active_feedback, set_active_feedback] = useState(false)

    const [main_post_comment, set_main_post_comment] = useState("")
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false)
const [getloading,set_loading] = useState(false)

    const token = get_token



    const container1fun = () => {
        setconatiner1({
            w: "80%",
            active: true
        })
        setconatiner2({
            w: "30%", active: false
        })
    }

    const container2fun = () => {
        setconatiner2({
            w: "80%",
            active: true
        })

        setconatiner1({
            w: "30%", active: false
        })
    }



    const handleCommentSubmit = async (items) => {
        if (!main_post_comment.trim()) return;


        try {
            const response = await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/comment/mainpost/${items._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ text: main_post_comment }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("commented")
                handle_all_post_data()
            } else {
                alert(data.message || "Failed to add comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }

    };




    // search data handle  


    const navigate = useNavigate()



    const handle_all_post_data = async () => {

        try {
set_loading(true)
            const data = await fetch("https://unity-for-change-ggbn.onrender.com/api/client/all/news", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (!data.ok) {
                console.log("data not fetched")

            }



            const result = await data.json(); // yahan real data milta hai

            set_all_post(result);

            return set_loading(false)





        } catch (error) {
            return console.log(error.message)
        }


    }

    const is_liked = (postId) => {

        return postId.includes(profile_data._id)

    }


    const user_profile = async () => {
        try {
            const response = await fetch("https://unity-for-change-ggbn.onrender.com/api/client/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                // 🔴 Token expire ya invalid
                console.log("Token expired, please login again.");
                localStorage.removeItem("token");
                setToken(null);
                set_login(true);
                return null;
            }

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const data = await response.json();
            set_profile_data(data);
            console.log("user data", data);
            return data;
        } catch (err) {
            console.error("API Error:", err.message);
            return null;
        }
    };

    const handle_like_to_post = async (postId) => {
        set_all_post(prev =>
            prev.map(p =>
                p._id === postId
                    ? { ...p, likes: [...p.likes, profile_data._id] }
                    : p
            )
        ); // pehle UI update kar diya

        try {
            await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/like/${postId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
        } catch (err) {
            console.log(err);
            // rollback karna ho to yahan karo
        }
    };

    const handle_unlike_post = async (postId) => {

        set_all_post((prev => prev.map((p) => p._id === postId ? { ...p, likes: p.likes.filter(id => id !== profile_data._id) } : p)))
        try {
            const res = await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/${postId}/unlike`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const updatedPost = await res.json();

            // Update posts_all
            set_all_post(prev =>
                prev.map(p => p._id === updatedPost._id ? updatedPost : p)
            );
        } catch (err) {
            console.log(err.message);
        }
    };


    const handle_comment_to_post = async (items) => {

        try {

            const data = await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/comment/${items}`, {
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
            set_comment_data("")

            window.location.reload()
            return console.log("data submitted")
        } catch (err) {
            return console.log(err)
        }


    }

    const handle_all_user = async () => {

        try {

            const data = await fetch("https://unity-for-change-ggbn.onrender.com/api/client/user", {
                method: "GET",
                headers: {
                    "Authorization": `Beater ${token}`
                }
            })

            const result = await data.json()


            set_users(result)
        } catch (err) {

            return console.log(err.message)
        }

    }

   
    // ✅ Async function banayi fetch ke liye
    const fetchFollowingPosts = async () => {
      try {
        // 🔐 JWT token localStorage ya context se lo
        const token = localStorage.getItem("token"); // ya context se

        const response = await fetch("https://unity-for-change-ggbn.onrender.com/api/client/following/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 👈 Token bhejna zaroori hai
          },
        });

        if (!response.ok) {
          throw new Error("Server se sahi response nahi aaya");
        }

        const data = await response.json();

        // ✅ Agar posts mil gaye toh state mein daal do
        if (data.length) {
            console.log(data)
          set_all_post(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

 






    // main post data

    useEffect(() => {
        fetch("https://unity-for-change-ggbn.onrender.com/api/admin/get_post")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);


    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        setToken(savedToken);

        if (!savedToken) {
            set_login(true); // token nahi hai → login karo
        }
    }, []);

    useEffect(() => {
        if (token) {


            ; // admin or user

            user_profile();

            handle_all_post_data()

        }
    }, [token]);


    // filter users


    useEffect(() => {

        if (search_data.trim() === "") {
            set_search_filter([])
        } else {
            const filteredUsers = get_user.filter((item) => {
                const search = search_data.toLowerCase();
                return (
                    item.username.toLowerCase().includes(search) ||
                    item.email.toLowerCase().includes(search)
                );
            });
            set_search_filter(filteredUsers);
        }
    }, [search_data, get_user]);



    // handle ai with title 



    // typing effect
    const showTypingEffect = async (text) => {
        setMessage("")
        set_active_ai(true)
        setResponse("");
        for (let i = 0; i < text.length; i++) {
            await new Promise((r) => setTimeout(r, 25));
            setResponse((prev) => prev + text[i]);
        }
    };

    const handleAskAI = async () => {
        if (!message.trim()) return;
        setLoading(true);
        setResponse("");


        try {

            const data = await fetch("https://unity-for-change-ggbn.onrender.com/api/Ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ message: message })

            })

            const final_data = await data.json()
            console.log("AI ", final_data)
            showTypingEffect(final_data.reply || "No response")

        } catch (e) {
            setResponse(e.message);
        } finally {
            setLoading(false);
        }
    };

    const Log_out = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    // /////////////////////////////// ///

    useEffect(() => {
        if (acitve_ai && message) {
            handleAskAI();
        }
    }, [acitve_ai]);



    return (
        <div className="md:w-full md:h-full w-screen h-screen flex  sm:flex-col-revers  md:pl-10 overflow-hidden md:overflow-scroll bg-white">
            <div className='md:h-full md:w-fit bg-white py-2 z-10 md:border-0 border-t-2 border border-gray-200  w-full  h-fit fixed  md:static bottom-0 flex sm-px-5    md:flex-col px-5 justify-center items-center gap-10  '>

                <AiOutlinePlusSquare title='add post' onClick={() => {

                    set_active_post(!active_post)
                }} size={25} className=' cursor-pointer text-sm' />
                <HiOutlineUserCircle title='profile' onClick={() => set_profile(!profile)} size={25} className=' cursor-pointer text-sm' />
                <GoHome size={25} title='profile' onClick={() => {
window.location.reload()
                }} className=' cursor-pointer text-sm' />
                <SiRobotframework onClick={() =>{
                                                    container1fun()
 set_active_chat_bot(!active_chat_bot)}} title='chat with ai bot' size={23} className=' cursor-pointer text-sm' />
            </div>
            <div className='w-full'>

                {/* header */}


                <div>
                    <div className='flex md:flex-row flex-col justify-around  items-center gap-3'>
                        {/* web icon */}

                        <div className=' flex  w-fit items-center gap-2'>

                            <h1 className=" flex gap-2 text-sm text-dark font-bold">Humanity <span className='text-gray-500'>Change</span> </h1>
                            <FaPlusSquare className='text-black' size={20} />

                        </div>

                        {/* search bar */}
                        <div className="px-3 md:w-full w-fit flex gap-3 items-center py-1 border rounded-xl border-black">
                            <CiSearch />
                            <input type="text" onFocus={() => handle_all_user()} onChange={(e) => set_search_data(e.target.value)} className=' outline-0 w-full' />
                        </div>
                        {/* setting */}
                        <div className='w-fit items-center flex gap-2 '>
                            <IoMdNotificationsOutline onClick={() => {
                                container2fun()
                                set_active_message(!active_admin_message)}} className='hover:scale-105 duration-200 cursor-pointer ' size={22} />
                            <HiOutlineChatBubbleBottomCenterText onClick={() => navigate("/chat_screen",
                                { state: { user_id: profile_data._id } }
                            )} className='hover:scale-105 duration-200 cursor-pointer ' size={20} />



                            <CiLogout onClick={Log_out} className=' hover:scale-105 cursor-pointer' size={20} />


                            <h1 onClick={() => set_login(!login)} className='text-[10px] hover:bg-gray-900 duration-200 cursor-pointer flex items-center bg-black px-2 py-1 rounded-xl text-white  '>Signup</h1>

                        </div>


                    </div>

                    {
                        search_filter.length > 0 && <div className='flex  flex-row gap-5 py-5 px-10 md:px-0 overflow-x-scroll'>

                            {search_filter.map((items, index) => {
                                return <div onClick={() => {
                                    set_friend_profile_data({})

                                    set_friend_profile(true)
                                    set_friend_profile_data(items)
                                    console.log(items, "profiledata")
                                }} className='flex md:gap-3 gap-1 md:p-4 p-2  cursor-pointer hover:scale-105 duration-200 hover:shadow-2xl hover:shadow-green-200 duration-200 bg-white shadow rounded'>

                                    <div className='md:size-10 size-7 rounded bg-cover overflow-hidden'>
                                        <img className='h-full w-full' src={ items?.profileimage && items.profileimage.trim() !== ''? `https://unity-for-change-ggbn.onrender.com/uploads/${items.profileimage}`:randomImage}
                                            alt="" />
                                    </div>

                                    <div>
                                        <h1 className='md:text-sm  text-[9px] font-bold'>{items.username}</h1>
                                        <p className='md:text-sm  text-[9px]  text-gray-400'>{items.email}</p>
                                    </div>

                                </div>
                            })
                            }
                        </div>
                    }

                </div>


                {/* container  */}
                <div className='md:mt-5 mt-2 md:overflow-hidden bg-white  flex justify-center items-center md:gap-3 gap-2   h-full  w-full '>




                    {/* container 1 */}
                    {/* container 1 */}


                    <div
                        style={{ width: container1.w }}
                        className={`h-full     rounded-2xl md:overflow-hidden overflow-y-scroll transition-all duration-500 ease-in-out 
    ${container1.active ? "shadow-sm" : "md:opacity-10 hidden md:block "}`}
                    >
                        {
                            active_chat_bot && <div className=' w-full h-full bg-white '>

                                <Chat_Bot_Screen Inactive_chat_screen={() => set_active_chat_bot(false)} />

                            </div>
                        }

                        {
                            active_friend_profile && <div className=' w-full h-full   overflow-hidden bg-white '>

                                <Friend_Profile key={active_friend_profile_data?._id} // 👈 Ye line add karo
                                    self_id={profile_data._id} Profile_data={active_friend_profile_data} />

                            </div>
                        }


                        {
                            profile ?
                                <Profile off_profile={() => set_profile(false)} />
                                : (
                                    <div className=' w-full h-full overflow-hidden'>
                                        <div className="sticky top-0 z-2 bg-gray-200 backdrop-blur-md py-6">
                                            <div className="absolute md:top-5 top-2 right-5">
                                                {container1.active ? (
                                                    <SlSizeActual
                                                        onClick={container2fun}
                                                        size={12}
                                                        className="cursor-pointer font-bold hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <SlSizeFullscreen
                                                        size={12}
                                                        onClick={container1fun}
                                                        className="cursor-pointer font-bold hover:scale-110 transition-transform duration-300"
                                                    />
                                                )}
                                            </div>
                                            <h1 className="text-center flex items-center justify-center md:gap-20 gap-10  z-2 md:text-xl text-[10px] font-extrabold text-gray-600">
                                            <span onClick={fetchFollowingPosts} className='flex hover:opacity-50 duration-150 cursor-pointer items-center gap-3 md:gap-5'><RiUserFollowLine className='md:size-5'/>following </span> 
                                            
                                            <span className='flex hover:opacity-50 duration-150 cursor-pointer items-center gap-5' onClick={()=>
                                                window.location.reload()
                                            }>Community Voices</span>   
                                            </h1>
                                        </div>


                                        <div className=' mt-3 bg-white h-full flex overflow-y-scroll md:pb-20 pb-60 relative  items-center w-full flex-col '>

                                            {get_all_post.length ?
                                                get_all_post.map((items, index) => {

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="md:w-[90%] lg:w-1/2 w-[100%] bg-white h-fit flex flex-col  shadow-md rounded-2xl border border-gray-200 mb-3 md:mb-5"
                                                        >
                                                            {/* Header */}
                                                            <div className="flex  justify-between items-center md:p-3 p-2">
                                                                <div className="flex md:gap-3 gap-2 items-center">
                                                                    <img
                                                                        className="md:w-10 md:h-10 h-7 w-7 rounded-full object-cover"
                                                                        src={items.create_by_id.profileimage &&  items.create_by_id.profileimage.trim() !== ''? `https://unity-for-change-ggbn.onrender.com/uploads/${items.create_by_id.profileimage}`:randomImage}

                                                                    />
                                                                    <div className="flex flex-col">
                                                                        <h1 className="md:text-sm text-[12px]  font-bold text-gray-900">{items.create_by_id.username}</h1>
                                                                        <p className="text-xs text-gray-500">{items.create_by_id.email}</p>
                                                                    </div>
                                                                </div>
                                                                {/* Menu Button */}
                                                                <div
                                                                    onMouseEnter={() => setOpenIndex(index)}
                                                                    onMouseLeave={() => setOpenIndex(null)}
                                                                    className="flex  items-center md:sticky absolute right-5"
                                                                >
                                                                    <div
                                                                        className={` top-6 right-0 relative flex-col ${openIndex === index ? "scale-100" : "scale-0"
                                                                            } transition-all duration-300 ease-in-out gap-2 bg-gray-200 shadow relative rounded-xl shadow-lg`}
                                                                    >
                                                                        <div className='w-full h-fit'>
                                                                            <h1 onClick={() => {
                                                                                console.log("items data", items)
                                                                                set_active_report({ active: true, name: items.create_by_id.username, image: items.create_by_id.profileimage, post_id: items._id, email: items.create_by_id.email, user_profile: profile_data.profileimage, user_email: profile_data.email })
                                                                            }} className="text-[12px] text-gray-800 items-center hover:text-black cursor-pointer hover:bg-gray-100 duration-150 px-3 py-1 flex gap-4 ">
                                                                                <MdOutlineReportGmailerrorred />    Report
                                                                            </h1>



                                                                        </div>


                                                                    </div>
                                                                    <CiMenuKebab className="text-gray-500 hover:scale-125 hover:text-black cursor-pointer" />
                                                                </div>
                                                            </div>

                                                            {/* Description */}
                                                            <div className="px-3 flex flex-col gap-3 pb-2">

                                                                <h1 className=' font-bold text-sm '>{items.title}</h1>


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
                                                                                    className="w-full h-60 focus:object-contain hover:object-contain object-cover rounded-md"
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
                                                                                            className={`w-full transition-all focus:object-contain duration-500 ease-in-out object-cover hover:object-contain ${i === 2 ? "h-60" : "h-40"} object-cover rounded-md`}
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
                                                                <div className='flex justify-between py-3'><div onMouseEnter={() => setlikeindex(index)} onMouseLeave={() => setlikeindex(null)} className="flex gap-2 items-center cursor-pointer hover:text-red-500">
                                                                    {
                                                                        is_liked(items.likes) ? <FcLike onClick={() => handle_unlike_post(items._id)} /> : <FaRegHeart onClick={() => handle_like_to_post(items._id)} />

                                                                    }

                                                                    <span className="text-sm text-gray-600">{items.likes.length}</span>
                                                                </div>
                                                                    <div

                                                                        onMouseEnter={() => {
                                                                            setcommentindex(null)
                                                                            setcommentindex(index)

                                                                        }}
                                                                        onClick={() => {


                                                                            setcommitypost(!commitypost)
                                                                        }} className="flex gap-2 items-center cursor-pointer hover:text-blue-500">
                                                                        <MdOutlineModeComment />


                                                                        <span className="text-sm text-gray-600">{items.comments.length}</span>



                                                                    </div>

                                                                </div>

                                                                <div className={`w-full ${commitypost && openIndexforcomment == index ? " md:max-h-90 md:h-fit max-h-60 h-fit" : " h-0  "} overflow-hidden transition-all duration-500 delay-200 ease-in-out   bg-white`}>
                                                                    <div className=' w-full h-full overflow-y-scroll'>
                                                                        {
                                                                            items.comments.map((items, index) => {
                                                                                return <div className='w-full px-5 py-1 border-b my-2  border-gray-300'>
                                                                                    <div className='flex-col  gap-2 items-center '>

                                                                                        <div className='flex gap-2'>
                                                                                            <img className='md:size-8 size-4 rounded-full' src={items.comment_by_id.profileimage && items.comment_by_id.profileimage.trim() !== "" ?`https://unity-for-change-ggbn.onrender.com/uploads/${items.comment_by_id.profileimage}`:randomImage} />

                                                                                            <h1 className='text-[12px] md:text-sm font-bold '>{items.comment_by_id.username}</h1>
                                                                                        </div>    <p className='text-[12px] md:text-sm mt-3'>{items.comment_content}</p>

                                                                                    </div>
                                                                                </div>

                                                                            })
                                                                        }
                                                                    </div>

                                                                    <div className='px-2 pb-10 md:py-3 w-full   flex justify-around items-center  bg-green h-fit'>

                                                                        <input type="text" className='md:px-4 px-2 py-[4px] text-[12px] md:text-sm  md:py-1 border border-gray-500  rounded-2xl' placeholder='text' onChange={(e) => set_comment_data(e.target.value)} />
                                                                        <HiArrowCircleUp className='md:size-7 size-5' onClick={() => { handle_comment_to_post(items._id) }} size={35} />
                                                                    </div>
                                                                </div>



                                                            </div>
                                                        </div>
                                                    );
                                                }):(getloading?<div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-700 border-dashed rounded-full animate-spin"></div>
    </div>:"null")
                                            }



                                        </div>
                                    </div>
                                )
                        }




                    </div>







                    {/* container 2 */}
                    <div
                        style={{ width: container2.w }}
                        className={` relative h-full bg-gray-50 rounded-2xl overflow-hidden  transition-all duration-500 ease-in-out
    ${container2.active ? "shadow-sm " : "md:opacity-10 hidden md:block"}`} >

                        {active_admin_message ? <div className='w-full bg-white md:px-3 py-3 h-full'>

                            <Admin_message data={profile_data} active_message_container={() => set_active_message(false)} />



                        </div> :
                            <div className='w-full h-full '>
                                <div className=' relative  bg-gray-200  w-full h-fit py-6'>
                                    <div className=' absolute  md:top-5 top-2 left-5 '>
                                        {
                                            container2.active ? <SlSizeActual onClick={container1fun} size={12} className="cursor-pointer hover:scale-110 transition-transform duration-300" />
                                                :
                                                <SlSizeFullscreen size={12}
                                                    onClick={container2fun}
                                                    className="cursor-pointer hover:scale-110 transition-transform duration-300"
                                                />
                                        }


                                    </div>
                                    <h1 className='text-center md:text-xl text-sm  font-extrabold text-gray-600  text-shadow-2xs'>News </h1>

                                    <button onClick={() => set_active_feedback(true)} className='bg-black absolute md:right-4 right-2 top-4  text-white text-[10px]  md:py-2 py-1 rounded-xl hover:bg-gray-700 duration-150 cursor-pointer px-2 md:px-3' >add suggestion</button>

                                </div>



                                <div className='w-full overflow-y-scroll h-full pb-60 md:pb-20 '>

                                    {
                                        posts.map((items, index) => {
                                            return <div onMouseLeave={() => {
                                                set_active_ai(false);
                                                setcurrentindex(null);
                                                setResponse("");
                                            }} key={index} className=' bg-white p-4 w-full h-fit border   shadow-sm '>
                                                <div className='flex gap-5 justify-around items-center'>

                                                    <div className='flex-col gap-3'>
                                                        <h1 className='font-bold text-lg '>admin</h1>
                                                        <p className='text-gray-400'>admin@gmail.com</p>
                                                    </div>

                                                    <div onClick={() => {
                                                        setcurrentindex(index)

                                                        set_active_ai(true);

                                                        setMessage(items.title);

                                                    }} className='hover:scale-110 flex gap-3 items-center border-2 border-gray-200 rounded-xl px-2 py-1 hover:text-gray-700 text-gray-500 cursor-pointer duration-150' >
                                                        <h1 className='text-sm'>Ai</h1>
                                                        <BsStars size={12} />


                                                    </div>

                                                </div>

                                                {
                                                    acitve_ai && currentindex === index ? <div className=' w-full flex items-center  justify-center mt-4 h-fit'>
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

                                                    </div> : null

                                                }

                                                <div className='my-4'>
                                                    <h1 className='font-bold '>{items.title}</h1>
                                                    <p>{items.description}</p>
                                                </div>

                                                {/* imges */}
                                                {/* media (images + videos) */}
                                                <div className="w-full mt-3">
                                                    {items.images && items.images.length > 0 && (
                                                        <div
                                                            className={`grid ${items.images.length === 1
                                                                ? "grid-cols-1"
                                                                : items.images.length === 2
                                                                    ? "grid-cols-2 gap-1"
                                                                    : "grid-cols-2 grid-rows-2 gap-1"
                                                                }`}
                                                        >
                                                            {items.images.map((file, i) => {
                                                                // create full URL
                                                                const fileUrl = `https://unity-for-change-ggbn.onrender.com/${file}`;
                                                                // check if file is video (based on extension)
                                                                const isVideo = file.endsWith(".mp4") || file.endsWith(".mov") || file.endsWith(".webm");

                                                                return (
                                                                    <div key={i} className="relative">
                                                                        {isVideo ? (
                                                                            <video
                                                                                controls
                                                                                className="w-full h-60 object-cover rounded-md bg-black"
                                                                            >
                                                                                <source src={fileUrl} type="video/mp4" />
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                        ) : (
                                                                            <img
                                                                                src={fileUrl}
                                                                                alt={`media-${i}`}
                                                                                className="w-full h-60 object-cover rounded-md"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>


                                                {/* likes and comment suggestion */}

                                                <div className='w-full relative h-fit flex items-center justify-around py-5'>


                                                    {/* commnetn tab */}
                                                    <div className='flex gap-1 items-center' >
                                                        <p>{items.comments.length}</p>

                                                        <LiaCommentsSolid onClick={() => {
                                                            setcurrentindex(null)
                                                            setcurrentindex(index)
                                                            setmainsetcommentshow(!mainpostcommentshow)
                                                        }

                                                        } size={25} className={`${currentindex == index ? "hover:text-blue-400 duration-150 cursor-pointer hover:scale-105" : ""}`} />

                                                        {/* comment section */}


                                                    </div>


                                                </div>

                                                {mainpostcommentshow && currentindex == index && (

                                                    <div className='w-full h-40 p-5 flex flex-col  gap-3 h-fit rounded shadow '>
                                                        <div className='w-full flex justify-around flex-col  gap-3 '>
                                                            {items.comments.length > 0 ? items?.comments?.map(item => {

                                                                return <div className='flex rounded-xl p-3 shadow flex-col gap-3'>

                                                                    <div className='flex gap-5 items-center'>
                                                                        <img className='md:size-5 size-3 object-cover rounded' src={item.user_id.profileimage && item.user_id.profileimage.trim() !== ""?  `https://unity-for-change-ggbn.onrender.com/uploads/${item.user_id.profileimage}`:randomImage} alt="" />

                                                                        <div className='flexflex-col'>
                                                                            <h1 className=' md:text-sm text-[12px] '>{item.user_id.username}</h1>
                                                                            <h1 className=' text-gray-500 md:text-sm text-[12px] '>{item.user_id.email}</h1>

                                                                        </div>
                                                                    </div>

                                                                    <p className='px-4 text-sm'>{item.user_comment}</p>
                                                                </div>



                                                            }) : <div className='w-full py-3 flex justify-center'>
                                                                <h1>No Comments</h1>
                                                            </div>}
                                                        </div>
                                                        <div className='flex gap-4 items-center '>
                                                            <input value={main_post_comment} onChange={(e) => set_main_post_comment(e.target.value)} placeholder={"Comments...."} className='w-full md:py-2 py-1 px-2  md:px-4 rounded-2xl border border-gray-300 ' type="text" />
                                                            <button onClick={() => handleCommentSubmit(items)} className=' px-2 md:px-3 md:py-2 py-1 bg-black rounded text-white cursor-pointer hover:scale-110 duration-150' >send</button>
                                                        </div>
                                                    </div>
                                                )

                                                }

                                                {/* links */}


                                                {/* Platforms */}
                                                {items.platforms && items.platforms.length > 0 && (
                                                    <div className="mt-4 p-3 bg-gray-800  rounded-lg">
                                                        <h3 className="font-semibold text-white mb-2 flex gap-3 md:text-sm text-[12px] items-center"><FaGlobe /> Platforms</h3>
                                                        {items.platforms.map((platform, i) => (
                                                            <div
                                                                key={i}
                                                                className="mb-2 p-2 bg-white/10 rounded-md"
                                                            >
                                                                <p className="font-bold md:text-sm text-[12px] text-white">{platform.title}</p>
                                                                <a
                                                                    href={platform.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-400 text-[12px] md:text-ms hover:underline break-all"
                                                                >
                                                                    {platform.url}
                                                                </a>
                                                                <p className="md:text-sm text-[12px] text-white/70">
                                                                    {platform.description}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        })
                                    }

                                </div>
                            </div>
                        }









                    </div>

                </div></div>


            {/* image container */}

            <footer></footer>



            {/* tabs  */}
            {
                active_post && (
                    <div className='w-full fixed h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>

                        <ImCancelCircle className=' absolute md:size-5 size-5 top-9 left-10 text-white cursor-pointer ' onClick={() => set_active_post(false)} />

                        <PostForm mode='create' onSuccess={() => set_active_post(false)} />
                    </div>
                )
            }



            {
                active_report.active == true && <div className='w-full fixed h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>
                    <Report active_roport={active_report} active={() => set_active_report(active_report.active = false)} />
                </div>

            }


            {/* authentication */}

            {/* login */}

            {

                login && <div className=' w-full fixed h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>

                    <Login off_login={() => set_login(false)} set_register_active={() => {
                        set_login(false),
                            set_register_active(true)

                    }} />


                </div>


            }

            {

                register_active && <div className=' w-full fixed h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>

                    <Register off_register={() => set_register_active(false)} set_login_active={() => {

                        set_login(true)
                        set_register_active(false)

                    }} />


                </div>


            }

            {

                active_feedback && <div className='w-full fixed h-full backdrop-blur-[4px] flex items-center justify-center absolute top-0 right-0 z-20 bg-black/30'>

                    <Feedback is_active={() => set_active_feedback(false)} />


                </div>


            }

        </div>
    )
}