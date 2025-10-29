import {
  HeroSection,
  HowItWorks,
  ListToday,
  WhyRent,
} from "./_components";
import CarListing from "./_components/CarListing";

export default function Home() {
  return (
    <>
      <HeroSection id="hero-section" />
      <section className="mx-auto landing-container">
        <HowItWorks />
        <CarListing />
        <ListToday />
      </section>
      <WhyRent />
    </>
  );
}
