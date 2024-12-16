"use client";

import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && window.google) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 59.3293, lng: 18.0686 }, // Stockholm coordinates
          zoom: 10,
        });

        // Example: Add a marker
        new google.maps.Marker({
          position: { lat: 59.3293, lng: 18.0686 },
          map: map,
          title: "Stockholm",
        });
      }
    };

    if (typeof window.google !== "undefined") {
      initializeMap();
    } else {
      window.addEventListener("load", initializeMap);
    }

    return () => {
      window.removeEventListener("load", initializeMap);
    };
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
}
