import Image from "next/image";
import React from "react";

const RightSection = () => {
  return (
    <>
      <div className="rounded-[24px] bg-[#1B0354] relative h-full w-full flex justify-center items-center">
        <p className="font-bold text-white absolute left-0 right-0 bottom-1/4 mx-auto text-2xl translate-y-10 text-center w-3/5">
          Sign up today and embrace a future of innovation.{" "}
        </p>
        <Image
          src="/assets/Group_Mac.svg"
          alt="floating_vector"
          height={100}
          width={100}
          priority={true}
          className="h-full w-full z-10 absolute"
        />
        <Image
          src="/assets/circle.svg"
          alt="floating_vector"
          height={100}
          width={100}
          className=" h-44 w-44 absolute left-0 -translate-y-36 rotate-180"
        />
        <Image
          src="/assets/circle.svg"
          alt="floating_vector"
          height={100}
          width={100}
          className=" h-44 w-44 absolute right-0 translate-y-10"
        />
      </div>
    </>
  );
};

export default RightSection;
