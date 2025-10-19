
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { IoIosMale } from "react-icons/io";
import Select from 'react-select';
import { IoIosFemale } from "react-icons/io";
import { GoSignIn } from "react-icons/go";
import { useState } from "react";


export const Register = ({set_login_active,off_register})=>{
const [active_spinner,set_active_spinner] = useState(false)

const [register_data,set_register_data] = useState({
    user_name:"",
    user_password:"",
    user_email:"",
    user_gender:""
})

const register_data_handle = (e) => {
  const { name, type, placeholder, value } = e.target;
  console.log("Name:", name, "Type:", type, "Placeholder:", placeholder, "Value:", value);

  set_register_data((prev) => ({
    ...prev,
    [name]: value
  }));
};



const handle_Gender_Change = (selectedOption) => {
  set_register_data((prev) => ({
    ...prev,
    user_gender: selectedOption.value
  }));
};




    const options = [
  { value: 'male', label: 'Male', icon: <IoIosMale /> },
  { value: 'female', label: 'Female', icon: <IoIosFemale /> }
];



const IconOption = (props) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div ref={innerRef} {...innerProps} className=" flex items-center cursor-pointer  gap-5 px-10 ">
      <span style={{ marginRight: '8px' }}>{data.icon}</span>
      {data.label}
    </div>
  );
};



const handle_post_data_to_backend=async(e)=>{
e.preventDefault()

if(!register_data.user_name || !register_data.user_email || !register_data.user_password){
  return false
}
set_active_spinner(true)

  try{
    const api_register_data = new FormData()

    api_register_data.append("username",register_data.user_name)
    api_register_data.append("email",register_data.user_email)
    api_register_data.append("password",register_data.user_password)
    api_register_data.append("gender",register_data.user_gender)

    const api_data = await fetch("http://localhost:8000/auth/register",{
      method:"POST",
      body: api_register_data
    })
    set_login_active(false)
    off_register()
set_login_active()
    console.log("submitted")
  }catch(err){
   return console.log(err)
  }

}

    return(

   <div className="w-1/2 relative shadow-2xl h-full overflow-hidden bg-white rounded-2xl ">
   
   {/* header */}
   
   <div className="w-full  flex relative justify-center py-4">
       <IoMdArrowRoundBack onClick={off_register} className=" absolute cursor-pointer top-5 left-3 hover:scale-110"/>
       <h1 className="font-bold text-xl border-b pb-2 flex gap-2 items-center  "> Register </h1>
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
      
       
       <div className="flex w-full   gap-3">

         <div className="flex items-center w-full  gap-5">
        <FaRegUser/>
        <input required onChange={register_data_handle} type="text" name="user_name" placeholder="Enter user name" className=" px-2 border w-full rounded-xl py-2 "/>
       </div>

  <div className="flex items-center  w-full  gap-5">
        <MdOutlineMail className=" opacity-0"/>
 <Select 
 name="user_gender"
 onChange={handle_Gender_Change }
 className="w-full outline-0"
      options={options}
      components={{ Option: IconOption }}
    />
       </div>
       </div>

       <div className="px-5 w-full mt-10">
               <button onClick={handle_post_data_to_backend} className="bg-black w-full hover:bg-gray-900 duration-150 cursor-pointer text-white textsm items-center py-2 rounded-xl">{active_spinner?<div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin"></div>
    </div>:<span>Register</span>}</button>

       </div>
       
       
      
   </div>


   <div onClick={set_login_active} className="flex cursor-pointer hover:text-gray-700 absolute bottom-5 gap-1 left-5 items-center">
  <GoSignIn className="text-gray-500"/>
   <h1 className="text-sm">signin</h1>
   </div>
   
 
   
           </div>

    )
}