// ChatBody.tsx
import React, { useState } from "react";
import Button from "../ui/Button";
import MessageBubble from "./MessageBubble";

interface ChatBodyProps {
  selectedUser: {
    id: string;
    username: string;
    userImg: string;
    role: string;
    status: string;
    messages: {
      text: string;
      id: number;
      time: string;
    }[];
  };
}

const ChatBody: React.FC<ChatBodyProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState(selectedUser.messages);
  const [messageText, setMessageText] = useState("");

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Sending message:", messageText);

    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      time: new Date().toLocaleString(),
    };

    setMessages([...messages, newMessage]);

    setMessageText("");
  };

  return (
    <div className=" bg-[#F7F7F8] h-full overflow-hidden relative">
      {/* Displaying messages */}
      <div
        className=" flex flex-col justify-end overflow-y-scroll px-2 py-2 relative"
        style={{ height: "calc(100% - 42px) " }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="relative">
            <MessageBubble message={msg} />
          </div>
        ))}
      </div>

      {/* add message form */}
      <div className="absolute w-full h-[42px] bottom-2 ">
        <form onSubmit={handleSubmitMessage} className="">
          <div className="inputWrapper flex items-center">
            <input
              type="text"
              placeholder="Type to message"
              id="name"
              name="name"
              className="w-full rounded-md  border border-gray-200 md:py-3 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
              value={messageText}
              onChange={handleChangeMessage}
            />
            <Button type="submit" className="rounded-md px-7">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBody;
