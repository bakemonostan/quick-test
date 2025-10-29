"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import { compressImage } from "@/utils/general";
import { toast } from "sonner";
interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  index: number;
  label?: string;
}

export function MultiImageUpload({ images, onChange, index, label }: MultiImageUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    if (file.size > 1024 * 1024) {
      // Show toast as a separate call to ensure it fires
      toast.error("Image size must be less than 1MB", {
        duration: 3000,
        position: "top-center",
      });
      setError("Image size must be less than 1MB");
      return;
    }
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target?.result as string;
        
        // Compress the image before storing
        const compressedImage = await compressImage(base64String);
        
        // Update the images array with the compressed image
        const newImages = [...images];
        newImages[index] = compressedImage;
        onChange(newImages);
        setError(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error converting file to base64:", error);
      toast.error("Failed to process image");
      setError("Failed to process image");
    }
  };
  const handleRemove = () => {
    setError(null);
    const newImages = [...images];
    newImages[index] = "";
    onChange(newImages);
  };

  // Clean up any object URLs when component unmounts
  useEffect(() => {
    return () => {
      // If any images are object URLs, revoke them to prevent memory leaks
      images.forEach(img => {
        if (img.startsWith('blob:')) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [images]);

  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      <div className="mt-1 w-full flex flex-col items-center">
        {images[index] ? (
          <div className="relative w-[168.61px] h-[130.53px]">
            <button
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
              onClick={handleRemove}
              type="button"
            >
              <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
            </button>
            <Image
              src={images[index]}
              height={130.53}
              width={168.61}
              alt=""
              className="border border-border h-full w-full mx-auto rounded-md object-cover"
            />
          </div>
        ) : (
          <>
            <Dropzone
              onDrop={handleImageUpload}
              accept={{
                "image/*": [".png", ".jpg", ".jpeg", ".webp"],
              }}
              maxFiles={1}
              maxSize={1048576} // 1MB in bytes
              onDropRejected={(rejections) => {
                if (rejections.length > 0 && rejections[0].errors.some(e => e.code === 'file-too-large')) {
                  toast.error("Image size must be less than 1MB", {
                    duration: 3000,
                    position: "top-center",
                  });
                  setError("Image size must be less than 1MB");
                }
              }}
            >
              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed border-[#DBA806] w-[168.61px] h-[130.53px] flex flex-col items-center justify-center rounded-md focus:outline-none hover:border-[#c99905] cursor-pointer",
                    {
                      "border-primary bg-secondary": isDragActive && isDragAccept,
                      "border-destructive bg-destructive/20": isDragActive && isDragReject || error,
                    }
                  )}
                >
                  <input {...getInputProps()} />
                  <ImageIcon className="h-10 w-10 text-[#DBA806] mb-2" strokeWidth={1.25} />
                  <span className="text-xs text-muted-foreground text-center px-2">
                    Click to add image
                    <br />
                    (Max: 1MB)
                  </span>
                </div>
              )}
            </Dropzone>
            {error && (
              <p className="text-destructive text-xs mt-1 text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
} 
