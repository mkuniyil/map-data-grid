interface Geometry {
  type: string;
  coordinates: Array<number>;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export type Features = Array<Feature>;

export interface CurrentLocation {
  lat: number;
  lng: number;
}

export interface MarkerType {
  [key: string]: mapboxgl.Marker;
}

export interface SearchDataResults {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface TileQueryResults {
  type: string;
  features: TileQueryFeature[];
  attribution: string;
  query: Array<string>;
}

export interface TileQueryFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  place_formatted: string;
  context: Context;
  bbox?: Array<number>;
}

export interface Context {
  street?: Locality;
  postcode?: Locality;
  locality?: Locality;
  place?: District;
  region?: Region;
  country?: Country;
  district?: District;
}

export interface Country {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
  country_code?: string;
  country_code_alpha_3?: string;
}

export interface District {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
  short_code?: string;
}

export interface Locality {
  mapbox_id: string;
  name: string;
}

export interface Region {
  mapbox_id: string;
  name: string;
  wikidata_id?: string;
  region_code?: string;
  region_code_full?: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}
