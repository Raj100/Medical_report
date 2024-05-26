import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch from react-redux
import { logoutUser } from '../../lib/features/auth/authSlice';
import { selectUser } from '../../lib/features/auth/authSlice'; 
import { useAppSelector } from '../../lib/hooks';
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const [userMenu, setUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="h-[70px] w-full flex justify-between items-center px-2 lg:px-10 fixed z-[1000]">
      <div className="text-white flex space-x-2">
        <Link href="/">
          <h1>Doctor Agent</h1>
        </Link>
      </div>
      <div className="text-white space-x-2">
        {/* {user ? ( 
          <div className="flex items-center gap-2 text-white relative p-2"  onMouseLeave={()=>{setUserMenu(false);}} onMouseOver={()=>{setUserMenu(true);}}>
            <i class="fa-solid fa-circle-user text-3xl"></i>
            <div className={`absolute top-10 right-2/4 rounded-lg z-[100] bg-lightblack p-4 gap-2 border ${userMenu?"":"hidden"}`}>
            <span>{user.user.name}</span>
            <span className="">{user.user.email}</span>
            <button className="text-red-500 float-right" onClick={handleLogout}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
            </div>

          </div>
        ) : ( 
          <>
            <Link className="shadow-green-400" href="/Login">
              <button className="border border-cyan-600 hover:border-2 hover:shadow-[0_0px_10px_2px_#06b6d4] p-2 rounded-lg transform hover:scale-[1.1]">Sign In</button>
            </Link>
            <Link href="/Signup">
              <button className="border border-cyan-600 hover:border-2 hover:shadow-[0_0px_10px_2px_#06b6d4] p-2 rounded-lg transform hover:scale-[1.1]">Sign Up</button>
            </Link>
          </>
        )} */}
      </div>
    </header>
  );
};

export default Navbar;
