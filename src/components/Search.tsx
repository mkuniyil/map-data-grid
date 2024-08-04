import { ACCESS_TOKEN } from "@/config";
import { Geocoder } from "@mapbox/search-js-react";
import { debounce } from "lodash";
import mapboxgl from "mapbox-gl";
import { FC, RefObject, useState } from "react";

interface SearchProps {
  mapRef: RefObject<mapboxgl.Map | null>;
  createMarkers: (
    longitude: number,
    latitude: number,
    description: string
  ) => void;
}

export const Search: FC<SearchProps> = ({ mapRef, createMarkers }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchChange = debounce((d) => {
    setInputValue(d);
  }, 300);

  const handleSearchListClick = ({ geometry, properties }: any) => {
    const [longitude, latitude] = geometry.coordinates;
    createMarkers(longitude, latitude, properties.name_preferred);
  };

  return (
    // @ts-ignore
    <Geocoder
      accessToken={ACCESS_TOKEN}
      map={mapRef.current as mapboxgl.Map}
      mapboxgl={mapboxgl}
      value={inputValue}
      onChange={handleSearchChange}
      onRetrieve={handleSearchListClick}
    />
  );
};
