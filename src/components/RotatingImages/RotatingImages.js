import React from 'react'
import Image from 'next/image'

const RotatingImages = () => {
    const myImages = [
        "/MrByte.png",
        "/Youthful and Energetic Character1.png",
        "/Zippy Zoe.png",
        "/Intellectual and Curious Character1.webp",
        "/Empathetic and Supportive Character2.jpeg",
      ];
  return (
      <div className="relative flex items-center justify-center ">
        {myImages.map((src, index) => (
                <Image
                key={index}
                className={` rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${index * 1}`}
                style={{
                    animation: `rotate 10s linear infinite ${index * 1}s`
                  }}
                  src={src}
                  width={75}
                  height={75}
                  alt={`Small image ${index}`}
                />
            ))}
          <Image
          className="rounded-full z-10 w-48 h-48 sm:w-auto sm:h-auto"
            src="/Empathetic and Supportive Character1.jpeg"
            width={400}
            height={400}
            alt="Large Image"
          />

        </div>
  )
}

export default RotatingImages
