import { StopBike, StartBike, GetParkingZones } from "./start-stop-ride";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: "/images/scooterMarker.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const customParkingIcon = new L.Icon({
  iconUrl: "/images/parkingicon.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

const customParkingAndCargingIcon = new L.Icon({
  iconUrl: "/images/parkingcharging.png",
  iconSize: [68, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

const profileIcon = new L.Icon({
  iconUrl: "/images/Profile.svg",
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48],
});

type CityProps = {
  cities: {
    city: string;
    city_registered: string;
    status: string;
    _id: string;
    parking_locations: {
      status: string;
      registered: string;
      address: string;
      longitude: number | string;
      latitude: number | string;
      charging_station: boolean;
    }[];
    speed_zones: {
      registered: string;
      address: string;
      longitude: number;
      latitude: number;
      speed_limit: number;
    }[];
  }[];
};

type BikeProps = {
  bikes: {
    id: string;
    status: string;
    city: string;
    current_location: string;
    battery: number;
    parked: string;
    rented: string;
    registered: string;
  }[];
};

const BikeMap: React.FC<BikeProps> = ({ bikes }) => {
  const [userLocation, setUserLocation] = useState<[number, number]>([
    56.1820964415348,
    15.591154345847087,
  ]);
  const [parkingZones, setParkingZones] = useState<CityProps["cities"]>([]);
  const mapRef = useRef<L.Map | null>(null); // Reference to the Leaflet map instance
  const [ridingBikeId, setRidingBikeId] = useState<string | undefined>(undefined);
  const handleStart = async (userId: string, bikeId: string) => {
        var test = await StartBike(userId, bikeId);
        if ( test == 200){
          setRidingBikeId(bikeId)
        }
        
    };
    // Handle the Put request and set the riding bike id to not be used anymore
    const handleStop = async (userId: string, bikeId: string) => {
        var test = await StopBike(userId, bikeId);
        if ( test == 200){
          setRidingBikeId(undefined)
        }
    };

    // Handle the fetched data and but it in a usestate
    const handleParkingZone = async () => {
      try {
        const citiesData = await GetParkingZones();
        if (citiesData) {
          setParkingZones(citiesData);
          console.log("Fetched parking zones:", citiesData);
        }
      } catch (error) {
        console.error("Error fetching parking zones:", error);
      }
    };

    // just run the function
    useEffect(() => {
      handleParkingZone();
    }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  useEffect(() => {
    // Cleanup map instance using the container method
    const container = L.DomUtil.get("map");
    if (container) {
      container._leaflet_id = null; // Remove the _leaflet_id to effectively destroy the map instance
      console.log("Map instance cleaned up using L.DomUtil.get");
    }

    return () => {
      // Cleanup logic on component unmount
      const container = L.DomUtil.get("map");
      if (container) {
        container._leaflet_id = null;
        console.log("Map instance cleaned up on unmount using L.DomUtil.get");
      }
    };
  }, [bikes]); // Trigger cleanup whenever bikes data changes


  
  return (
    <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
      <MapContainer
        id="map" // Assign an ID to the map container for DOM manipulation
        center={userLocation}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation} icon={profileIcon}>
          <Popup>
            🚲 You are here! <br /> Find bikes near your location.
          </Popup>
        </Marker>

        {parkingZones.map((city) =>
          city.parking_locations.map((location, index) => {
            const lat = parseFloat(location.latitude as string);
            const lng = parseFloat(location.longitude as string);
            const position: [number, number] = [lat, lng];
            const radius = 100; 
            const circleOptions = { color: 'steelblue', fillColor: 'blue', fillOpacity: 0.1 };

            if (!isNaN(lat) && !isNaN(lng) && !location.charging_station) {
              return (
                <React.Fragment key={index}>
                  <Marker position={position} icon={customParkingIcon}>
                    <Popup>
                      <strong>Parking Location:</strong> {location.address}
                      <br />
                      Status: {location.status}
                    </Popup>
                  </Marker>
                  <Circle center={position} radius={radius} pathOptions={circleOptions} />
                </React.Fragment>
              );
            } else if (!isNaN(lat) && !isNaN(lng)) {
              return (
                <React.Fragment key={index}>
                  <Marker position={position} icon={customParkingAndCargingIcon}>
                    <Popup>
                      <strong>Parking Location:</strong> {location.address}
                      <br />
                      Status: {location.status}
                      <br />
                      Registered: {location.registered}
                    </Popup>
                  </Marker>
                  <Circle center={position} radius={radius} pathOptions={circleOptions} />
                </React.Fragment>
              );
            } else {
              console.warn(`Invalid coordinates for parking location: ${location.address}`);
              return null;
            }
          })
        )}
                {bikes.map((bike) => {
          const locationArray = bike.current_location.split(",");
          // Check if the location is valid before using it
          if (locationArray.length === 2) {
            const lat = parseFloat(locationArray[0]);
            const lng = parseFloat(locationArray[1]);

            // Only render the marker if the coordinates are valid
            if (!isNaN(lat) && !isNaN(lng) && bike.status == "available") {
              return (
                <Marker key={bike.id} position={[lat, lng]} icon={customIcon}>
                  <Popup>
                    <strong>Bike ID: {bike.id}</strong>
                    {/* Status: {bike.status} */}
                    <div className="flex items-center gap-2">
            
                    Battery: {bike.battery}%
                    {bike.battery > 75 ?  <img className="w-8"src="/images/batteryFull.png" alt="Full Battery" /> 
                    : bike.battery > 50 ? <img className="w-8"src="/images/batteryAlmostFull.png" alt="Almost full Battery" /> 
                    : <img className="w-8"src="/images/batteryEmpty.png" alt="Almost empty" /> }
                    </div>
                    <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-brown-dark py-4 hover:bg-brown-light text-white transition-all rounded-lg'>
                    {ridingBikeId === bike.id ? (
                        <button className="text-xl" onClick={() => handleStop("678d1865343cc5d7109e7ee5", bike.id)}>
                          Stop Ride ⛔
                        </button>
                      ) : ridingBikeId ? (
                        <button className="text-xl" disabled>
                          You already have a different ride started 🫷
                        </button>
                      ) : (
                        <button className="text-xl" onClick={() => handleStart("678d1865343cc5d7109e7ee5", bike.id)}>
                          Start Ride 🛴
                        </button>
                      )}

                   
                    
                    </div>
                  </Popup>
                </Marker>
              );
            } else {
              console.warn(`Invalid coordinates for bike ${bike.id}: ${bike.current_location}`);
              return null; // Return nothing for invalid data
            }
          } else {
            console.warn(`Invalid location format for bike ${bike.id}: ${bike.current_location}`);
            return null; // Return nothing if the format is incorrect
          }
        })}
      </MapContainer>
    </div>
  );
};

export default BikeMap;