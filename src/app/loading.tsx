"use client"
import logo from "@/assets/logo.png"
import Image from "next/image"
import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className='h-[80vh] text-white w-full grid place-content-center'>
      <motion.div initial={{scale: 0.5}} animate={{scale: 1}} transition={{infinity:true, duration: .5}}>
        <Image src={logo} alt="loading" width={80} className="" />
        </motion.div>
      <div className="spinner"></div>
    </div>
  )
}

export default Loading
