"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer>
      <div className='grid grid-cols-2 lg:grid-cols-3 text-white p-4 py-20 lg:px-20 bg-lightblack gap-10'>
        <div className='flex flex-col items-center'>
          <h1>Quicklinks</h1>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col items-center'>
          <h1>Follow Us on</h1>
          <ul>
            <li>
              <Link href='https://facebook.com'>Facebook</Link>
            </li>
            <li>
              <Link href='https://twitter.com'>Twitter</Link>
            </li>
            <li>
              <Link href='https://instagram.com'>Instagram</Link>
            </li>
            <li>
              <Link href='https://linkedin.com'>LinkedIn</Link>
            </li>
          </ul>
          </div>
          <div className='col-span-2 lg:col-span-1 flex flex-col items-center'>
            <Image src="/MrByte.png" alt="MrByte" height={100} width={100}></Image>
            <h1>Doctor Agent</h1>
          </div>
      </div>
      <div className='bg-black text-white p-4 text-center pb-20 md:pb-4'>
        All rights reserved &copy; 2024
      </div>
    </footer>
  )
}

export default Footer
