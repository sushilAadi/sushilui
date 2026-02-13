import React from 'react'

const NotebookCard = () => {
  return (
    <>
  {/* Main Notebook Card 
   bg-white + gradient for lines + shadow 
    */}
  <div
    className="w-full max-w-sm rounded-3xl p-6 pb-12 relative bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] 
          bg-[linear-gradient(#9ae6b4_1px,transparent_1px)] bg-[length:100%_40px] bg-[position:0_20px]"
  >
    {/* Top Holes */}
    <div className="absolute top-4 left-6 flex space-x-4">
      <div className="w-5 h-5 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
      <div className="w-5 h-5 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
      <div className="w-5 h-5 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
    </div>
    {/* Content Container */}
    <div className="mt-8 relative">
      {/* Food Image Section (Rotated) 
           rotate-6 -> hover:rotate-0 transition
      */}
      <div
        className="relative group rotate-6 hover:rotate-0 hover:scale-[1.02] hover:z-10 transition-transform duration-300 ease-out
                  rounded-xl p-1 shadow-xl mb-6 mx-auto w-64 h-64 flex items-center justify-center
                  bg-[#8B4513] bg-[repeating-linear-gradient(45deg,#654321_0,#654321_1px,#8B4513_0,#8B4513_50%)] bg-[length:20px_20px]"
      >
        {/* Paperclip (SVG) */}
        <div className="absolute -top-5 left-10 z-20 drop-shadow-md transform -rotate-12 pointer-events-none">
          <svg width={40} height={80} viewBox="0 0 36 70">
            <path
              d="M 28 25 L 28 55 A 10 10 0 0 1 8 55 L 8 15 A 7 7 0 0 1 22 15 L 22 50 A 4 4 0 0 1 14 50 L 14 25"
              className="fill-none stroke-slate-800 stroke-[3]"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* Food Image */}
        <div className="w-full h-full rounded-lg overflow-hidden relative border-4 border-[#5d3a1a]">
          <img
            src="https://images.unsplash.com/photo-1548943487-a2e4e43b485c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Borscht"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Sticker Badge */}
        <div
          className="absolute -bottom-2.5 -left-2.5 w-[60px] h-[60px] z-30 -rotate-[15deg] 
                      bg-white rounded-full border-2 border-white shadow-[2px_2px_5px_rgba(0,0,0,0.2)] flex items-center justify-center"
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center relative
                          bg-[conic-gradient(#0057B7_0deg_180deg,#FFDD00_180deg_360deg)]"
          >
            {/* Inner White Circle with Text */}
            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full w-10 h-10 m-auto text-[6px] font-bold text-[#333] text-center leading-tight uppercase">
              UA
              <br />
              RECIPE
            </div>
            {/* Decorative ring effect */}
            <div className="absolute inset-0 rounded-full border-[3px] border-white opacity-30" />
          </div>
        </div>
        {/* Garnish/Veggie Decorations (Circles) */}
        {/* Bottom Right Large */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#d4a373] rounded-full border-2 border-[#5d3a1a] flex items-center justify-center shadow-lg z-20">
          <div className="w-full h-full opacity-50 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:4px_4px]" />
        </div>
        {/* Bottom Right Small */}
        <div className="absolute -bottom-8 right-8 w-14 h-14 bg-[#d4a373] rounded-full border-2 border-[#5d3a1a] flex items-center justify-center shadow-lg z-10">
          <div className="w-full h-full opacity-50 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:4px_4px]" />
        </div>
      </div>
      {/* Typography Section */}
      <div className="relative z-10 pl-2 mt-8">
        <h1 className="text-5xl font-bold text-[#1a2e35] tracking-tighter leading-[0.85]">
          UKRAINIAN
          <br />
          <span className="relative inline-block">
            BORSCHT
            {/* Underline decoration */}
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#1a2e35] rounded-full" />
          </span>
        </h1>
        {/* Author Tag */}
        <div className="absolute -bottom-10 left-12 -rotate-[5deg] bg-gray-200 rounded-full py-1 pl-1 pr-4 flex items-center gap-2 border border-gray-300 w-max shadow-md">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Kostya"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-gray-600 font-semibold text-sm">by Kostya</span>
          {/* Dashed border effect around the tag */}
          <div className="absolute inset-0 border border-dashed border-gray-400 rounded-full pointer-events-none -m-[2px]" />
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default NotebookCard