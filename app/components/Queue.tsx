"use client"
import QueueItem from "./QueueItem"
interface QueueType {
    fileSize : number ,
    name:string ,
    progress:number
  }
  
function Queue({sendQueue , receiveQueue}:{
    sendQueue:QueueType[] ,
    receiveQueue:QueueType[]
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-10 w-full">
    <div className="w-full sm:w-[48%]">
      <div className="font-lexend text-black text-xl mb-4">Sending Queue</div>
        {sendQueue.length<1 && <div className="font-lexend text-black text-sm self-center mb-4">Empty Queue</div> }

        {sendQueue.map((element , index)=><QueueItem key={index} fileName={element.name} progress={element.progress} size={element.fileSize}/>)}
    </div>
    <div className="w-full sm:w-[48%] mt-6 sm:mt-0">
      <div className="font-lexend text-black text-xl mb-4">Receiving Queue</div>
      {receiveQueue.length<1 && <div className="font-lexend text-black text-sm self-center mb-4">Empty Queue</div> }
      {receiveQueue.map((element , index)=><QueueItem key={index} fileName={element.name} progress={element.progress} size={element.fileSize}/>)}

      
    </div>
  </div>
  )
}

export default Queue