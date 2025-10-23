

import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router";




export const Login = ({set_register_active,off_login})=>{
const [active_spinner,set_active_spinner] = useState(false)
  const [login_data, set_login_data] = useState({
  user_email: "",
  user_password: ""
});
const [login_err ,set_login_err] = useState("")

const navigate = useNavigate()
    const handle_login_data = (e)=>{
const { name,value} = e.target

set_login_data((prev) => ({
  ...prev,
  [name]: value
}));
    }

    const handle_api_post_login = async(e)=>{
        e.preventDefault()
  set_active_spinner(true)

      try{
const api_data = await fetch("https://unity-for-change-ggbn.onrender.com/auth/login",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({email:login_data.user_email,password:login_data.user_password})
        })
         const res = await api_data.json();   // ✅ response parse karo
  console.log(res.token);  
  localStorage.setItem("token",res.token)
  set_active_spinner(false)
  
  if(res.token){
    const decoded = jwtDecode(res.token);

    if(decoded.role == "admin"){
navigate("/admin_panel")
    }
  }
  off_login()
  window.location.reload()
      }catch(err) {
                set_active_spinner(false)
set_login_data({user_email:"",user_password:""})
set_login_err(err.message)
return console.log(err.message)

      } 
        
    }
    
    

    return (

        <div className="md:w-1/2 w-[80%] relative shadow-2xl md:h-full h-[70%] overflow-hidden bg-white rounded-2xl ">

{/* header */}

<div className="w-full  flex relative justify-center py-4">
    <IoMdArrowRoundBack onClick={off_login} className=" absolute cursor-pointer top-5 left-3 hover:scale-110"/>
    <h1 className="font-bold md:text-xl text-sm  border-b pb-2 flex gap-2 items-center  "> <IoIosLogIn/> Signin</h1>
</div>
<div>
  {login_err?<h2 className="w-full text-center text-red-500">! something wrong</h2>:null}
</div>

<div className=" flex flex-col h-full justify-around   px-3 md:justify-center md:grid items-center  gap-4 md:grid-cols-2">
    <div className=" col-end-2 flex flex-col gap-2  py-10 justify-around bg-white rounded-xl  px md:h-1/2">
<div className="flex borer w-full gap-5  h-it  items-center ">
<MdOutlineAlternateEmail/>
<input type="text" placeholder=" Enter Email" onChange={handle_login_data} name="user_email" className=" px-2  border w-full rounded-xl py-2" />
</div>

<div className="flex borer w-full gap-5  h-it  items-center ">
<MdOutlinePassword/>
<input type="password" onChange={handle_login_data} name="user_password" placeholder=" Enter Pass" className=" px-2 border w-full rounded-xl py-2" />
</div>
<button className="w-full cursor-pointer py-2 bg-black hover:bg-black/50 rounded-xl text-white" onClick={handle_api_post_login}> {active_spinner?<div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin"></div>
    </div>:<span>Singin</span>} </button>

    </div>

 <div className="col-span-1 mb-10 md:mb-0 rounded-xl overflow-hidden grid grid-cols-2 gap-3 grid-rows-2 bg-white md:h-1/2">

<img className="w-full col-span-1 row-span-1 h-full" src={"https://images.unsplash.com/photo-1727762331532-220c0b700065?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGdhemF8ZW58MHx8MHx8fDA%3D"} alt="" />
<img className="w-full col-span-1 row-span-1 h-full" src={"https://images.unsplash.com/photo-1742202618461-31f6f3584247?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGdhemF8ZW58MHx8MHx8fDA%3D"} alt="" />
<img className="w-full col-span-1 row-span-1 h-full" src={"https://images.unsplash.com/photo-1621183037740-ff98f3ef11f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGdhemF8ZW58MHx8MHx8fDA%3D"} alt="" />
<img className="w-full col-span-1 row-span-1 h-full" src={"https://images.unsplash.com/photo-1660479643214-8ceae9caeda0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2F6YXxlbnwwfHwwfHx8MA%3D%3D"} alt="" />

    </div>


</div>

<div className=" absolute bottom-5 left-5">
<h1 onClick={set_register_active} className="flex items-center gap-2 cursor-pointer bg-white rounded-2xl px-2 py-1  hover:text-gray-600 text-sm "><span className="text-gray-500">new </span>  register</h1>
</div>

        </div>
    )


}