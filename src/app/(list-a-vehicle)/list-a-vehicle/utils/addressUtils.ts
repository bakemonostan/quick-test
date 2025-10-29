// Address component type definition
type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

// Address data structure
export type AddressData = {
  street: string;
  city: string;
  state: string;
  isError?: boolean;
  postal_code: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

/**
 * Fetch address details from a postal code using Google Maps Geocoding API
 */
export const fetchAddressFromPostalCode = async (
  code: string
): Promise<AddressData | null> => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${code}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const result = data.results[0];
      const addressComponents = result.address_components;

      // Get latitude and longitude
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;

      // Create address data object
      const addressData: AddressData = {
        street: "",
        city: "",
        state: "",
        isError: false,
        postal_code: code,
        country: "",
        coordinates: { lat, lng },
      };

      // Extract each component based on its type
      addressComponents.forEach((component: AddressComponent) => {
        if (component.types.includes("street_number")) {
          addressData.street = component.long_name + " ";
        } else if (component.types.includes("route")) {
          addressData.street += component.long_name;
        }
        // City (locality or sublocality)
        else if (
          component.types.includes("locality") ||
          component.types.includes("sublocality")
        ) {
          addressData.city = component.long_name;
        }
        // State (administrative_area_level_1)
        else if (component.types.includes("administrative_area_level_1")) {
          addressData.state = component.long_name;
        }
        // Postal code
        else if (component.types.includes("postal_code")) {
          addressData.postal_code = component.long_name;
        }
        // Country
        else if (component.types.includes("country")) {
          addressData.country = component.long_name;
        }
      });

      // Try to get a more accurate street address using reverse geocoding
      const streetData = await getStreetFromCoordinates(lat, lng);
      if (streetData && streetData.street) {
        addressData.street = streetData.street;
      }
      
      return addressData;
    } else {
      return {
        street: "",
        city: "",
        state: "",
        isError: true,
        postal_code: code,
        country: "",
      };
    }
  } catch {
    return {
      street: "",
      city: "",
      state: "",
      isError: true,
      postal_code: code,
      country: "",
    };
  }
};

/**
 * Get street address from coordinates (reverse geocoding)
 */
export const getStreetFromCoordinates = async (
  lat: number,
  lng: number
): Promise<AddressData | null> => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.results && data.results.length > 0) {
      const result = data.results[0];
      const addressComponents = result.address_components;

      const addressData: AddressData = {
        street: "",
        city: "",
        state: "",
        isError: false,
        postal_code: "",
        country: "",
        coordinates: { lat, lng },
      };

      addressComponents.forEach((component: AddressComponent) => {
        if (component.types.includes("street_number")) {
          addressData.street = component.long_name + " ";
        } else if (component.types.includes("route")) {
          addressData.street += component.long_name;
        }
        // City (locality or sublocality)
        else if (
          component.types.includes("locality") ||
          component.types.includes("sublocality")
        ) {
          addressData.city = component.long_name;
        }
        // State (administrative_area_level_1)
        else if (component.types.includes("administrative_area_level_1")) {
          addressData.state = component.long_name;
        }
        // Postal code
        else if (component.types.includes("postal_code")) {
          addressData.postal_code = component.long_name;
        }
        // Country
        else if (component.types.includes("country")) {
          addressData.country = component.long_name;
        }
      });

      return addressData;
    } else {
      return {
        street: "",
        city: "",
        state: "",
        isError: true,
        postal_code: "",
        country: "",
        coordinates: { lat, lng },
      };
    }
  } catch {
    return {
      street: "",
      city: "",
      state: "",
      isError: true,
      postal_code: "",
      country: "",
      coordinates: { lat, lng },
    };
  }
};
