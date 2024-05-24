import React, { useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

const Meteors = ({ number, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const meteors = Array.from(containerRef.current.children);

    meteors.forEach((meteor, idx) => {
      meteor.style.left = `${
        (idx / (meteors.length - 1)) * containerWidth
      }px`;
    });
  }, [number]);

  const meteors = new Array(number || 20).fill(true);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="flex justify-between w-full">
        {meteors.map((el, idx) => (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] ",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              className
            )}
            style={{
              top: 0,
              animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
              animationDuration:
                Math.floor(Math.random() * (10 - 2) + 2) + "s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Meteors;
