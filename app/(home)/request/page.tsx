import Image from "next/image"
import requestImage from "../../../public/assets/requestImage.png"
import RequestForm from "@/components/form/Request"

const page = () => {
  return (
    <div className="py-14 md:px-16 px-5 md:py-28 lg:flex gap-10 items-center">
      <section>
        <Image src={requestImage} alt="request Image"/>
      </section>
      <section className="lg:w-[55%]">
        <header className="text-3xl md:text-[52px] leading-[60px] text-purple-950 font-extrabold  pb-6 ">Request A Demo</header>
        <p className="pb-8">Explore Our Solutions in Action</p>
        <RequestForm/>
      </section>
    </div>
  )
}

export default page
