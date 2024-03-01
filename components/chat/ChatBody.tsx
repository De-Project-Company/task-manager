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
    <div className=" bg-[#F7F7F8] px-3 py-4 h-full relative overflow-hidden">
      {/* Displaying messages */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <MessageBubble message={msg} />
          </div>
        ))}
      </div>
      {/* add message form */}
      <div className="fixed bottom-0">
        <form
          onSubmit={handleSubmitMessage}
          className=" bottom-0 bg-red-200 block"
        >
          <div className="inputWrapper flex items-center space-x-4">
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
