"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: "/images/scooterMarker.svg", // Path to your custom icon in the public folder
  iconSize: [48, 48],          // Size of the icon [width, height]
  iconAnchor: [24, 48],        // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -48],       // Position of the popup relative to the icon
});

// Define a custom icon
const profileIcon = new L.Icon({
  iconUrl: "/images/Profile.svg", // Path to your custom icon in the public folder
  iconSize: [48, 48],          // Size of the icon [width, height]
  iconAnchor: [24, 48],        // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -48],       // Position of the popup relative to the icon
});



const locations = [
  { id: 2, lat: 56.1569, lng: 15.5918, title: "Bike Stop 2", description: "Bike station 2 around Karlskrona", available: true, charging:true, battery: 100 },
  { id: 5, lat: 56.1576, lng: 15.5775, title: "Bike Stop 5", description: "Bike station 5 around Karlskrona", available: true, charging:true, battery: 20  },
  { id: 7, lat: 56.1562, lng: 15.5819, title: "Bike Stop 7", description: "Bike station 7 around Karlskrona", available: false, charging:false, battery: 100  },
  { id: 8, lat: 56.1614, lng: 15.5731, title: "Bike Stop 8", description: "Bike station 8 around Karlskrona", available: false, charging:false, battery: 30  },
  { id: 9, lat: 56.1667, lng: 15.5875, title: "Bike Stop 9", description: "Bike station 9 around Karlskrona", available: true, charging:true, battery: 40  },
  { id: 10, lat: 56.1592, lng: 15.5907, title: "Bike Stop 10", description: "Bike station 10 around Karlskrona", available: true, charging:true, battery: 50  },
  { id: 11, lat: 56.1716, lng: 15.5908, title: "Bike Stop 11", description: "Bike station 11 around Karlskrona", available: false, charging:false, battery: 60  },
  { id: 12, lat: 56.1659, lng: 15.5862, title: "Bike Stop 12", description: "Bike station 12 around Karlskrona", available: false, charging:false, battery: 70  },
  { id: 13, lat: 56.1555, lng: 15.5893, title: "Bike Stop 13", description: "Bike station 13 around Karlskrona", available: false, charging:false, battery: 80  },
  { id: 14, lat: 56.1567, lng: 15.5877, title: "Bike Stop 14", description: "Bike station 14 around Karlskrona", available: true, charging:true, battery: 900  },
  { id: 15, lat: 56.1656, lng: 15.5726, title: "Bike Stop 15", description: "Bike station 15 around Karlskrona", available: false, charging:false, battery: 100  },
  { id: 17, lat: 56.1522, lng: 15.5844, title: "Bike Stop 17", description: "Bike station 17 around Karlskrona", available: true, charging:true, battery: 90  },
  { id: 18, lat: 56.1557, lng: 15.5772, title: "Bike Stop 18", description: "Bike station 18 around Karlskrona", available: true, charging:true, battery: 80  },
  { id: 20, lat: 56.1628, lng: 15.5790, title: "Bike Stop 20", description: "Bike station 20 around Karlskrona", available: false, charging:false, battery: 70  },
  { id: 21, lat: 56.1694, lng: 15.5880, title: "Bike Stop 21", description: "Bike station 21 around Karlskrona", available: false, charging:false, battery: 60  },
  { id: 22, lat: 56.1703, lng: 15.6010, title: "Bike Stop 22", description: "Bike station 22 around Karlskrona", available: false, charging:false, battery: 50  },
  { id: 23, lat: 56.1628, lng: 15.5921, title: "Bike Stop 23", description: "Bike station 23 around Karlskrona", available: true, charging:true, battery: 40  },
  { id: 24, lat: 56.1714, lng: 15.5974, title: "Bike Stop 24", description: "Bike station 24 around Karlskrona", available: true, charging:true, battery: 30  },
  { id: 25, lat: 56.1604, lng: 15.5757, title: "Bike Stop 25", description: "Bike station 25 around Karlskrona", available: true, charging:true, battery: 20  },
  { id: 26, lat: 56.1571, lng: 15.5890, title: "Bike Stop 26", description: "Bike station 26 around Karlskrona", available: false, charging:false, battery: 10  },
  { id: 27, lat: 56.1680, lng: 15.5918, title: "Bike Stop 27", description: "Bike station 27 around Karlskrona", available: false, charging:false, battery: 20  },
  { id: 28, lat: 56.1540, lng: 15.5802, title: "Bike Stop 28", description: "Bike station 28 around Karlskrona", available: true, charging:true, battery: 30  },
  { id: 30, lat: 56.1584, lng: 15.5852, title: "Bike Stop 30", description: "Bike station 30 around Karlskrona", available: true, charging:true, battery: 40  },
  { id: 29, lat: 56.1602, lng: 15.5685, title: "Bike Stop 2", description: "Bike station 2 near Bergåsa, Karlskrona", available: false, charging:false, battery: 50  },
  { id: 31, lat: 56.1605, lng: 15.5669, title: "Bike Stop 3", description: "Bike station 3 near Bergåsa, Karlskrona", available: true, charging:true, battery: 60  },
  { id: 33, lat: 56.1610, lng: 15.5638, title: "Bike Stop 5", description: "Bike station 5 near Bergåsa, Karlskrona", available: true, charging:true, battery: 70  },
];




const BikeMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([56.1820964415348, 15.591154345847087]); // Default to Stockholm (latitude, longitude)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
      {/* MapContainer requires center and zoom */}
      <MapContainer
        center={userLocation}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
       
        {/* OpenStreetMap tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Place a marker at the user's location */}
        <Marker position={userLocation}>
          <Popup>
            🚲 You are here! <br /> Find bikes near your location.
          </Popup>
        </Marker>

        {locations.map((location) => (
        <Marker key={location.id} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>
            <strong>🚲{location.title}</strong>
            <br />
            {location.available ? location.available :   "Not available"}
            {location.charging ? location.charging :  <img className="w-8"src="/images/charging.png" alt="chargeicon" /> }
            {location.battery > 75 ?  <img className="w-8"src="/images/batteryFull.png" alt="Full Battery" /> 
            : location.battery > 50 ? <img className="w-8"src="/images/batteryAlmostFull.png" alt="Almost full Battery" /> 
            : <img className="w-8"src="/images/batteryEmpty.png" alt="Almost empty" /> }

          </Popup>
        </Marker>
        
      ))}

      </MapContainer>
    </div>
  );
};

export default BikeMap;
