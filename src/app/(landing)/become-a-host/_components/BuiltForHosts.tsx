import { BUILT_FOR_HOSTS_DATA } from "@/app/contents/landing";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function BuiltForHosts() {
  return (
    <section className="py-[120px] px-4 md:px-0">
      <Shell>
        <p className="heading-3 text-center pb-16">Built for hosts like you</p>
        <div className="grid md:grid-cols-2 gap-y-16 gap-x-[120px]">
          {BUILT_FOR_HOSTS_DATA.map((item) => (
            <div
              key={item.title}
              className="max-w-[469px] text-center md:text-left">
              <p className="heading-4 pb-4">{item.title}</p>
              <p className="body-1-medium text-black/80">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-16 pb-8">
          <Button variant="cta" className="w-max">
            <Link href="/list-a-vehicle" className="button-text">
              Start earning on Kaparki
            </Link>
          </Button>
        </div>
      </Shell>
    </section>
  );
}
