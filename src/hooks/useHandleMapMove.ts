import { getTileQueryResults } from "@/api/request";
import { CurrentLocation, TileQueryFeature, TileQueryResults } from "@/types";
import { debounce } from "lodash";
import { MutableRefObject, useCallback, useEffect } from "react";

interface UseHandleMapMoveProps {
  currentLocation: CurrentLocation | null;
  setLocaleApiResults: (data: Array<TileQueryFeature>) => void;
  removeMarkers: () => void;
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  createMarkers: (
    longitude: number,
    latitude: number,
    desription: string
  ) => void;
}

export const useHandleMapMove = ({
  createMarkers,
  currentLocation,
  setLocaleApiResults,
  removeMarkers,
  mapRef,
}: UseHandleMapMoveProps) => {
  const handleFetchResults = useCallback(
    (results: TileQueryResults) => {
      if (!results?.features) return;

      removeMarkers();
      setLocaleApiResults(results.features);

      results.features.forEach((item: TileQueryFeature) => {
        const [lattitude, longitude] = item.center;
        createMarkers(lattitude, longitude, item.place_name);
      });
    },
    [createMarkers, removeMarkers, setLocaleApiResults]
  );

  const handleMapMove = useCallback(async () => {
    if (!currentLocation) return;

    const proximity = `${currentLocation?.lng}%2C${currentLocation?.lat}`;
    const bounds =
      mapRef.current?.getBounds()?.toArray().flat().join(",") ?? "";

    getTileQueryResults(proximity, bounds).then(handleFetchResults);
  }, [currentLocation, handleFetchResults, mapRef]);

  useEffect(() => {
    let mapRefValue = null;
    const debouncedHandleMapMove = debounce(handleMapMove, 1000);

    if (mapRef.current) {
      mapRef.current.on("move", debouncedHandleMapMove);
      mapRefValue = mapRef.current;
    }

    return () => {
      if (mapRefValue) {
        mapRefValue.off("move", debouncedHandleMapMove);
      }
    };
  }, [createMarkers, handleMapMove, mapRef]);
};
