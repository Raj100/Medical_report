import React from 'react'
import Link from 'next/link'
const IconSideMenu = ({isOpen}) => {
  return (
    <>
      <div className={`bg-black fixed text-3xl text-white flex items-center pt-16 flex-col top-16 left-0 p-4 rounded-md cursor-pointer translate duration-150 ${isOpen ? "translate-x-0": "-translate-x-32"}  w-20`}>
        <Link href="/"><div className='border-y py-2'><i className="fa-solid fa-house"></i></div></Link>
        <Link href="/Chat"><div className='border-b py-2'><i className="fa-regular fa-comment-dots"></i></div></Link>
        <Link href="/Profile"><div className='border-b py-2'><i className="fa-solid fa-user"></i></div></Link>
        <Link href="/Dashboard"><div className='border-b py-2'><i className="fa-brands fa-bots"></i></div></Link>
        <Link href="/Plans"><div className='border-b py-2'><i className="fa-solid fa-cart-shopping"></i></div></Link>
      </div>
    </>
  )
}

export default IconSideMenu
