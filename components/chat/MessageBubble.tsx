import { format, parse } from "date-fns";
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

  const convertTime = (time: string) => {
    const parsedTime = parse(time, "dd/MM/yyyy, HH:mm:ss", new Date());
    const formattedTime = format(parsedTime, "h:ma");
    return formattedTime.toLocaleLowerCase();
  };
  return (
    <>
      <div className="flex justify-end gap-2.5 mb-2 relatve" key={message.id}>
        <div
          className="flex flex-col w-fit max-w-[320px] leading-1.5 p-2 border-gray-200 bg-[#d6d6d6] 
        rounded-t-xl rounded-l-xl relative"
        >
          <div className="rtl:space-x-reverse relative bg-red-400">
            {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {message.username}
            </span> */}
          </div>
          <span className="font-normal text-gray-500 absolute text-xs bottom-0 -left-12">
            {convertTime(message.time)}
          </span>

          <p className="text-sm font-normal py-1 text-gray-900">
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
