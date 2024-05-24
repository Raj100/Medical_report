import React from 'react'

const Content = () => {
  return (
    <>
      <div className='grid grid-cols-4 text-white'>
        <div className='col-span-2 p-4 flex flex-col justify-center'>
            <h1>Features</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur, atque animi. Veritatis minima eos natus est. Dicta, velit. Animi aut eaque eveniet quo sint quis reprehenderit in harum ea distinctio.</p>
        </div>
        <div className='flex justify-center items-center'>
            Images
        </div>
        <div className='flex justify-center items-center'>
            Images
        </div>
      </div>
      <h1 className='text-center text-white'> Choose Your Character?</h1>
      <div className='grid grid-cols-4 text-white'>
        <div className=' h-52 p-4 flex flex-col justify-center'>
        Character1
        </div>
        <div className='flex justify-center items-center'>
            Character2
        </div>
        <div className='flex justify-center items-center'>
        Character3
        </div>
        <div className='flex justify-center items-center'>
        Character4
        </div>
      </div>
    </>
  )
}

export default Content
