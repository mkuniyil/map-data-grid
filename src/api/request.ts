import { ACCESS_TOKEN } from "@/config";

export const getTileQueryResults = (proximity: string, bbox: string) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=${proximity}&bbox=${bbox}&access_token=${ACCESS_TOKEN}`;

  return getData(url);
};

const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
