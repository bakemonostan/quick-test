/* eslint-disable @next/next/no-img-element */
import Shell from "@/components/Shell";
import React from "react";

export default function HeroSection() {
  return (
    <section className="flex-1 flex-center bg-gradient-to-r from-[#AD75E2]/15 to-[#FFCB4E]/15 py-16 px-3 md:px-0">
      <Shell>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-[136px] items-center justify-between">
          <div className="w-full lg:w-[500px]">
            <h1 className="heading-hero-2 pb-6 md:text-left text-center">
              Turn your vehicle into passive income!
            </h1>
            <p className="body-1-medium text-black/80 md:text-left text-center">
              List your car, camper, or specialty ride on Kaparki and start
              earning from people who need it.
            </p>
          </div>
          <div className="w-full">
            <div className="rounded-2xl p-4 bg-white overflow-hidden w-full  sm:w-[500px] h-[300px] sm:h-[453.17px] relative">
              <img
                src="/images/kpk-hero-3.png"
                alt="Vehicle rental"
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
