import { WHY_RENT_ON_KAPARKI_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardSection, Divider } from "@mantine/core";
import Link from "next/link";
export default function WhyKaparki() {
  return (
    <section className="py-[120px] px-4 md:px-0">
      <Shell>
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          <div className="pb-16">
            <h2 className="heading-3">Why Kaparki?</h2>
            <h3 className="heading-3">The smart way to rent</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center ">
          {WHY_RENT_ON_KAPARKI_DATA.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                bg="yellow-light.4"
                className="h-full">
                <CardSection className="text-center p-8">
                  <Icon className="mx-auto mb-6" />
                  <h4 className="heading-4 pb-4">{card.title}</h4>
                  <p className="body-1-medium">{card.description}</p>
                </CardSection>
              </Card>
            );
          })}
        </div>
        <div className="text-center max-w-[674px] mx-auto pt-16 pb-[120px]">
          <p className="body-1-light pb-6">
            Take control of your rental, set your own terms, and connect with
            verified renters. Get started in just a few clicks!
          </p>
          <Button
            variant="cta"
            className="w-max">
            <Link
              href="/list-a-vehicle"
              className="button-text">
              List a vehicle now
            </Link>
          </Button>
        </div>
        <Divider color="yellow.2" />
      </Shell>
    </section>
  );
}
