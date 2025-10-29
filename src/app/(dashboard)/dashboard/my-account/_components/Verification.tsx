import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Verification() {
  return (
    <div className="flex flex-col gap-5 mt-8">
      <div className="flex flex-col justify-between border-b py-7 xl:w-[70%]">
        <div>
          <p className="font-extrabold text-black/80 header-6 uppercase">Identity verification</p>
          <p className="body-2 pt-4 text-black/60 font-normal">
            We have partnered with Stripe to securely verify Kaparki users and
            their account information. During the verification process, you will
            be asked for your bank account details. If you list your vehicle on
            Kaparki, you will receive your payout at this bank account.
          </p>
        </div>
        <div className="flex gap-3 py-5 items-center">
          <Link href="#" className="text-sm font-bold text-black/80 sm:button-text">
            Verify your identity with your Bank Account
          </Link>
          <ArrowRight className="text-black/70 size-5" />
        </div>
      </div>
      <div className="flex flex-col justify-between border-b py-8 xl:w-[70%]">
        <div className="">
          <p className="font-extrabold text-black/80 header-6 uppercase">Get approved to rent</p>
          <p className="body-2 pt-4 text-black/60 font-normal">
            To rent a vehicle on Kaparki, you must get approved to rent by
            providing a valid driver&apos;s license.
          </p>
        </div>
        <div className="flex gap-3 py-5 items-center">
          <Link href="#" className="text-sm font-bold text-black/80 sm:button-text">
            Upload copy of Driver&apos;s license
          </Link>
          <ArrowRight className="text-black/70 size-5" />
        </div>
      </div>
    </div>
  );
}
