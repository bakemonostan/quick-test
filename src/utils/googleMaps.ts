/**
 * Google Maps API utility functions
 */

import { toast } from "sonner";
import { Loader } from "@googlemaps/js-api-loader";

type GeocodeResult = {
  isValid: boolean;
  formattedAddress?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  error?: string;
};

/**
 * Load Google Maps API script
 * @returns Promise that resolves when the API is loaded
 */
export const loadGoogleMapsAPI = async (): Promise<void> => {
  try {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["places"],
    });

    await loader.load();
  } catch (error) {
    throw error;
  }
};

/**
 * Validate a postal code using Google Maps Geocoding API
 * @param postalCode - Postal code to validate
 * @returns Promise with geocode result
 */
export const validatePostalCode = async (
  postalCode: string
): Promise<GeocodeResult> => {
  if (!postalCode) {
    return {
      isValid: false,
      error: "Postal code is required",
    };
  }

  try {
    // Ensure Google Maps API is loaded
    if (
      typeof window === "undefined" ||
      !window.google ||
      !window.google.maps
    ) {
      try {
        await loadGoogleMapsAPI();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unknown error loading Google Maps API"
        );
        return {
          isValid: false,
          error: "Google Maps API failed to load",
        };
      }
    }

    // Use geocoding service to validate the postal code
    const geocoder = new google.maps.Geocoder();
    const result = await geocoder.geocode({ address: postalCode });

    if (result.results && result.results.length > 0) {
      const location = result.results[0].geometry.location;
      const formattedAddress = result.results[0].formatted_address;

      return {
        isValid: true,
        formattedAddress,
        coordinates: {
          lat: location.lat(),
          lng: location.lng(),
        },
      };
    } else {
      return {
        isValid: false,
        error: "Invalid postal code. No location found.",
      };
    }
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Unknown error validating postal code"
    );
    return {
      isValid: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown error validating postal code",
    };
  }
};
