import React from "react";
import Sidebar from "../components/Sidebar";
import { assets } from "../assets/assets";
import Topbar from "../components/Topbar";
import Bottombar from "../components/Bottombar";
import ChattingArea from "../components/ChattingArea";

import { authStore } from "../store/authStore";

import { chatStore } from "../store/chatStore";
import NoSelectedUser from "../components/NoSelectedUser";

const Homepage = () => {
  //Store
  const { logOut } = authStore();
  const { selectedUser } = chatStore();

  return (
    <div className=" w-full h-full p-1  overflow-hidden">
      <div className="w-full  h-full">
        {/* COMPONENTS */}
        <div className="w-full h-full flex">
          <div className="w-3/12 h-full">
            <Sidebar />
          </div>

          <div className="w-9/12 h-full p-2 flex flex-col gap-1 mt-2 ">
            {selectedUser ? (
              <>
                <Topbar />
                <div className="flex-1 overflow-y-auto">
                  <ChattingArea />
                </div>
                <Bottombar />
              </>
            ) : (
              <NoSelectedUser />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
