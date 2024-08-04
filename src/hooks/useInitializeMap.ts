import { CurrentLocation } from "@/types";
import mapboxgl, { GeolocateControl } from "mapbox-gl";
import { MutableRefObject, useCallback, useEffect } from "react";

interface UseInitializeMapProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  setCurrentLocation: (location: CurrentLocation) => void;
}

export const useInitializeMap = ({
  mapRef,
  setCurrentLocation,
}: UseInitializeMapProps) => {
  const handleGeolocate = useCallback(
    (geolocate: GeolocateControl) => {
      const userlocation = geolocate._lastKnownPosition;
      const lat = userlocation?.coords.latitude;
      const lng = userlocation?.coords.longitude;

      if (lat && lng) setCurrentLocation({ lat, lng });
    },
    [setCurrentLocation]
  );

  const handleMapLoad = (geolocate: GeolocateControl) => geolocate.trigger();

  const initializeMap = useCallback(() => {
    let mapRefValue = null;
    mapRef.current = new mapboxgl.Map({
      container: "map",
      center: [52.5220854, 13.4358992], // starting position [lng, lat].
      style: "mapbox://styles/mapbox/streets-v11",
    });

    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapRef.current.addControl(geolocate);
    mapRef.current.on("load", () => handleMapLoad(geolocate));
    mapRefValue = mapRef.current;
    geolocate.on("geolocate", () => handleGeolocate(geolocate));

    return () => {
      mapRefValue.off("load", () => handleMapLoad(geolocate));
      geolocate.off("geolocate", () => handleGeolocate(geolocate));
    };
  }, [handleGeolocate, mapRef]);

  useEffect(() => initializeMap(), [initializeMap]);
};
