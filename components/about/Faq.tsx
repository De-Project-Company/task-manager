import Link from "next/link";
import Details from "./Details";
import { faqs } from "@/constants";
const Faq = () => {
  return (
    <div className="py-14 md:px-16 px-5 md:py-28 flex items-center justify-center text-purple-950 text-center transition-colors duration-500 bg-purple-50 dark:bg-primary/90">
      <div className="md:w-[62%]  dark:text-white">
        <h1 className="pb-6 text-3xl font-bold md:text-[52px] md:leading-[60px] dark:text-white">
          Frequently asked questions
        </h1>
        <p className="text-base md:text-lg font-normal">
          Frequently asked questions ordered by popularity. Remember that if the
          visitor has not committed to the call to action, they may still have
          questions (doubts) that can be answered.
        </p>
        <section className=" text-start border-t-2 md:my-20 my-14 border-purple-950 ">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="border-b-2 border-purple-950 py-5 dark:border-white"
            >
              <Details questions={item.question} answer={item.answer} />
            </div>
          ))}
        </section>
        <section className="flex flex-col gap-3 items-center">
          <h4 className="text-3xl font-bold">Still have questions?</h4>
          <p className="text-lg font-normal">
            Support details to capture customers that might be on the fence.
          </p>
          <Link
            href="#"
            className="rounded-lg shadow shadow-xs bg-purple-900 text-white px-5 py-3 hover:bg-white hover:border hover:border-purple-600 hover:text-purple-600 md:text-base text-xs "
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Faq;
