import React from 'react'
import RiyaahWEB from "@/utils/RiyaahWEB.png";
import Image from 'next/image';

const PotraitCard = ({title,description,img}) => {
  return (
    <div className='bg-[#fff3e0] hover:bg-[#9ccc65] w-[350px] rounded-3xl cursor-pointer'>
        <div className="p-4">
            <div className="flex gap-2">
                <div className="bg-white px-2  py-1 rounded-lg">Reactjs</div>
                <div className="bg-white px-2  py-1 rounded-lg">Reactjs</div>
            </div>
            <h1 className='mt-4 text-black font-custom text-[36px]'>{title}</h1>
            <p className='text-[14px] text-gray-500 line-clamp-2' title={description}>{description}</p>
            
        </div>
        <div className="flex justify-center items-centerrounded-3xl ">
        <Image
          src={img.src || img}
          alt={title}
          width={350}
          height={300}
          className="min-h-[300px] object-cover image-fluid rounded-3xl"
        />
      </div>
    </div>
  )
}

export default PotraitCard