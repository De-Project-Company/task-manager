"use client"
import Image from "next/image"
import { useState } from "react"
import  ArrowUp  from "../../public/assets/arrowUp.svg"
import  ArrowDown  from "../../public/assets/arrowDown.svg"
const Details = ({questions, answer}) => {
    const [isOpen, setIsOpen] = useState(false)
    function handleOpen(){
        if(answer){
            setIsOpen(!isOpen)
        }
    }
  return (
    <details>
      <summary onClick={handleOpen} className="flex text-base font-semibold md:text-lg items-center cursor-pointer justify-between gap-8">{questions} <Image src={isOpen ? ArrowUp : ArrowDown} style={{width: "18px"}} alt="icon"/></summary>

      <p>{answer}</p>
    </details>
  )
}

export default Details
