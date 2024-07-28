"use client"
import logo from "@/assets/logo.png"
import Image from "next/image"
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className='h-[80vh] text-white w-full grid place-content-center'>
        <Image src={logo} alt="loading" width={100} className="animate-lazy" />
    </div>
  )
}

export default Loading
