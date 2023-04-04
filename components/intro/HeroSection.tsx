import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section>
      <div className="flex flex-col md:items-start gap-8 py-12 md:py-24 w-4/5 max-w-5xl mx-auto text-center md:text-left">
        <div className="relative">
          <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 rotate-45 bg-black w-6 h-6" />
          <span className="font-bold text-white bg-black py-2 px-4 rounded-lg relative">
            WOW
          </span>
        </div>

        <h2 className="font-black text-6xl leading-[1.2] break-keep">
          Hello, World!
        </h2>

        <p className="font-light text-xl text-gray-400 md:max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          cupiditate ut in nesciunt, nulla minima necessitatibus?
        </p>

        <div>
          <Link href={"/about"}>
            <button className="px-4 py-2 border border-black rounded-3xl font-semibold hover:bg-black hover:text-white">
              About Me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
