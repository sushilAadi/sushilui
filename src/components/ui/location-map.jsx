"use client";
import { Map, MapMarker, MapTileLayer } from "@/components/ui/map";

const DARK_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

const LOCATION_COORDS = {
  "saudi arabia": [24.7136, 46.6753],
  "india": [20.5937, 78.9629],
  "london": [51.5074, -0.1278],
  "canada": [56.1304, -106.3468],
};

const DEFAULT_CENTER = [20, 0];
const DEFAULT_ZOOM = 2;

function getCoordinates(location) {
  if (!location) return null;
  return LOCATION_COORDS[location.toLowerCase()] || null;
}

function LocationMap({ location, zoom = 4, className }) {
  const coords = getCoordinates(location);
  const center = coords || DEFAULT_CENTER;
  const mapZoom = coords ? zoom : DEFAULT_ZOOM;

  return (
    <Map center={center} zoom={mapZoom} className={className}>
      <MapTileLayer url={DARK_TILE_URL} />
      {coords && (
        <MapMarker
          position={coords}
          icon={
            <img
              src="/favicon.ico"
              alt="Location"
              width={16}
              height={16}
              style={{ background: "transparent", border: "none" }}
            />
          }
          iconAnchor={[8, 8]}
        />
      )}
    </Map>
  );
}

export { LocationMap, LOCATION_COORDS };
