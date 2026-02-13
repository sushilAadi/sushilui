"use client";;
import { useState } from "react";
import ProfileCard from "@/components/ui/ProfileCard";
import MultiPingPong from "@/components/MyComponent/MultiPingPong";
import AdvanceCard from "@/components/CstmCard/AdvanceCard";
import MobileCard from "@/components/CstmCard/MobileCard";



export default function Typography() {
  const [hoverTrigger, setHoverTrigger] = useState(false);

  return (
    <div className="p-10">
      <div>
        {/* <ProfileCard /> */}
    <AdvanceCard/>
    <br/>
    <br/>
    <MobileCard/>
        {/* <p
          className="my-10 cursor-pointer inline-block border-0 p-4"
          onMouseEnter={() => setHoverTrigger(true)}
          onMouseLeave={() => setHoverTrigger(false)}
          onClick={() => setHoverTrigger((s) => !s)}
        >
          Hover me
        </p> */}
        {/* <MultiPingPong hoverTrigger={hoverTrigger}></MultiPingPong> */}
      </div>
    </div>
  );
}
