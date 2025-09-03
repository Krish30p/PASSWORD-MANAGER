import React from 'react'

const Footer = () => {
  return (
        <div className="bg-slate-950 text-white flex flex-col w-full min-h-7 justify-center items-center fixed bottom-0 left-0">        <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>WORD/&gt;</span>
              </div>
        <div className='flex'>
            Created With  <img className='w-5 mx-1 py-0' src="icons/heart.png" alt="" />By Krish30p
        </div>
    </div>
  )
}

export default Footer
