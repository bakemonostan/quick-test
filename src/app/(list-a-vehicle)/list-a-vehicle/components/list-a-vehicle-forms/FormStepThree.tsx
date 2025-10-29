/* eslint-disable @next/next/no-img-element */
"use client";
import { useVehicleListingStore } from "../../vehicleListingstore";
import { MultiImageUpload } from "@/components/Form/MultiImageUpload";
import { useEffect, useState } from "react";
import { FormStepThreeSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import MultistepFormButtons from "./MultistepFormButtons";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/config/api";

type FormValues = z.infer<typeof FormStepThreeSchema>;

// Helper function to convert base64 to file
const base64ToFile = (base64String: string, index: number): File => {
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.split(',')[1];
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);
    
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'image/jpeg' });
  return new File([blob], `image${index}.jpg`, { type: 'image/jpeg' });
};

// Improved helper function to check file size more accurately
const checkFileSize = (base64String: string): boolean => {
  if (!base64String || typeof base64String !== 'string') return true;
  
  try {
    // Get the base64 data part (remove the data:image/xyz;base64, prefix)
    const base64Data = base64String.split(",")[1];
    if (!base64Data) return true;

    // Calculate size: base64 represents 3 bytes in 4 characters, with padding
    const padding = base64Data.endsWith("==")
      ? 2
      : base64Data.endsWith("=")
      ? 1
      : 0;
    const sizeInBytes = base64Data.length * 0.75 - padding;

    return sizeInBytes <= 1048576; // 1MB = 1048576 bytes
  } catch (error) {
    console.error("Error checking file size:", error);
    return false; // Assume it's too large if we can't check
  }
};

export default function FormStepThree() {
  const { setCurrentStep, formThreeValue, setFormThreeValue, listingId } = useVehicleListingStore();
  const [sizeError, setSizeError] = useState<string | null>(null);
  
  const { mutate: uploadImages, isPending } = useMutation({
    mutationFn: async (images: string[]) => {
      // Convert base64 strings to files
      const files = images.map((base64, index) => base64ToFile(base64, index));
      
      // Create FormData and append files
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const response = await api.post(`/vehicle/image-listing/${listingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Success", { description: "Images uploaded successfully" });
      setCurrentStep(4);
    },
    onError: (error: Error) => {
      toast.error("Error", { description: error.message || "Failed to upload images" });
    }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormStepThreeSchema),
    defaultValues: {
      images: formThreeValue.images || Array(6).fill(""),
    },
    mode: "onChange",
  });
  const images = form.watch("images");
  useEffect(() => {
    if (formThreeValue.images?.length) {
      // Create a new array with 6 elements
      const updatedImages = Array(6).fill("");
      
      // Map the stored images to their correct positions
      formThreeValue.images.forEach((img, idx) => {
        if (idx < 6) {
          updatedImages[idx] = img;
        }
      });
      
      form.setValue("images", updatedImages);
    }
  }, [formThreeValue.images, form]);

  const handleContinue = () => {
    setSizeError(null);
    const nonEmptyImages = images.filter((img) => img !== "");
    
    // Check if there are 6 images
    if (nonEmptyImages.length < 6) {
      form.setError("images", {
        type: "manual",
        message: "Please upload all 6 images",
      });
      return;
    }
    
    // Check if any image exceeds 1MB
    const oversizedImages = nonEmptyImages.filter(img => !checkFileSize(img));
    
    if (oversizedImages.length > 0) {
      setSizeError(`${oversizedImages.length} image(s) exceed the 1MB size limit. Please resize them and try again.`);
      toast.error("Size limit exceeded", {
        description: `${oversizedImages.length} image(s) exceed the 1MB size limit. Please resize them and try again.`,
        duration: 5000,
        position: "top-center",
      });
      return;
    }
    
    setFormThreeValue({ images: images }); // Store the full array with positions
    uploadImages(nonEmptyImages);
  };

  const positions = [
    { label: "Left side", index: 0 },
    { label: "Rear", index: 1 },
    { label: "Right side", index: 2 },
    { label: "Front seat", index: 3 },
    { label: "Back seat", index: 4 },
    { label: "Trunk", index: 5 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <h2 className="heading-l font-bold py-1">Add photos</h2>

      <div className="">
        <p className="body-2 text-black/80 mb-6">
          Add pictures of your vehicle, give your ad a title and mention what
          makes it a good choice for potential renters?
        </p>

        <div className="bg-amber-50 p-4 rounded-md flex gap-4 mb-8">
          <img
            src="/images/party-popper-img.jpg"
            alt="Party Horn"
            className="w-10 h-10 mix-blend-multiply"
          />
          <div>
          <p className="body-2 text-black/80">
              High quality photos increase your earning potential by attracting
              more guests. Upload at least 6 photos, including multiple exterior
              angles with the whole car in frame, as well as interior shots.{" "}
              <Link href="#" className="text-amber-600 underline">
                Learn more
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {positions.map((pos, idx) => (
              <FormField
                key={idx}
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col items-center">
                      <MultiImageUpload
                        images={field.value}
                        onChange={(newImages) => {
                          field.onChange(newImages);
                          // Store the entire array with empty strings at empty positions
                          setFormThreeValue({ images: newImages });
                        }}
                        index={pos.index}
                      />
                      <span className="mt-2 text-sm text-gray-600 text-center">{pos.label}</span>
                    </div>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="text-red-500 mb-4 text-center">
            {form.formState.errors.images?.message}
            {sizeError && <p>{sizeError}</p>}
          </div>

          <div className="text-center mb-4 text-amber-600">
            <p className="text-sm">All images must be less than 1MB in size</p>
          </div>

          <MultistepFormButtons
            onContinueClick={handleContinue}
            onBackClick={() => setCurrentStep(2)}
            isSubmitting={isPending}
            currentStep={3}
            totalSteps={6}
          />
        </form>
      </Form>
    </div>
  );
}
