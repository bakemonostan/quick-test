/* eslint-disable */
"use client";
import React, { useEffect, useState } from "react";
import { useVehicleListingStore } from "../vehicleListingstore";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  fetchAddressFromPostalCode,
  getStreetFromCoordinates,
} from "../utils/addressUtils";
import { useDebouncedCallback } from "@mantine/hooks";

export default function MapComponent() {
  const { address, postal_code, setAddress, setPostalCode, setToggleMap } =
    useVehicleListingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const getCoordinates = async () => {
      if (postal_code && (!address.coordinates || !address.coordinates.lat)) {
        setIsLoading(true);
        try {
          const addressData = await fetchAddressFromPostalCode(postal_code);
          if (addressData) {
            setAddress(addressData);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getCoordinates();
  }, [postal_code, address.coordinates, setAddress]);

  const containerStyle = {
    width: "100%",
    height: "241px",
  };

  // Ensure coordinates are never undefined
  const center = {
    lat: address.coordinates?.lat ?? 0,
    lng: address.coordinates?.lng ?? 0,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMapRef(null);
  }, []);

  const handleAddressUpdate = useDebouncedCallback(
    async (lat: number, lng: number) => {
      setIsLoading(true);
      try {
        // Get the address details from the new coordinates
        const addressData = await getStreetFromCoordinates(lat, lng);

        if (addressData && !addressData.isError) {
          // Update address with new data
          setAddress({
            ...addressData,
            coordinates: { lat, lng },
          });

          // Update postal code if found
          if (addressData.postal_code) {
            setPostalCode(addressData.postal_code);
          }
        } else {
          // If reverse geocoding failed, at least update the coordinates
          setAddress({
            ...address,
            coordinates: { lat, lng },
          });
        }
      } catch (error) {
        console.error("Error updating address from coordinates:", error);
        // Fall back to just updating coordinates
        setAddress({
          ...address,
          coordinates: { lat, lng },
        });
      } finally {
        setIsLoading(false);
        // Toggle map off to show the address form with updated fields
        setToggleMap(false);
      }
    },
    300
  );

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat !== undefined && lng !== undefined) {
      handleAddressUpdate(lat, lng);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">
        Loading address data...
      </div>
    );
  }

  if (!postal_code) {
    return (
      <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">
        Please enter a postal code to view the map
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">
        Loading map...
      </div>
    );
  }

  if (!address.coordinates?.lat || !address.coordinates?.lng) {
    return (
      <div className="h-[241px] w-full flex items-center justify-center bg-gray-100">
        No location found for this postal code
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      <Marker
        position={{
          lat: address.coordinates.lat,
          lng: address.coordinates.lng,
        }}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
      />
    </GoogleMap>
  );
}
