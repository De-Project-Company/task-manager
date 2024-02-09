import { apartInfo } from "@/constants"
import Image from "next/image"

const SetsApart = () => {
  return (
    <div className="bg-purple-25 py-14 md:px-16 px-5 md:py-28">
      <h1 className="text-3xl font-bold text-purple-950 md:text-[52px] md:leading-[60px] pb-14 md:pb-20">What Sets Us Apart</h1>
      <section className="flex justify-between flex-wrap md:flex-nowrap">
        {apartInfo.map(items =>( 
        <div className="flex flex-col w-[380px] pb-10" key={items.heading}>
            <div>
            <Image src={items.image} width={380} height={200} alt={items.heading}/>
            </div>
            <h4 className="pb-4 pt-8 text-purple-950 font-bold text-2xl">{items.heading}</h4>
            <p className="text-base font-normal text-pretty text-neutraly ">{items.desc}</p>
        </div>
        ))}
      </section>
    </div>
  )
}

export default SetsApart
