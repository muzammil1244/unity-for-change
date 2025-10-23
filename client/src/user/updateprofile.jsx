import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { PiUploadSimple } from "react-icons/pi";

export const UpdateProfile = ({ activeprofileupdat }) => {
  const [updatedata, setupdatedata] = useState({
    coverimage: "",
    profileimage: "",
    name: "",
    description: "",
    gender: "",
  });

  const token = localStorage.getItem("token")

  const handle_update_Profile = (e) => {
    const { name, type, value, files } = e.target;
    setupdatedata((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };



   const On_submite = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (updatedata.coverimage) {
        formData.append("cover_image", updatedata.coverimage);
      }
      if (updatedata.profileimage) {
        formData.append("profileimage", updatedata.profileimage);
      }
      formData.append("username", updatedata.name);
      formData.append("aboute_user", updatedata.description);
      formData.append("gender", updatedata.gender);

      const res = await fetch("http://localhost:8000/api/client/update_profile", {
        method: "PUT",
        headers:{
"Authorization":` Bearer ${token}`
        },
        body: formData,
        
      });

      const data = await res.json();
      activeprofileupdat()
      window.location.reload()
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="md:w-2/3 w-[80%] h-5/6 rounded-2xl overflow-y-scroll bg-white">
      {/* icon cancel */}
      <div onClick={activeprofileupdat} className="w-fit h-fit absolute top-3 left-5 cursor-pointer">
        <ImCancelCircle size={18} className="text-gray-300" />
      </div>

        <form onSubmit={On_submite} className="w-full h-full px-3 py-3">
        {/* Cover Image Section */}
        {updatedata.coverimage ? (
          <div className="w-full overflow-hidden h-50 bg-red-200">
            <img
              className="w-full h-full"
              src={URL.createObjectURL(updatedata.coverimage)}
              alt="Cover preview"
            />
          </div>
        ) : (
          <div className="w-full rounded-2xl overflow-hidden flex justify-center border border-blue-400 hover:bg-gray-50 cursor-pointer duration-200">
            <label
              className="w-full h-full cursor-pointer flex justify-end px-10"
              htmlFor="cimage"
            >
              <h1 className="flex gap-3 py-3 items-center">
                cover image <PiUploadSimple />
              </h1>
            </label>
            <input
              onChange={handle_update_Profile}
              className="hidden"
              type="file"
              name="coverimage"
              id="cimage"
            />
          </div>
        )}

        {/* Profile Image Section */}
        <div className="w-full h-fit flex flex-col items-center -mt-15">
          <div className="md:size-30 size-20 overflow-hidden rounded-full bg-white shadow border-4 border-white">
            {updatedata.profileimage ? (
              <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(updatedata.profileimage)}
                alt="Profile preview"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-gray-100">
                <label
                  htmlFor="pimage"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <PiUploadSimple className="mb-1" />
                  <span className="text-xs">Upload profile</span>
                </label>
              </div>
            )}
          </div>
          <input
            onChange={handle_update_Profile}
            className="hidden"
            type="file"
            name="profileimage"
            id="pimage"
          />

          {/* Additional Form Fields */}
          <div className="w-full mt-5 space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={updatedata.name}
                onChange={handle_update_Profile}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={updatedata.description}
                onChange={handle_update_Profile}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={updatedata.gender}
                onChange={handle_update_Profile}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};