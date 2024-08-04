import { MarkerType } from "@/types";
import mapboxgl from "mapbox-gl";
import { MutableRefObject, useCallback } from "react";

interface UseMarkerProps {
  mapMarkersRef: MutableRefObject<MarkerType>;
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  setMapMarkers: (markers: MarkerType) => void;
}

export const useMarker = ({
  mapMarkersRef,
  mapRef,
  setMapMarkers,
}: UseMarkerProps) => {
  const deleteMarker = useCallback(
    (key: string) => {
      const existingMarKer = mapMarkersRef.current?.[key];

      if (existingMarKer) {
        existingMarKer.remove();

        const newMarkers = { ...mapMarkersRef.current };
        delete newMarkers[key];
        setMapMarkers(newMarkers);
      }
    },
    [mapMarkersRef, setMapMarkers]
  );

  const removeMarkers = useCallback(() => {
    if (Object.keys(mapMarkersRef.current).length === 0) return;

    Object.keys(mapMarkersRef.current).forEach(deleteMarker);
  }, [deleteMarker, mapMarkersRef]);

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
