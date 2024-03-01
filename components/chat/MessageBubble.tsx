import React from "react";

interface MessageBubbleProps {
  message: {
    text: string;
    id: number;
    time: string;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  console.log({ message });
  return (
    <>
      <div className="flex justify-end gap-2.5 mb-4" key={message.id}>
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-500 
        rounded-t-xl rounded-l-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {message.username}
            </span> */}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {message.time}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {message.text}
          </p>
          {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {message.status}
          </span> */}
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
