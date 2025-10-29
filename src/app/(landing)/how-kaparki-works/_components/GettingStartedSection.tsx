/* eslint-disable @next/next/no-img-element */
import { RocketShipIcon } from "@/components/icons";
import Shell from "@/components/Shell";

export default function GettingStartedSection() {
  return (
    <section
      className="relative overflow-hidden py-[5.75rem] "
      style={{
        background:
          "radial-gradient(circle at bottom left, #DBC5F4 10%, rgba(219, 197, 244, 0.3) 20%, #FAE8CF1A 80%)",
      }}>
      <Shell>
        <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-[8.5rem] ">
          <div className=" hidden md:block w-full lg:w-1/2">
            <div className="rounded-2xl p-4  bg-white overflow-hidden w-[29.25rem] h-[34.25rem] relative">
              <img
                src="/images/kpk-hero-3.png"
                alt="Vehicle rental"
                className="rounded-2xl w-full h-full"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-4 md:px-0 space-y-8">
            <div className="relative">
              <div className="space-y-8">
                <p className="header-4 flex gap-2 items-center">
                  <span>
                    <RocketShipIcon />
                  </span>
                  Getting Started is Simple
                </p>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={
                      "relative bg-white max-w-[31.25rem] min-h-[9.625rem] rounded-3xl border p-4 gap-2 flex justify-between" +
                      (index < 3
                        ? " after:content after:inline-block after:h-8 after:w-1 after:bg-[#DBA806] after:absolute after:left-10 after:-z-10 after:-bottom-8 after:transform after:-translate-x-1/2"
                        : "")
                    }>
                    <div>
                      <div className="border border-black flex items-center justify-center w-8 h-8 body-1-black bg-[#FFFEEE] rounded-full">
                        {index + 1}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="body-1-black ">Find the Right Vehicle</h3>
                      <p className="body-1-medium text-black/80">
                        Enter your location and dates to browse a variety of
                        vehicles—from everyday cars to camper vans, motorcycles,
                        and specialty rides.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
