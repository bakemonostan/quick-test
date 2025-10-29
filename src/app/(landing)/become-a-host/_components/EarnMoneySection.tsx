import { RocketShipIcon, TickCircleIcon } from "@/components/icons";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function EarnMoneySection() {
  return (
    <section className="relative overflow-hidden py-[120px] px-4 md:px-0">
      <Shell>
        <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-[136px]">
          <div className="flex flex-col gap-6">
            <h3 className="heading-3 text-center sm:text-left">
              Earn money while others drive your vehicle!
            </h3>

            {/* earn money section */}
            <div className="space-y-5">
              {[
                "Turn your vehicle into income when it's not in use.",
                "You control pricing, availability, and rental rules.",
                "Kaparki handles secure payments & bookings.",
                "Stay protected – Renters are verified, and insurance is required.",
              ].map((benefit, index) => (
                <p
                  key={index}
                  className="flex gap-3 items-start">
                  <TickCircleIcon />
                  <span className="body-1-medium font-normal">{benefit}</span>
                </p>
              ))}
            </div>

            <div className="flex gap-4 mt-4 justify-center sm:justify-start">
              <Button
                variant="cta"
                className="w-max">
                <Link
                  href="/list-a-vehicle"
                  className="button-text">
                  Start Listing Now
                </Link>
              </Button>
            </div>
          </div>
          {/* getting started */}
          <div className="space-y-8">
            <div className="relative">
              <div className="space-y-8">
                <p className="header-4 flex gap-2 items-center">
                  <span>
                    <RocketShipIcon />
                  </span>
                  Getting Started is Simple
                </p>
                {[
                  {
                    title: "List Your Vehicle",
                    description:
                      "Upload high-quality photos, set your rental price, and choose your availability.",
                  },
                  {
                    title: "Get Verified & Receive Bookings",
                    description:
                      "Once listed, renters will find your vehicle and request to book, or book directly if applicable.",
                  },
                  {
                    title: "Earn Hassle-Free",
                    description:
                      "Kaparki ensures secure payments, verified renters, and seamless bookings..",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className={
                      "relative bg-white max-w-[500px] min-h-[125px] rounded-3xl border p-4 gap-2 flex justify-between" +
                      (index < 2
                        ? " after:content after:inline-block after:h-8 after:w-1 after:bg-[#DBA806] after:absolute after:left-10 after:-z-10 after:-bottom-8 after:transform after:-translate-x-1/2"
                        : "")
                    }>
                    <div>
                      <div className="border border-black flex items-center justify-center w-8 h-8 body-1-black bg-[#FFFEEE] rounded-full">
                        {index + 1}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="body-1-black ">{step.title}</h3>
                      <p className="body-1-medium text-black/80">
                        {step.description}
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
