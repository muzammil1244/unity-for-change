import { useState } from "react";
import { HiArrowCircleUp } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";

export const Report = ({ active_roport, active }) => {
  const [message_data, set_message_data] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(active_roport,"activereportdata")
  const token = localStorage.getItem("token")
  const handle_report_message = async () => {
    if (!message_data.trim()) {
      alert("Message required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`https://unity-for-change-ggbn.onrender.com/api/client/report/${active_roport.post_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
     
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: message_data }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Report submitted successfully ✅");
        set_message_data(""); // clear field
        active()
        window.location.reload()
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  console.log(active_roport)

  return (
    <div className="md:w-1/2 w-[80%] md:h-full overflow-y-scroll px-5 py-5 bg-white rounded-2xl">
      <div className="relative">
        <IoMdArrowRoundBack onClick={active} size={15} className="absolute cursor-pointer " />
        <h1 className="w-full text-center">Report to Admin </h1>
      </div>
      <div className="flex gap-5 mt-5 items-center ">
        <img className="size-15  rounded-full " src={`https://unity-for-change-ggbn.onrender.com/uploads/${active_roport.image}`} alt="" />
        <div className="flex-col gap-3">
          <h1 className="text-sm ">{active_roport.name}</h1>
          <p className="text-sm text-gray-500">{active_roport.email}</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="md:text-sm text-[12px]">
          Reported posts will be reviewed by the admin team. Misuse of the
          report option is strictly prohibited. Appropriate disciplinary action
          may be taken, including warning, suspension, or ba
        </p>
      </div>
      <div className="w-full mt-3 h-fit shadow rounded-2xl">
        <textarea
          onChange={(e) => set_message_data(e.target.value)}
          value={message_data}
          placeholder="Message... !"
          className="w-full rounded-xl outline-0 border-2 p-4 border-gray-400"
          rows={10}
          maxLength={500}
          name="report_text"
          id=""
        ></textarea>
      </div>
      <div className="flex gap-10 justify-center mt-6 items-center px-5 w-full">
        <div className="flex gap-2 items-center">
          <img
            className="size-8 rounded-full "
            src={`https://unity-for-change-ggbn.onrender.com/uploads/${active_roport.user_profile}`}
            alt=""
          />
          <p className="text-gray-600 text-sm">{active_roport.user_email}</p>
        </div>

        <button
          onClick={handle_report_message}
          disabled={loading}
          className="md:px-3 px-2 py-1 hover:bg-gray-600 md:text-sm text-[12px] duration-200 cursor-pointer  bg-black text-white rounded"
        >
          {loading ? <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin"></div>
    </div> : "Submit"}
        </button>
      </div>
    </div>
  );
};
