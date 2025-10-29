import React from "react";
import { RequestDetailsData } from "@/types/dashboard";
import { ArrowDownToLine, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RequestDetailsDocumentsProps {
  data: RequestDetailsData;
}
//
export default function RequestDetailsDocuments({
}: RequestDetailsDocumentsProps) {
  return (
    <Card className="py-6 border-none shadow-none">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Documents</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
          <span>
            <Bookmark size={18} />
          </span>
          <span className="font-medium">Receipt</span>
        </div>
        <div className="flex gap-3 items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
          <span>
            <ArrowDownToLine size={18} />
          </span>
          <span className="font-medium">Agreement</span>
        </div>
        <div className="flex gap-3 items-center py-2 hover:bg-gray-50 transition-colors cursor-pointer">
          <span>
            <ArrowDownToLine size={18} />
          </span>
          <span className="font-medium">Vehicle check template</span>
        </div>
      </div>
    </Card>
  );
}
