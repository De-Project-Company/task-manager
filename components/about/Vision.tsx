import Image from "next/image"
import vision from "../../public/assets/vision.png"

const Vision = () => {
  return (
    <div className="md:flex items-center py-14 md:px-16 px-5 md:py-28">
     <section>
        <header className="text-base text-purple-950 font-semibold">
        Feature one
        </header>
        <h1 className="text-3xl md:text-5xl text-purple-950 py-4 font-bold">
        Our Vision
        </h1>
        <p className="font-normal text-neutraly text-balance text-sm md:text-lg md:w-[80%] pb-6">
        At Traverse, we envision a world where individuals and teams effortlessly navigate their workdays, armed with precise time tracking and insightful productivity analytics. Our goal is to empower users to make informed decisions, fostering a more efficient and fulfilling work experience.
        </p>
    </section>
        <Image src={vision} width={600} height={660} alt="our vision"/>
    </div>
  )
}

export default Vision
