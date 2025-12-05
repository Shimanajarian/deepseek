'use client'
import { assets } from "@/assets/assets"
import Message from "@/components/Message"
import PromptBox from "@/components/PromptBox"
import Sidebar from "@/components/Sidebar"
import Image from "next/image"
import { useState } from "react"

export default function Home() {
const [expand,setExpand]=useState(false)
const [messages,setMessages]=useState([])
const [isLoading,setIsLoading]=useState(false)

return (
    <div >
<div className="flex h-screen">
<Sidebar expand={expand} setExpand={setExpand}/>
<div className="flex-1 flex flex-col items-center justify-center px-4
text-white relative bg-[#292a2d] pb-8
">
<div className="md:hidden absolute px-4 flex items-center justify-between w-full top-6">
  <Image onClick={()=>(expand ? setExpand(false) :setExpand(true))}  className='rotate-180'  src={assets.menu_icon} alt=""/>
  <Image  className="opacity-70"   src={assets.chat_icon} alt=""/>

</div>
{messages.length ===0 ?(<>
<div className="flex items-center gap-2">
  <Image src={assets.logo_icon}   className="h-16"  alt=""/>
 <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
 </div>
<p className="mt-2 text-sm">How Can I help you today?</p>
</>)
:(<div>
  <Message user='role' content='what is next'            />
</div>)}
<PromptBox isLoading={isLoading}  setIsLoading={setIsLoading}  />
<p className="text-gray-500 bottom-2 absolute text-xs">AI-generated, for reference only </p>






</div>






</div>



    </div>)
  }