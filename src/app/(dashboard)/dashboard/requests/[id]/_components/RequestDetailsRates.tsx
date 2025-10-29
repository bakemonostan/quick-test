import React from "react";
import { RequestDetailsData } from "@/types/dashboard";
import { formatCurrencyToEuros } from "@/utils/general";
import { Card } from "@/components/ui/card";

interface RequestDetailsRatesProps {
  data: RequestDetailsData;
}

export default function RequestDetailsRates({
  data,
}: RequestDetailsRatesProps) {
  return (
    <Card className="p-6 space-y-6 border rounded-md">
      <h2 className="text-2xl font-bold text-gray-800">Rates breakdown</h2>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-base text-gray-700 font-medium">Rental fee per day</p>
          <p className="text-base font-bold text-gray-800">
            {formatCurrencyToEuros(data.vehicle.rental_rate.daily_rate)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base text-gray-700 font-medium">Required deposit</p>
          <p className="text-base font-bold text-gray-800">
            {formatCurrencyToEuros(Number(data.vehicle.rental_rate.security_deposit || 2000))}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-base text-gray-700 font-medium">Cleaning fee</p>
          <p className="text-base font-bold text-gray-800">
            {formatCurrencyToEuros(Number(data.cleaning_fee))}
          </p>
        </div>
      </div>
      
      <div className="pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">What you will earn</h3>
        <p className="text-2xl font-bold text-gray-800">
          {formatCurrencyToEuros(Number(data.total_amount))}
        </p>
      </div>
    </Card>
  );
}
