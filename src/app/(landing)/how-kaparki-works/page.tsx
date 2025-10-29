import HeroSection from "./_components/HeroSection";
import GettingStartedSection from "./_components/GettingStartedSection";
import WhyRentThroughKaparki from "./_components/WhyRentThroughKaparki";
import CarListing from "../_components/CarListing";

export default function HowKaparkiWorksPage() {
  return (
    <>
      <HeroSection id="hero" />
      <GettingStartedSection />
      <section className="sm:p-5 sm:space-y-10 mx-auto landing-container">
        <CarListing />
      </section>
      <WhyRentThroughKaparki />
    </>
  );
}
