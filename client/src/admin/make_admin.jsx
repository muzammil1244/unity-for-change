

import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import { useState } from "react";


export const Make_admin = ({close})=>{
const [active_spinner,set_active_spinner] = useState(false)

const [register_data,set_register_data] = useState({
 
    user_password:"",
    user_email:"",
  
})

const register_data_handle = (e) => {
  const { name, type, placeholder, value } = e.target;
  console.log("Name:", name, "Type:", type, "Placeholder:", placeholder, "Value:", value);

  set_register_data((prev) => ({
    ...prev,
    [name]: value
  }));
};














const handle_post_data_to_backend = async (e) => {
  e.preventDefault();

  if (!register_data.user_password || !register_data.user_email) {
    return alert("Please fill all fields");
  }

  set_active_spinner(true);

  try {
    const api_data = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: register_data.user_email,
        password: register_data.user_password,
        role: "admin"
      })
    });

    const resData = await api_data.json();
    console.log("Response:", resData);

    if (api_data.status === 201) {
      alert("Admin created successfully!");
    } else {
      alert(resData.message || "Something went wrong");
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    set_active_spinner(false);
  }
};


    return(

   <div className="w-1/2 relative shadow-2xl h-fit py-5 overflow-hidden bg-white rounded-2xl ">
   
   <MdOutlineCancel onClick={close} className=" absolute top-5 left-5 size-5 cursor-pointer " />
   {/* header */}
   <div className="flex justify-center my-5 ">
<h1 className=" text-gray-600 text-lg">

Create <span className="text-gray-900">Admin</span> 

</h1>
   </div>
   
   <div className=" h-full  px-10 justify-center flex flex-col  items-center gap-4 ">
       
       <div className="flex gap-3">
         <div className="flex items-center w-full  gap-5">
        <MdOutlineMail/>
        <input required type="text" onChange={register_data_handle} name="user_email" placeholder="Enter Email" className=" px-2 border w-full rounded-xl py-2 "/>
       </div>
       
    <div className="flex items-center w-full  gap-5">
        <MdOutlinePassword/>
        <input required onChange={register_data_handle} type="password" name="user_password" placeholder="Enter Password" className=" px-2 border w-full rounded-xl py-2 "/>
       </div> 
       </div>
      
       
       

       <div className="px-5 w-full mt-10">
               <button onClick={handle_post_data_to_backend} className="bg-black w-full hover:bg-gray-900 duration-150 cursor-pointer text-white textsm items-center py-2 rounded-xl">{active_spinner?<div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin"></div>
    </div>:<span>Register</span>}</button>

       </div>
       
       
      
   </div>


   
   
 
   
           </div>

    )
}