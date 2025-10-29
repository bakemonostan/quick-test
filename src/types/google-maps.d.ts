// Type definitions for Google Maps API
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
  }

  class Marker {
    constructor(opts?: MarkerOptions);
  }

  class Geocoder {
    geocode(request: GeocoderRequest): Promise<GeocoderResponse>;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    [key: string]: unknown;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    [key: string]: unknown;
  }

  interface LatLng {
    lat(): number;
    lng(): number;
    toJSON(): LatLngLiteral;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface GeocoderRequest {
    address?: string;
    [key: string]: unknown;
  }

  interface GeocoderResponse {
    results: GeocoderResult[];
    status: string;
  }

  interface GeocoderResult {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: {
      location: LatLng;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }
} 
