"use client";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Content from "../components/Content/Content";
// import ChatBot from "../components/ChatBot/ChatBot";
// import SideMenu from "../components/SideMenu/SideMenu";
import BottomBar from "@/components/BottomBar/BottomBar";
import Lamp from "@/components/ui/Lamp";
import Meteors from "@/components/ui/Meteors";
import RotatingImages from "@/components/RotatingImages/RotatingImages";
import Image from "next/image";
import JoinWaitList from "@/components/JoinWaitList/JoinWaitList";
export default function Home() {
  return (
    <div className="bg-black">
      <Navbar></Navbar>
      {/* <Content></Content> */}
      {/* <ChatBot></ChatBot> */}
      <Lamp>
      </Lamp>
      <Meteors number={25} ></Meteors>
      <div className="flex gap-10 p-4 bg">
      <div className="w-32 h-[600px] lg:w-[600px]">
      {/* <Canvas>
        <ambientLight intensity={2}></ambientLight>
        <OrbitControls></OrbitControls>
        <Suspense fallback={LoaderUtils}>
          <Model scale={2}></Model>
        </Suspense>
      </Canvas> */}
      </div>
      <div className="">
        <h1 className="text-2xl text-white text-center">Welcome to the future of Clinics</h1>
        <p className="text-white  text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit </p>
      </div>
      </div>
      {/* <SideMenu></SideMenu> */}
      <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 text-white px-2 lg:px-8 relative">
        <RotatingImages></RotatingImages>

        <div className="flex justify-center items-center">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam minus at in perferendis inventore sit officiis quos repellendus commodi porro! Libero adipisci ullam sit doloremque nobis autem laudantium excepturi natus placeat maxime!</p>
        </div>
      </div>
      <div className="my-20 grid grid-cols-1 md:grid-cols-2 text-white gap-20 md:gap-0 px-2 lg:px-8 flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl">Features</h1>
          <ul></ul>
        </div>
        <div className="flex items-center justify-center">
          <Image
            className=""
            src="/Zippy Zoe.png"
            width={400}
            height={400}
            alt="Large Image"
          />
        </div>
      </div>
      <JoinWaitList></JoinWaitList>
      <BottomBar></BottomBar>
      <Footer></Footer>
    </div>
  );
}
