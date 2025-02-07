"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import { customIcon, customParkingIcon, customParkingAndCargingIcon } from '../../components/Icons';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle } from "react-leaflet";
import { StopBike, StartBike } from "../../components/start-stop-ride";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import '../user.css';

export default function UserMap() {
    const api_key="5b3ce3597851110001cf624867c121a4001444dcbafd925164cfb40e";
    const userID = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    const [startPosition, setStartPosition] = useState("");
    const [stopPosition, setStopPosition] = useState("");
    const [coordinates, setCoordinates] = useState([]);
    const longitudes = [];
    const latitudes = [];

    const [bikes, setBikes] = useState([]);
    const [cities, setCities] = useState([]);
    const [ridingBikeID, setRidingBikeID] = useState<string | undefined>(undefined);

    const [message, setMessage] = useState("");
    const [suspended, setSuspended] = useState(false);

    const socket = useRef(null);

    const [nrOfBikes, setNrOfBikes] = useState({
        "Göteborg C": 0,
        "Avenyn": 0,
        "Haga": 0,
        "Odenplan": 0,
        "Centralstation": 0,
        "Gamla Stan": 0,
        "Blekinge Museum": 0,
        "Stortorget": 0,
        "Fortifikationsgatan": 0
    });

    const countBikes = async () => {
        const response = await fetch("http://localhost:1337/admin/collections/bikes/data");
        const data = await response.json();

        for (const item of data) {
            if (item.current_location.latitude === 57.7089) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Göteborg C":nrOfBikes["Göteborg C"]+1}));
            } else if (item.current_location.latitude === 57.7072) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Avenyn":nrOfBikes["Avenyn"]+1}));
            } else if (item.current_location.latitude === 57.7058) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Haga":nrOfBikes["Haga"]+1}));
            } else if (item.current_location.latitude === 59.3428) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Odenplan":nrOfBikes["Odenplan"]+1}));
            } else if (item.current_location.latitude === 59.3293) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Centralstation":nrOfBikes["Centralstation"]+1}));
            } else if (item.current_location.latitude === 59.3328) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Gamla Stan":nrOfBikes["Gamla Stan"]+1}));
            } else if (item.current_location.latitude === 56.1624) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Blekinge Museum":nrOfBikes["Blekinge Museum"]+1}));
            } else if (item.current_location.latitude === 56.1612) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Stortorget":nrOfBikes["Stortorget"]+1}));
            } else if (item.current_location.latitude === 56.1608) {
                setNrOfBikes(nrOfBikes => ({...nrOfBikes, "Fortifikationsgatan":nrOfBikes["Fortifikationsgatan"]+1}));
            }
        }
    }

    const getParkingZones = async () => {
        fetch(`http://localhost:1337/admin/collections/cities/data`)
        .then(res => res.json())
        .then(json => setCities(json))
        .catch((error) => console.log(error))
    }

    const getUserDetails = async () => {
        const response = await axios.get(`http://localhost:1337/user/details/${email}`);

        if (response.data.result.account_suspended) {
            setSuspended(true);
        }
    }

    useEffect(() => {
        getParkingZones();
        getUserDetails();
        countBikes();

    }, []);

    const handleStart = async (bikeID: string, startLat: string, startLon: string) => {
        setStartPosition(`${startLon},${startLat}`);

        if (!userID) {
            console.error("No user_id found in localStorage");
            return;
        }

        var test = await StartBike(userID, bikeID);
        if (test === 200) {
            setRidingBikeID(bikeID);
        }
    };

    const handleStop = async (bikeID: string) => {
        const response = await StopBike(userID, bikeID);
        if (response === 200) {
            setRidingBikeID(undefined);
            setMessage("Resan har avslutats!")
        }
    };

    const startRide = () => {
        if (stopPosition !== "" && ridingBikeID) {
            console.log("Ride started")
            getDirections();
        }
    }

    const MapClicking = () => {
        const mapEvent = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                if (ridingBikeID) {
                    setStopPosition(`${lng.toString()},${lat.toString()}`);
                }
            }
        });

        return null;
    }

    useEffect(() => {
        startRide();

    }, [stopPosition]);

    useEffect(() => {
        for (let i=0; i<coordinates.length; i++) {
            longitudes.push(coordinates[i][0]);
            latitudes.push(coordinates[i][1]);
        }

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


    useEffect(() => {
        socket.current = io("http://localhost:1337");

        socket.current.on("initial_data", (data) => {
            setBikes(data);
        });

        return () => {
            socket.current.disconnect();
        }

    }, []);

    const animation = async () => {
        let i = 0;
        const interval = setInterval(async () => {
            if (i >= latitudes.length) {
                console.log("STOP");
                handleStop(ridingBikeID);
                clearInterval(interval);
                return;
            }

            let data = {
                bikeID: ridingBikeID,
                position: {
                    latitude: latitudes[i],
                    longitude: longitudes[i]
                }
            }

            socket.current.emit("single_content", data);
            i++;

        }, 1500);
    }

    useEffect(() => {
        socket.current.on("single_content", (updated_bikes) => {
            setBikes(updated_bikes);
        })

    }, [socket])

    return (
        <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
            <MapContainer
                id="map"
                center={[56.162856, 15.586438]} // karlskrona
                //center={[57.707445, 11.965957]} // göteborg
                zoom={14}
                style={{ height: "65%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    city.parking_locations.map((location, index) => (
                        <React.Fragment key={index}>
                            <Marker position={[location.latitude, location.longitude]} icon={location.charging_station ? customParkingAndCargingIcon : customParkingIcon}>
                                <Popup>
                                    <strong>Parkingsplats:</strong> {location.address}
                                    <br />
                                    Antal cyklar: {nrOfBikes[location.address]}
                                    <br />
                                    Status: {location.status}
                                    <br />
                                    Registrerad: {location.registered}
                                </Popup>
                            </Marker>
                            <Circle center={[location.latitude, location.longitude]} radius={40} pathOptions={{ color: 'steelblue', fillColor: 'blue', fillOpacity: 0.1 }} />
                        </React.Fragment>
                )))}
                {bikes.map((bike, index) => (
                    <Marker
                        key={index}
                        position={[bike.current_location.latitude,bike.current_location.longitude]}
                        icon={customIcon} >
                        <Popup>
                            <strong>BikeID: {bike._id}</strong>
                            <div className="flex items-center gap-2">
                                Battery: {bike.battery}%
                                {bike.battery > 75 ?  <img className="w-8"src="/images/batteryFull.png" alt="Full Battery" /> 
                                : bike.battery >= 50 ? <img className="w-8"src="/images/batteryAlmostFull.png" alt="Almost full Battery" /> 
                                : <img className="w-8"src="/images/batteryEmpty.png" alt="Almost empty" /> }
                            </div>
                            <div className='flex flex-col items-center justify-center gap-4 w-60 h-27 bg-brown-dark py-4 hover:bg-brown-light text-white transition-all rounded-lg'>
                                {ridingBikeID === bike._id ? (
                                    <button className="text-xl" onClick={() => handleStop(bike._id)}>
                                    Stoppa åktur ⛔
                                    </button>
                                ) : ridingBikeID ? (
                                    <button className="text-xl" disabled>
                                    Du har redan en aktiv uthyrning 🫷
                                    </button>
                                ) : suspended ? (
                                    <p className="text-xl">Uthyrning ej tillgänglig</p>
                                ) : bike.disabled ? (
                                    <p className="text-xl">Cykeln är ur bruk</p>
                                ) : bike.battery < 10 ? (
                                    <p className="text-xl">Cykeln behöver laddas</p>
                                ) : (
                                    <button className="text-xl" onClick={() => handleStart(bike._id, bike.current_location.latitude, bike.current_location.longitude)}>
                                    Lås upp cykel 🛴
                                    </button>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
                <MapClicking />
            </MapContainer>
            <button className="change-pwd-btn" onClick={animation} disabled={ suspended ? true : false } >Kör!</button>
            {suspended ?
                <div className="info-div" >
                    <h2 className="text-1xl font-semibold">Välkommen, {localStorage.getItem("email")}!</h2>
                    <p className="error-message">Ditt konto är för närvarande avstängt</p>
                </div>
                :
                <div className="info-div" >
                    <h2 className="text-1xl font-semibold">Välkommen, {localStorage.getItem("email")}!</h2>
                    <p>Cykel-ID: {ridingBikeID} </p>
                    <p>Start: {startPosition} </p>
                    <p>Stopp: {stopPosition} </p>
                    <p className="success-message">{message}</p>
                </div>
        }

        </div>
    )
}
