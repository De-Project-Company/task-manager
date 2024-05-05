"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ChatData from "./dummyData";
import ChatBody from "./ChatBody";
import { CiMenuKebab } from "react-icons/ci";
import WorkInProgress from "../CommingSoon";
import CommingSoon from "@/components/ComminSoon";

// TODO: We will work on the mobile view when we finally finish this with socket.io
// FIXME: the dummy data should be deleted and please leave a comment :)
// FIXME: i am basically passing the selected object from the ChatSystem to the ChatBody, and then, to the MessageBubble

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
    <>
      <CommingSoon />
    </>
  );
};

export default ChatSystem;

//   <section className="chat pt-3 md:pb-1 px-3 h-fit overflow-hidden">
//         <h2 className="text-[#1B0354] font-bold text-2xl "> Chats </h2>

//         <div className="chat-chat mt-5 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-5 relative">
//           {/* Active user wrapper :) */}
//           <div className=" py-4 bg-[#F7F7F8] relative h-screen md:max-h-[500px] overflow-hidden overflow-y-scroll">
//             <div className="flex items-center absolute w-full top-6 z-20 right-0 justify-between mb-2 px-3">
//               <h3 className="font-bold text-xl">Active Users</h3>
//               <CiMenuKebab className="rotate-90 text-black text-xl cursor-pointer" />
//             </div>

//             <div className="overflow-y-scroll mt-[50px]">
//               {ChatData.map((data, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleUserClick(data)} // Pass the user data to handleUserClick function
//                   className="cursor-pointer flex space-x-4 my-1 py-2 hover:bg-gray-200 px-3"
//                 >
//                   <div className="wrapper relative ">
//                     <div className="imgWrapper h-[40px] w-[40px] rounded-full overflow-hidden relative">
//                       <Image
//                         src={data.userImg}
//                         alt={data.username + data.role + "profile-image "}
//                         className="h-full w-full object-cover"
//                         height={100}
//                         width={100}
//                       />
//                     </div>
//                     <span
//                       className={`${
//                         data?.status === "Online"
//                           ? "bg-green-500"
//                           : data?.status === "busy"
//                           ? "bg-gray-700"
//                           : data?.status === "Away"
//                           ? "bg-red-500"
//                           : "bg-gray-700" // Default to gray if status is not matched
//                       } h-3 w-3 rounded-full absolute bottom-0 block right-0 z-20`}
//                     ></span>
//                   </div>

//                   <div className="rhgt ">
//                     <p className="-mb-2">{data?.username}</p>
//                     <span className="text-gray-500 text-xs ">{data?.role}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="wrap col-span-2 overflow-y-hidden h-full">
//             <ChatBody selectedUser={selectedUser} />
//           </div>
//         </div>
//       </section>
