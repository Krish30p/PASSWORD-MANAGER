import React from 'react'

const Navbar = () => {
  return (
     <nav className='bg-slate-800 text-white '>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

              <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    <span>Pass</span><span className='text-green-500'>WORD/&gt;</span>
              </div>

                  {/* <ul>
                    <li className='flex gap-4 '>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='#'>About</a>
                        <a className='hover:font-bold' href='#'>Contact</a>
                    </li>
                  </ul> */}


                    {/* <button className='text-white   '>
                      <img className='invert p-5 w-18' src="icons/github.svg" alt="github logo" />
                      
                    </button > */}
                    <a 
                      href="https://github.com/Krish30p" 
                       target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white"
                      >
                        <img 
                          className="invert p-5 w-18" 
                         src="icons/github.svg" 
                          alt="github logo" 
                        />
                    </a>


                    
                  </div>

                    
                    
    </nav>
  )
}

export default Navbar
