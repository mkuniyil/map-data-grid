import { ACCESS_TOKEN } from "@/config";
import { useInitializeMap } from "@/hooks/useInitializeMap";
import { useMarker } from "@/hooks/useMarker";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useHandleMapMove } from "../../hooks/useHandleMapMove";
import { CurrentLocation, MarkerType, TileQueryFeature } from "../../types";
import { DataGrid } from "../DataGrid";
import { Search } from "../Search";
import "./AppMap.css";

mapboxgl.accessToken = ACCESS_TOKEN;

export const AppMap = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [localeApiResults, setLocaleApiResults] = useState<
    Array<TileQueryFeature>
  >([]);
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null);
  const [mapMarkers, setMapMarkers] = useState<MarkerType>({});
  const mapMarkersRef = useRef<MarkerType>(mapMarkers);

  useInitializeMap({ mapRef, setCurrentLocation });

  useEffect(() => {
    mapMarkersRef.current = mapMarkers;
  }, [mapMarkers]);

  const { createMarkers, removeMarkers } = useMarker({
    mapMarkersRef,
    mapRef,
    setMapMarkers,
  });

  useHandleMapMove({
    createMarkers,
    currentLocation,
    setLocaleApiResults,
    removeMarkers,
    mapRef,
  });

  return (
    <div className="flex flex-col md:gap-8 md:m-6">
      <div
        id="map"
        className="md:rounded-lg h-screen md:h-[50vh] md:drop-shadow-sm"
      >
        <Search mapRef={mapRef} createMarkers={createMarkers} />
      </div>
      <DataGrid localeApiResults={localeApiResults} />
    </div>
  );
};
