"use client"

import { RequestADemoSchema } from "@/schemas"
import { type } from "os"
import * as z from  "zod"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { cn } from "@/utils";
import { useState } from "react"
import Button from "../ui/Button"



type requestDemoData = {
    name: string,
    email: string,
    message: string
  }
  

const RequestForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const  {
        register,
        handleSubmit, 
        formState:{errors},
    } = useForm<requestDemoData>({resolver: zodResolver(RequestADemoSchema)})

    const submitHelper = (data:requestDemoData)=>{
        setIsLoading(true)
        var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: 'https://traverse-pgpw.onrender.com/api/v1/request',
            headers: { },
            data : data
          };
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            toast.success(response.data.message)
            setIsLoading(false)
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading(false)
            toast.error(error.response.data.message)
          });
    }
  return (
        <div>
        <form action="" method="post" onSubmit={handleSubmit(submitHelper)} className="w-full flex flex-col gap-6 text-grey-700">
          <label htmlFor="name" className="flex flex-col gap-3  text-lg font-medium">
              Name
              <input type="text" id="" className="w-full border border-neutraly rounded-md px-3 py-2" {...register("name")}/>
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <label htmlFor="email" className="flex flex-col gap-3 text-lg font-medium">
              Email Address
              <input type="email" id="" className="w-full border border-neutraly rounded-md px-3 py-2" {...register("email")}/>
          </label>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <label htmlFor="message" className="flex flex-col gap-3 text-lg font-medium">
              Message
              <textarea cols={30} rows={10} className="w-full border border-neutraly rounded-md px-3 py-2" {...register("message")}>
  
              </textarea>
          </label>
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
          <label htmlFor="check" className="flex gap-1">
              <input type="checkbox" name="check" id="" />
              <p>I accept the <Link href="#">Terms</Link> </p>
          </label>
          <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
            <Button
              disabled={isLoading}
              className={cn(
                "w-full rounded-md my-3",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
              type="submit"
              spinnerColor="#fff"
            >
              Submit
            </Button>
            {isLoading && (
              <div className="button--loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </form>
        <ToastContainer/>
      </div>
  )
}

export default RequestForm
