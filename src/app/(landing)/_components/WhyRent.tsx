import { WHY_RENT_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Card, CardSection } from "@mantine/core";

export default function WhyRent() {
  return (
    <section className="py-16 lg:py-[120px] px-3 md:px-0">
      <Shell>
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          <div className="pb-16">
            <h2 className="heading-3 md:text-left text-center">Why Kaparki?</h2>
            <h3 className="heading-3 md:text-left text-center">The smart way to rent</h3>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center ">
          {WHY_RENT_DATA.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                bg="yellow-light.4"
                className="h-full"
                >
                <CardSection className="text-center p-8 space-y-6">
                  <Icon className="mx-auto" />
                  <h4 className="heading-4 pb-4">{card.title}</h4>
                  <p className="body-1-medium">{card.description}</p>
                </CardSection>
              </Card>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
