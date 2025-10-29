import HeroSearchComponent from "../shared/HeroSearchComponent";
import { ModalButton } from "@/components/ui/modal-button";
// us
const HeroSection = ({ id }: { id: string }) => {
  return (
    <section
      className="p-[2px] landing-container px-3 md:px-0 py-16"
      id={id}>
      <div className="p-[2px] bg-gradient-to-r from-white  via-[#91721B]/40 to-[#F7C32E] rounded-3xl border-l-0">
        <div className="relative w-full min-h-[32rem] flex flex-1 h-full sm:block p-3 py-10 rounded-3xl hero-image-1 bg-no-repeat bg-cover sm:bg-contain bg-right mx-auto justify-center items-center">
          <div className="absolute inset-0 custom-gradient rounded-3xl"></div>
          <div className="relative h-1/2 sm:pt-48">
            <div className="max-w-[500px] w-full">
              <h1 className="pb-6 heading-hero-1  flex flex-wrap gap-4">
                <span>Find.</span>
                <span>Rent.</span>
                <span className="text-transparent bg-gradient-to-r from-[#AD75E2] via-[#B96247] to-[#FFCB4E] bg-clip-text relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3.5px] after:bg-gradient-to-r after:from-[#AD75E2] after:via-[#B96247] after:to-[#FFCB4E]">
                  Earn!
                </span>
              </h1>
              <p className="body-1-medium ">
                Whether you&apos;re looking for an adventure-ready ride or want
                to make money renting out your vehicle, Kaparki makes it easy
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
