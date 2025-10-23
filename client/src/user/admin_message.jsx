
import { FiInfo } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";

export const Admin_message = ({data,active_message_container})=>{
    return(
        <div className="w-full shadow overflow-y-scroll scrollbar-hide relative h-full ">
<div className='w-full h-fit flex justify-center  items-center '>
<IoMdArrowRoundBack onClick={active_message_container} className="absolute cursor-pointer top-0 left-0"/>
<h1 className=' font-bold text-lg'>Message From Admin
    </h1> 


</div>
<div className="w-full h-full px-5  mt-10">
    <h1 className="flex gap-4 md:text-sm text-[12px] items-center">
<FiInfo className=" md:size-3 size-5" />
        Only admins can message you regarding your report and content actions; you cannot message them.
    </h1>
<div className="flex  mt-6  flex-col gap-4 ">
    {
        data?.authermessage?.map((item,index)=>{
            return <p className="w-full rounded-xl  shadow px-5 py-3 h-fit">

{item}

            </p>
        })
    }
</div>


</div>
        </div>
    )
}