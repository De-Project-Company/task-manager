import traverse from "../../public/assets/traverseWhite.png"
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-purple-950 py-14 md:px-16 px-5 md:py-20">
      <div className="flex justify-center">
        <Image
          src={traverse}
          alt="traverse logo"
          className="bg-purple-50"
          width={200}
          height={200}
        />
      </div>
      <div
        className="flex justify-center gap-4 text-white text-sm md:text-base font-semibold text-center
   py-7"
      >
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/request">Request Beta</Link>
      </div>
      <hr />
      <div className="flex items-center text-white text-sm md:text-base font-normal justify-between py-2">
        <h1>
          &copy; {new Date().getFullYear()} Starters House. All rights reserved.
        </h1>
        <div className="flex items-center gap-3">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies Settings</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
