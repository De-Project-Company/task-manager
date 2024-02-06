import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <>
      <section className="py-14 md:py-28 flex flex-col items-center justify-center text-[#6B7B8F]">
        <h1 className="text-center text-balance md:leading-[68px] text-4xl md:text-[64px] font-bold text-purple-950 pb-6">
          Welcome to Traverse - Your <br />
          Ultimate Time Tracking <br /> Companion!
        </h1>
        <p className="text-center md:text-lg text-sm text-[#6B7B8F] md:w-[42%] pb-9">
          Maximize productivity with our intuitive time tracking app. Traverse
          empowers you to effortlessly manage your project hours, track app and
          web usage, and seamlessly sync data, even when offline.
        </p>
        <Link
          href="#"
          className="rounded-lg shadow shadow-xs bg-purple-900 text-white px-5 py-3 hover:bg-white hover:border hover:border-purple-600 hover:text-purple-600 md:text-base text-xs "
        >
          Get Started
        </Link>
      </section>
      <div className="flex items-center justify-center px-5 md:px-0 pb-14 md:pb-28">
        <Image
          src="/assets/HeroImage.png"
          alt="Hero Image"
          width={1200}
          height={700}
        />
      </div>
    </>
  );
};
