import React from 'react'
import './ImageAndTextOverlay.css'

const ImageAndTextOverlay = () => {
  return (
    <div className="w-full p-2 sm:p-4 text-2xl flex items-center justify-center text-white secoundDiv transition-all duration-500">
            <h1 className="text-[90px] sm:text-[120px] md:text-[140px] lg:text-[180px] xl:text-[220px] 2xl:text-[280px] text-center relative textOutlineStyle text-red-500 z-1 upper transition-all duration-500 leading-[0.8] max-w-full break-words smallDeviceText">
              SUSHIL
            </h1>
          </div>
  )
}

export default ImageAndTextOverlay