"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";


export default function CancelBooking() {

  const handleCancel = async () => {
    try {
    } catch (error) {
      console.error("Error cancelling booking", error);
    }
  };



  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>Cancel Booking</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 rounded-full"
          >
            <X size={16} />
          </Button>
        </DialogHeader>
        <DialogDescription className="py-4">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </DialogDescription>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="ghost" onClick={() => {}}>
            No, keep it
          </Button>
          <Button variant="default" onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
            Yes, cancel booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
