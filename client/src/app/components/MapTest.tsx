import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks';
import { StopBike, StartBike, GetParkingZones } from "./start-stop-ride";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import '../user/user.css';

const profileIcon = new L.Icon({
    iconUrl: "/images/Profile.svg",
    iconSize: [25, 25],
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
    iconSize: [60, 68],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
});

const customIcon = new L.Icon({
    iconUrl: "/images/scooterMarker.svg",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
});

export default function MapTest() {
    // const position = [57.707155, 11.966877];
    const [position, setPosition] = useState([56.16581771266696,15.592670275708088])
    const api_key="5b3ce3597851110001cf624867c121a4001444dcbafd925164cfb40e";
    // const [startPosition, setStartPosition] = useState("15.5895,56.1608");
    const [startPosition, setStartPosition] = useState("");
    const [stopPosition, setStopPosition] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const longitudes = [];
    const latitudes = [];

    const [bikes, setBikes] = useState([]);
    const [ridingBikeId, setRidingBikeId] = useState<string | undefined>(undefined);
    const [cities, setCities] = useState([]);

    const [currentPosition, setCurrentPosition] = useState([]);

    const getBikes = async () => {
        fetch(`http://localhost:1337/admin/collections/bikes/data`)
        .then(res => res.json())
        .then(json => setBikes(json))
        .catch((error) => console.log(error))
    }

    const getParkingZones = async () => {
        fetch(`http://localhost:1337/admin/collections/cities/data`)
        .then(res => res.json())
        .then(json => setCities(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getBikes();
        getParkingZones();

        // eslint-disable-next-line
    }, []);

    const handleStart = async (bikeId: string, startLat: string, startLon: string) => {
        const userId = localStorage.getItem("user_id") || "";
        // @ts-ignore
        setCurrentPosition([startLat, startLon]);
        setStartPosition(`${startLon},${startLat}`);

        if (!userId) {
            console.error("No user_id found in localStorage");
            return;
        }

        var test = await StartBike(userId, bikeId);
        if (test === 200) {
            setRidingBikeId(bikeId);
        }
    };

    const handleStop = async (bikeId: string) => {
        const userId = localStorage.getItem("user_id") || "";

        if (!userId) {
            console.error("No user_id found in localStorage");
            return;
        }

        var test = await StopBike(userId, bikeId);
        if (test === 200) {
            setRidingBikeId(undefined);
            await axios.put(`http://localhost:1337/bike/${bikeId}/position/${stopPosition.split(",")[0]}/${stopPosition.split(",")[1]}`);
        }
    };

    // Fixa den här! else behövs inte
    const startRide = () => {
        if (stopPosition !== "") {
            if (ridingBikeId) {
                console.log("ride started")
                getDirections();
                // setStopPosition(`${lng},${lat}`);
            } else {
                getDirections();

                console.log("no ride started")
            }
        }
    }

    const MyComponent = () => {
        const map = useMap(); // behövs den här?
        const mapEvent = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setStopPosition(`${lng.toString()},${lat.toString()}`);
                // startRide();
                // startRide((e.latlng.lng).toFixed(4).toString(), (e.latlng.lat).toFixed(4).toString());
                // L.marker([lat, lng], { profileIcon }).addTo(map);
            }
        });

        return null
    }

    useEffect(() => {
        startRide();

        // eslint-disable-next-line
    }, [stopPosition]);

    useEffect(() => {
        for (let i=0; i<coordinates.length; i++) {
            longitudes.push(coordinates[i][0]);
            latitudes.push(coordinates[i][1]);
        }

        // eslint-disable-next-line
    }, [coordinates]);

    const getDirections = () => {
        let request = new XMLHttpRequest();

        request.open('GET', `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${startPosition}&end=${stopPosition}`);

        request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                const responseText = this.responseText;
                const json = JSON.parse(responseText);
                const coords = json.features[0].geometry.coordinates;
                setCoordinates(coords);
            }
        };

        request.send();
    }

    const animation = async () => {
        let i = 0;
        const interval = setInterval(async () => {
            if (i >= latitudes.length) {
                console.log("STOP");
                handleStop(ridingBikeId);
                clearInterval(interval);
                return;
            }
            // @ts-ignore
            setCurrentPosition([latitudes[i], longitudes[i]]);
            i++;
        }, 500);
    }

    return (
        <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
            <p>Startposition: {startPosition}</p>
            <p>Slutdestination: {stopPosition}</p>
            <p>Riding bike id: {ridingBikeId}</p>
            <button onClick={() => handleStop("67923c7d4705ba95f00d985e")}>Stop ride</button>
            {/* {coordinates ? <div>{JSON.stringify(coordinates)}</div> : <div>Loading...</div>} */}
            <MapContainer
                id="map" // Assign an ID to the map container for DOM manipulation
                center={[56.162856, 15.586438]}
                zoom={14}
                style={{ height: "80%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    city.parking_locations.map((location, index) => {
                        const lat = parseFloat(location.latitude as string);
                        const lng = parseFloat(location.longitude as string);
                        const position: [number, number] = [lat, lng];
                        const radius = 40; 
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
                {bikes.map((bike, i) => (
                    <Marker position={ridingBikeId ? currentPosition : [bike.current_location.latitude,bike.current_location.longitude]} icon={customIcon} key={i} >
                        <Popup>
                            <strong>BikeID: {bike._id}</strong>
                            <div className="flex items-center gap-2">
                                Battery: {bike.battery}%
                                {bike.battery > 75 ?  <img className="w-8"src="/images/batteryFull.png" alt="Full Battery" /> 
                                : bike.battery > 50 ? <img className="w-8"src="/images/batteryAlmostFull.png" alt="Almost full Battery" /> 
                                : <img className="w-8"src="/images/batteryEmpty.png" alt="Almost empty" /> }
                            </div>
                            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-brown-dark py-4 hover:bg-brown-light text-white transition-all rounded-lg'>
                                {ridingBikeId === bike._id ? (
                                    <button className="text-xl" onClick={() => handleStop(bike._id)}>
                                    Stop Ride ⛔
                                    </button>
                                ) : ridingBikeId ? (
                                    <button className="text-xl" disabled>
                                    You already have a different ride started 🫷
                                    </button>
                                ) : (
                                    <button className="text-xl" onClick={() => handleStart(bike._id, bike.current_location.latitude, bike.current_location.longitude)}>
                                    Start Ride 🛴
                                    </button>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <MyComponent />
            </MapContainer>
            <button className="change-pwd-btn" onClick={animation} >Start ride</button>
        </div>
    )
}
