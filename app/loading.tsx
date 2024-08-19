import React from "react";
import { CgServer } from "react-icons/cg";
import { GrConnect } from "react-icons/gr";
import { LuSplitSquareVertical, LuUploadCloud } from "react-icons/lu";
import { FaRegPaperPlane } from "react-icons/fa";

const SkeletonLoader = () => (
  <div className="w-screen h-screen overflow-x-hidden">
    <div className="relative w-full bg-white shadow-lg">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-2 px-6">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
        <div className="ml-4 h-5 mb-2 sm:smb-0 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-2 mb-2 sm:smb-0">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="flex items-center space-x-6 mt-1 sm:mt-0">
        <div className="px-3 h-6 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div>
    <div className="mt-3 sm:mt-5 p-4">
      <div className="relative w-full bg-white mx-auto p-4 shadow-lg">
        <div className="relative font-lexend text-black text-2xl leading-9 mb-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center border border-solid rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
            <CgServer size={24} className="text-[#171a1f] mr-2 opacity-30" />
            <div className="p-1 outline-none rounded w-full h-8 bg-gray-200 animate-pulse"></div>
            <button className="bg-gray-200 rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 ml-2 animate-pulse">
              <GrConnect size={20} className="w-4 h-4 mr-2 opacity-30" />
              Connect
            </button>
          </div>
          <div className="flex items-center border border-solid rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
            <LuSplitSquareVertical size={40} className="text-[#171a1f] mr-2 opacity-30" />
            <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
            <div className="p-1 outline-none rounded w-full h-8 bg-gray-200 animate-pulse"></div>
            <div className="font-manrope text-[#171a1f] text-sm leading-[22px] ml-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-10"></div>
            </div>
          </div>
          <div className="flex items-center border border-solid  rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
            <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
            </div>
            <div className="mr-2">
              <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <span className="text-gray-400 opacity-30">Enable Encryption</span>
          </div>
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center border border-solid  rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
              <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
              <div className="p-1 outline-none rounded w-full h-8 bg-gray-200 animate-pulse"></div>
              <button className="bg-gray-200 text-white text-sm px-4 py-2 ml-2 rounded animate-pulse">
                Generate Key
              </button>
            </div>
            <div className="flex items-center border border-solid rounded p-2 w-full sm:w-2/3 lg:w-1/2 mx-auto">
              <div className="font-manrope text-[#171a1f] text-sm leading-[22px] mr-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
              <div className="p-1 outline-none rounded w-full h-8 bg-gray-200 animate-pulse"></div>
              <button className="bg-gray-200 text-white text-sm px-4 py-2 ml-2 rounded animate-pulse">
                Generate IV
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-center">
          <label className="justify-center bg-gray-200 rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 w-full sm:w-auto cursor-pointer mb-4 sm:mb-0 animate-pulse">
            <LuUploadCloud size={30} className="w-4 h-4 mr-2" />
            <input type="file" multiple className="hidden" />
            Upload Files
          </label>
          <button className="justify-center bg-gray-200 rounded-md text-white text-sm leading-[22px] font-manrope flex items-center px-4 py-2 w-full sm:w-auto animate-pulse">
            <FaRegPaperPlane className="w-4 h-4 mr-2" />
            Send
          </button>
        </div>
        <div className="text-center mt-4 font-manrope text-[#171a1f] text-sm">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mx-auto"></div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
