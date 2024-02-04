import NAVLINKS from "@/constants";
import Link from "next/link";
import Image from "next/image";

export const Nav = () => {
  return (
    <nav>
      <header className="md:flex justify-between items-center py-3 md:px-16 px-5">
        <div>
          <Image
            src="/assets/Traverse.png"
            alt="traverse logo"
            width={150}
            height={150}
          />
        </div>
        <div className="md:text-base text-xs font-semibold flex items-center justify-between md:gap-4">
          <button className="text-purple-600 bg-purple-50 px-5 py-3 hover:bg-purple-600 hover:text-purple-50 border border-[#ECEBFF] rounded-lg">
            Employer
          </button>
          <button className="rounded-lg shadow shadow-xs bg-purple-900 text-white px-5 py-3 hover:bg-white hover:border hover:border-purple-600 hover:text-purple-600">
            Signup as User
          </button>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-2 lg:justify-between border-t-2 py-8 md:px-16 px-5">
        {NAVLINKS.map((item) => (
          <Link
            href={item.link}
            className="flex items-center gap-2 hover:bg-purple-50 px-2 py-3 rounded-lg"
            key={item.title}
          >
            <Image
              src="/assets/strongbox.svg"
              alt="link icon"
              width={40}
              height={40}
            />
            <div>
              <h4 className="text-sm md:text-base font-semibold text-purple-900">
                {item.title}
              </h4>
              <p className="text-[12px] md:text-sm font-normal tracking-[-0.1px] text-[#6B7B8F]">
                {item.descText}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="bg-purple-50 text-center py-4">
        <Link href="#">Looking for a new career? Get in touch</Link>
      </div>
    </nav>
  );
};
