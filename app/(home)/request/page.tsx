import Image from "next/image"
import requestImage from "../../../public/assets/requestImage.png"

const page = () => {
  return (
    <div className="py-14 md:px-16 px-5 md:py-28 flex">
      <section>
        <Image src={requestImage} alt="request Image"/>
      </section>
      <section>

      </section>
    </div>
  )
}

export default page
