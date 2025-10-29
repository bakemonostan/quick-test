import { WHY_RENT_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardSection } from "@mantine/core";
import Link from "next/link";
export default function WhyRentThroughKaparki() {
  return (
    <section className="py-[7.5rem] px-4 md:px-0">
      <Shell>
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          <div className="py-16">
            <h2 className="heading-3">Why Rent Through Kaparki?</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center ">
          {WHY_RENT_DATA.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} bg="yellow-light.4" className="h-full">
                <CardSection className="text-center p-8 space-y-6">
                  <Icon className="mx-auto" />
                  <h4 className="heading-4 pb-4">{card.title}</h4>
                  <p className="body-1-medium">{card.description}</p>
                </CardSection>
              </Card>
            );
          })}
        </div>
        <div className="text-center max-w-[674px] mx-auto pt-16">
          <p className="body-1-light pb-6">
            Start browsing now and find the perfect ride for your trip. Whether
            it’s for work, travel, or fun—your next adventure starts here!
          </p>
          <div>
            <Button variant="cta" className="w-max">
              <Link href="/list-a-vehicle" className="button-text">
                List a vehicle now
              </Link>
            </Button>
          </div>
        </div>
      </Shell>
    </section>
  );
}
