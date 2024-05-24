"use client";
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
const BottomBar = () => {
  const currentPathname = usePathname();
  useEffect(() => {
    console.log("Current Pathname:", currentPathname);
  }, [currentPathname]);

  return (
    <div className="fixed bottom-0 w-full backdrop-blur	p-2 md:hidden flex items-center justify-evenly gap-2 text-white text-2xl z-20">
      {/* Home Icon */}
      <Link href="/">
      <div
        className={`p-2 h-12 w-12 h-full flex items-center justify-center relative ${
          currentPathname === "/" ? "bg-cyan-600" : ""
        } rounded-full`}
      >
        <i className="fa-solid fa-house"></i>
      </div>
      </Link>

      {/* Explorer Icon */}
      <Link href="/Dashboard">
      <div
        className={`p-2 h-12 w-12 h-full flex items-center justify-center relative ${
          currentPathname === "/Dashboard" ? "bg-cyan-600" : ""
        } rounded-full`}
      >
        <i className="fa-brands fa-wpexplorer"></i>
      </div>
      </Link>


      {/* User Icon */}
      <Link href="/Profile">
      <div
        className={`p-2 h-12 w-12  h-full flex items-center justify-center relative ${
          currentPathname === "/Profile" ? "bg-cyan-600" : ""
        } rounded-full`}
      >
        <i className="fa-solid fa-user"></i>
      </div>
      </Link>


      {/* Settings Icon */}
      <div
        className={`p-2 h-12 w-12 h-full flex items-center justify-center relative ${
          currentPathname === "/settings" ? "bg-cyan-600" : ""
        } rounded-full`}
      >
        <i className="fa-solid fa-gear"></i>
      </div>
    </div>
  );
};

export default BottomBar;
