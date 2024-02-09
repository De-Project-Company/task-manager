import aboutHeroImage from "../../public/assets/aboutHeroImage.png"
const Hero = () => {
  return (
    <div className="flex flex-col hero justify-center items-center z-0 w-full min-h-[calc(100vh-5rem)] bg-no-repeat lg:bg-cover text-center text-white relative px-5"
    style={{ backgroundImage: `url(${aboutHeroImage.src})`}}>
      <div className="z-10 md:w-[60%]">
      <h1 className="text-4xl md:text-[64px] font-bold md:leading-[68px] pb-6">
      Elevating Productivity with Traverse
      </h1>
      <p className="text-sm md:text-lg text-balance">
      Welcome to Traverse, where time isn&apos;t just measured; it&apos;s optimized for your success. We understand the nuances of time management, the delicate balance of juggling tasks, and the pursuit of excellence in every moment. Traverse is more than a time tracking solution; it&apos;s your dedicated partner in navigating the complexities of the modern work landscape.
      </p>
      </div>
    </div>
  )
}

export default Hero
