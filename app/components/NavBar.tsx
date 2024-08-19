import { MdContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';
import Link from 'next/link';
function NavBar({ status, peerId }:{
  status:boolean ,
  peerId:string
}) {

  const copy= ()=>{
    navigator.clipboard.writeText(peerId)
    toast.success("Copied " , {
      position:'bottom-center' ,
      duration:2000 ,
      

    })
  }
  return (
    <div className="relative w-full bg-gray-100 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-2 px-6">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
          <Link href={"/"}>
          <div className="ml-4 [font-family:'Lexend-Regular',Helvetica] text-black tracking-[0] leading-[42px] whitespace-nowrap text-[28px]">
            SecureTransfer
          </div>
          </Link>
          <div className="flex [font-family:'Manrope-Regular',Helvetica] text-[#171a1f] leading-9 sm:leading-[42px]">
            PEER ID: {peerId}  
            <MdContentCopy className='ml-3 self-center cursor-pointer' onClick={copy}/>

          </div>
        </div>
        <div className="flex items-center space-x-6 mt-1 sm:mt-0">
          <button
            className={`px-3 rounded-md text-white [font-family:'Manrope-Regular',Helvetica] leading-9 text-[10px] sm:text-[13px] ${
              status ?  'bg-[#62CD14FF]' : 'bg-[#DE3B40FF]'
            }`}
          >
            {status?"CONNECTED" : "DISCONNECTED"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar;


// export default NavBar
