import { ModalButton } from "@/components/ui/modal-button";
import HeroSearchComponent from "../../_components/shared/HeroSearchComponent";
const HeroSection = ({ id }: { id: string }) => {
  return (
    <section
      className="p-[2px] sm:py-16 landing-container px-0 mt-10"
      id={id}>
      <div className="p-[2px] bg-gradient-to-r from-white through-[#AD75E2] to-[#FFCB4E] rounded-3xl border-l-0">
        <div className="relative w-full min-h-[32rem] flex flex-1 h-full sm:block p-3 pt-[3.625rem] pb-12 rounded-3xl hero-image-2 bg-no-repeat bg-cover bg-center mx-auto justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent rounded-3xl"></div>
          <div className="relative h-1/2">
            <div className="max-w-[500px]">
              <h1 className="pb-6 heading-hero-2 space-x-1.5">
                Find the Perfect Ride for Any Trip - Fast & Easy!
              </h1>
              <p className="body-1-medium ">
                Need a car for a road trip, work, or a special occasion? Find,
                book, and drive with ease—explore thousands of vehicles and rent
                exactly when you need it.
              </p>
            </div>
            <HeroSearchComponent className="relative z-10 mt-8 sm:mt-12 hidden md:block" />
            <div className="mt-10 sm:hidden">
              <ModalButton
                modalId="hero-search-modal"
                variant="cta"
                size="lg"
                className="block rounded-full md:hidden w-full">
                Search
              </ModalButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
