"use client";
import { WORLD_DOTS_PATH } from "@/lib/world-dots";

// [latitude, longitude]
const LOCATION_COORDS = {
  "saudi arabia": [24.7136, 46.6753],
  "india": [20.5937, 78.9629],
  "london": [51.5074, -0.1278],
  "canada": [56.1304, -106.3468],
};

const DEFAULT_CENTER = [20, 0];

function getCoordinates(location) {
  if (!location) return null;
  return LOCATION_COORDS[location.toLowerCase()] || null;
}

// Dotted world map drawn in SVG: no API key, no tile requests.
function LocationMap({ location, zoom = 4, className }) {
  const coords = getCoordinates(location);
  const [lat, lon] = coords || DEFAULT_CENTER;
  const half = coords ? 160 / zoom : 90;

  return (
    <svg
      role="img"
      aria-label={location ? `Map showing ${location}` : "World map"}
      viewBox={`${lon - half} ${-lat - half} ${half * 2} ${half * 2}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{
        display: "block",
        maskImage: "radial-gradient(circle at center, #000 55%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at center, #000 55%, transparent 100%)",
      }}
    >
      <path
        d={WORLD_DOTS_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {coords && (
        <g transform={`translate(${lon} ${-lat})`}>
          <circle r="1.6" fill="#ef4444" opacity="0.6">
            <animate attributeName="r" from="1.6" to="8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r="1.7" fill="#ef4444" stroke="#fff" strokeWidth="0.5" />
        </g>
      )}
    </svg>
  );
}

export { LocationMap, LOCATION_COORDS };
