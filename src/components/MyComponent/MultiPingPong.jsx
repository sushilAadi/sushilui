import React from 'react'
import LetterSwapPingPong from '../fancy/text/letter-swap-pingpong-anim'

const MultiPingPong = (props) => {
  return (
    <div className="flex flex-col items-center relative">
      <LetterSwapPingPong
        label="SUSHIL SHARMA"
        staggerFrom={"center"}
        reverse={false}
        className="text-[clamp(2px,12vw,400px)] font-custom font-extrabold text-black text-shadow-lg"
        externalActive={props.hoverTrigger}
        disablePointerHover={true}
        hoverTextColor="red"
      />
      <div className="absolute -bottom-[50px] ">
        <LetterSwapPingPong
          label="Frontend developer"
          staggerFrom={"center"}
          reverse={true}
          className={`font-cursive text-[clamp(2px,10vw,400px)] ${
            props.hoverTrigger ? "text-red-500" : "text-black"
          } text-stroke-2 text-shadow-lg`}
          externalActive={props.hoverTrigger}
          disablePointerHover={true}
          hoverTextColor="black"
        />
      </div>
    </div>
  )
}

export default MultiPingPong