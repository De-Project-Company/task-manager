import Image from "next/image";
import Link from "next/link";

function Empty() {
  return (
    <section className="h-full w-full">
      <div className="flex flex-col items-center justify-center px-4 h-full">
        <Image
          src="/empty.jfif"
          width={626}
          height={626}
          alt="Empty Project Illustration"
          // className="dark:invert"
        />
        <span className="mb-6">You have no project yet</span>
        <Link
          href="/create-project"
          className="rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 py-4 text-center hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
        >
          create project
        </Link>
      </div>
    </section>
  );
}

export default Empty;
