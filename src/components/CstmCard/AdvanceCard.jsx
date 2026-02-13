import { Grip } from "lucide-react";
import React from "react";
import nextjs from "@/images/techStack/nextjs.png";
import Image from "next/image";

const AdvanceCard = () => {
  return (
    <div className="p-4 shadow-2xl w-[320px]  rounded-2xl  bg-white">
      <div className="flex w-full gap-2 mb-8">
        <div className="w-1/2 flex flex-col items-end">
          <Image
            src={nextjs}
            alt="Architecture"
            className="w-[50px] h-[50px] rounded-lg object-cover"
          />
          <div className="w-full bg-[#A2E1B7] h-[160px] rounded-lg my-3 overflow-hidden"></div>
          <Grip size={40} />
        </div>
        <div className="w-1/2 flex flex-col items-between">
          <div className="w-full bg-[#CBD5D2] h-[200px] rounded-lg mb-6 overflow-hidden"></div>
          <div className="bg-white p-2 rounded-lg">
            <p className="font-bold text-[14px]">Tech Stack</p>
            <p className="font-bold">4+ </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Website</h1>
        <h1 className="font-bold mb-2">Neeed Architecture</h1>
        <p className="text-[12px] text-gray-500 ">
          Marketplace platform connecting students and teachers with secure
          multi-provider authentication, Razorpay escrow payments, and booking
          workflows.
        </p>
      </div>
    </div>
  );
};

export default AdvanceCard;
