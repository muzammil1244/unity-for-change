import { ImCancelCircle } from "react-icons/im";


export const  Zoom = ({data})=>{

    return(
        <div className="max-w-[60%] w-fit max-h-[90%] md:w-1/2 md:h-[90%] h-fit overflow-hidden">

<img className="w-full rounded-2xl object-contain h-full" src={data} alt="url" />

        </div>
    )



}