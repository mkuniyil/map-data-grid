import { MarkerType } from "@/types";
import mapboxgl from "mapbox-gl";
import { MutableRefObject, useCallback } from "react";

interface UseMarkerProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  setMapMarkers: (markers: MarkerType) => void;
  mapMarkers: MarkerType;
}

export const useMarker = ({
  mapRef,
  setMapMarkers,
  mapMarkers = {},
}: UseMarkerProps) => {
  const deleteMarker = useCallback(
    (key: string) => {
      const existingMarKer = mapMarkers[key];

      if (existingMarKer) {
        existingMarKer.remove();

        const newMarkers = { ...mapMarkers };
        delete newMarkers[key];
        setMapMarkers(newMarkers);
      }
    },
    [mapMarkers, setMapMarkers]
  );

  const removeMarkers = useCallback(() => {
    if (Object.keys(mapMarkers).length === 0) return;

    Object.keys(mapMarkers).forEach(deleteMarker);
  }, [deleteMarker, mapMarkers]);

  const createPopup = (text: string) =>
    new mapboxgl.Popup({ offset: 25, closeOnClick: false }).setHTML(
      `<h3>${text}</h3>`
    );

  const createMarkers = useCallback(
    (lng: number, lat: number, description: string) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(createPopup(description))
        .addTo(mapRef.current as mapboxgl.Map);

      // @ts-ignore
      setMapMarkers((prev: any) => ({ ...prev, [`${lng}-${lat}`]: marker }));
    },
    [mapRef, setMapMarkers]
  );

  return {
    createMarkers,
    removeMarkers,
  };
};
