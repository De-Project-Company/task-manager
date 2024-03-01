"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ChatData from "./dummyData";
import ChatBody from "./ChatBody";
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";

const ChatSystem: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    username: "",
    userImg: "",
    role: "",
    status: "",
    messages: [],
  });

  const handleUserClick = (data: any) => {
    setSelectedUser(data);
    console.log(selectedUser);
  };

  useEffect(() => {
    if (selectedUser.username) {
      console.log(selectedUser);
      alert(selectedUser.username);
    }
  }, [selectedUser]);

  return (
    <section className="chat p-3 ">
      <h2 className="text-[#1B0354] font-bold text-2xl "> Chats </h2>

      {/* Chat section */}
      <div className="chat-chat mt-5 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5 relative">
        <div className=" py-4 bg-[#F7F7F8] relative w-full">
          <div className="flex items-center justify-between mb-2 px-3 w-full">
            <h3 className="font-bold text-xl ">Active Users</h3>
            <CiMenuKebab className="rotate-90 text-black text-xl cursor-pointer" />
          </div>

          <div className="overflow-y-scroll mt-[50px]">
            {ChatData.map((data, index) => (
              <div
                key={index}
                onClick={() => handleUserClick(data)} // Pass the user data to handleUserClick function
                className="cursor-pointer flex space-x-4 my-1 py-2 hover:bg-gray-200 px-3"
              >
                <div className="wrapper relative ">
                  <div className="imgWrapper h-[40px] w-[40px] rounded-full overflow-hidden relative">
                    <Image
                      src={data.userImg}
                      alt={data.username + data.role + "profile-image "}
                      className="h-full w-full object-cover"
                      height={100}
                      width={100}
                    />
                  </div>
                  <span
                    className={`${
                      data?.status === "Online"
                        ? "bg-green-500"
                        : data?.status === "busy"
                        ? "bg-gray-700"
                        : data?.status === "Away"
                        ? "bg-red-500"
                        : "bg-gray-700" // Default to gray if status is not matched
                    } h-3 w-3 rounded-full absolute bottom-0 block right-0 z-20`}
                  ></span>
                </div>

                <div className="rhgt ">
                  <p className="-mb-2">{data?.username}</p>
                  <span className="text-gray-500 text-xs ">{data?.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wrap relative col-span-2">
          <ChatBody selectedUser={selectedUser} />
        </div>
      </div>
    </section>
  );
};

export default ChatSystem;
