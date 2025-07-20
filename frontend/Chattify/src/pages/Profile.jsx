import React from "react";
import { assets } from "../assets/assets";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { authStore } from "../store/authStore";

const Profile = () => {
  const { authUser, updateProfile } = authStore();

  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      fileRef.current = file;
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = () => {
    if (!fileRef.current) {
      return toast.error("Please upload the file first");
    }

    const formData = new FormData();
    formData.append("imageFile", fileRef.current);

    updateProfile(formData);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 overflow-hidden">
      <div className="min-h-screen w-screen relative">
        {/* Background image */}
        <div className="min-h-screen w-screen relative z-0">
          <img
            src={assets.loginImage}
            className="clip-background h-screen w-full object-cover"
            alt="Background"
          />
        </div>

        {/* Overlay container */}
        <div className="bg-white w-4/6 h-4/5 p-3 absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-[60px]">
          {/****************** Headings ********************************* */}
          <div className="absolute text-center top-10 left-[68%]">
            <div className="text-8xl font-bold font-Bangers">
              <p>Profile</p>
            </div>
          </div>

          <div className="w-full h-full ">
            <div className="w-full h-full ">
              <img
                src={assets.loginImage}
                className="clip-background w-full h-full object-cover relative rounded-[55px]"
                style={{ clipPath: "polygon(0 0, 59% 0, 46% 100%, 0% 100%)" }}
              />
            </div>

            {/* Profile */}
            <div className="w-5/12 relative left-[57%] flex flex-col gap-10 items-center p-4 bottom-[80%] ">
              {/* IMAGE */}
              <div>
                {image ? (
                  // 👉 Show image preview
                  <img
                    src={image}
                    className="size-45 border-4 rounded-full border-violet-300"
                  />
                ) : authUser?.user?.profilePic ? (
                  // 👉 Show image from DB if exists
                  <img
                    src={authUser.user.profilePic}
                    className="size-45 border-4 rounded-full border-violet-300"
                  />
                ) : (
                  // 👉 Show default icon
                  <img
                    src={assets.userIcon}
                    className="size-45 border-4 rounded-full border-violet-300"
                  />
                )}

                {/* File Upload Icon */}
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={() => fileInputRef.current.click()}
                  className="relative left-[80%] text-red-600 bottom-12 border-4 bg-violet-300 cursor-pointer p-2 rounded-full"
                />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  type="file"
                  name="imageFile"
                  id="profile_pic"
                  className="hidden"
                />
              </div>

              <div className="w-full  flex flex-col gap-3 items-center">
                <div className="w-4/6 font-Outfit border-2 border-gray-300 p-3 text-start rounded-2xl">
                  <p>{authUser.user.name}</p>
                </div>

                <div className="w-4/6 font-Outfit border-2 border-gray-300 p-3 text-start rounded-2xl">
                  <p>{authUser.user.email}</p>
                </div>

                <button onClick={handleUpdateProfile} className="btn btn-wide font-Outfit text-lg hover:bg-violet-300 hover:text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
