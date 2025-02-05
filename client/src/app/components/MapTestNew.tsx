import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { StopBike, StartBike } from "./start-stop-ride";
import { customIcon, customParkingIcon, customParkingAndCargingIcon, profileIcon } from './Icons';

import '../user/user.css';

export default function MapTestNew() {
    const [bikes, setBikes] = useState([]);
    const [users, setUsers] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [cities, setCities] = useState([]);

    // const allRentals = [];

    const socket = useRef(null);

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:1337/admin/collections/users/data");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getRoutes = async () => {
        try {
            const response = await fetch("http://localhost:1337/test/allRoutes");
            const data = await response.json();
            console.log(data)
            setRoutes(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const getCities = () => {
        fetch(`http://localhost:1337/admin/collections/cities/data`)
        .then(res => res.json())
        .then(json => setCities(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUsers();
        getRoutes();
        getCities();

    }, []);

    useEffect(() => {
        socket.current = io("http://localhost:1337");

        socket.current.on("initial_data", (data) => {
            setBikes(data);
        });

        return () => {
            socket.current.disconnect();
        }

    }, []);

    useEffect(() => {
        socket.current.on("content", (updated_bikes) => {
            setBikes(updated_bikes);
        })

    }, [socket])

    const animation = async (allRentals) => {
        let i = 0;

        const interval = setInterval(async () => {
            for (const rental of allRentals) {
                if (i >= rental[2].length) {
                    console.log("STOP");
                    // Remove rental from allRentals when route is finished
                    const index = allRentals.indexOf(rental);
                    allRentals.splice(index, 1);
                    const response = await StopBike(rental[0], rental[1]);
                    console.log(response)
                }
            }

            if (allRentals.length === 0) {
                console.log("EMPTY")
                clearInterval(interval);
                return;
            }

            let data = {
                rentals: allRentals,
                i: i
            }

            socket.current.emit("content", data);
            i += 2;
        }, 1000);
    }

    const startSimulation = () => {
        const userIDs = users.map(user => user._id);
        const allRentals = []; // Used for simulation
        const userBikePairs = []; // Used for making all API calls at the same time

        for (let i = 0; i < 7; i++) {
            const user = userIDs[i];
            const bike = bikes[i];
            const bikeID = bike._id;

            let route;
            let city = routes[bike.city];

            // Loop through all three stations of specified city to see which the bike's current position matches
            for (let j = 0; j < 3; j++) {
                // Latitude of parking spot
                const latitude = city[j][0][0];

                // Calculate latitude difference since it differs
                const diff = Math.abs(bike.current_location.latitude - latitude);

                if (diff < 0.0004) {
                    route = routes[bike.city][j][i];
                }
            }

            allRentals.push([user, bikeID, route]);
            userBikePairs.push(makeApiCalls(user, bikeID));
        }

        Promise.all(userBikePairs)
            .then((results) => {
                console.log('All API calls completed: ', results);
            })
            .then(() => animation(allRentals))
            .catch((error) => {
                console.error('Error with one or more API calls:', error);
            });
    }

    const makeApiCalls = async (userID: string, bikeID: string) => {
        const url = `http://localhost:1337/bike/start/${userID}/${bikeID}`;

        const response = await fetch(url, { method: 'PUT' });

        return response.json();
    };

    const moveBack = async () => {
        await axios.put("http://localhost:1337/test/resetAll");

        window.location.reload();
    }

    const stopAllRides = async () => {
        const response = await axios.put(`http://localhost:1337/test/stopAllRides`);
        console.log(response)
    }

    return (
        <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
            <button className="change-pwd-btn" onClick={stopAllRides} >Stoppa alla uthyrningar</button>
            <MapContainer
                id="map"
                center={[56.162856, 15.586438]} // karlskrona
                // center={[57.707445, 11.965957]} // göteborg
                zoom={14}
                style={{ height: "80%", width: "100%" }}
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
                                    <strong>Parking Location:</strong> {location.address}
                                    <br />
                                    Status: {location.status}
                                    <br />
                                    Registered: {location.registered}
                                </Popup>
                            </Marker>
                            <Circle center={[location.latitude, location.longitude]} radius={40} pathOptions={{ color: 'steelblue', fillColor: 'blue', fillOpacity: 0.1 }} />
                        </React.Fragment>
                )))}
                {bikes.map((bike, i) => (
                    <Marker
                        key={i}
                        position={[bike.current_location.latitude,bike.current_location.longitude]}
                        icon={customIcon} >
                        <Popup>
                            <strong>BikeID: {bike._id}</strong>
                            <div className="flex items-center gap-2">
                                Battery: {bike.battery}%
                                {bike.battery > 75 ?  <img className="w-8"src="/images/batteryFull.png" alt="Full Battery" /> 
                                : bike.battery > 50 ? <img className="w-8"src="/images/batteryAlmostFull.png" alt="Almost full Battery" /> 
                                : <img className="w-8"src="/images/batteryEmpty.png" alt="Almost empty" /> }
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <button className="change-pwd-btn" onClick={startSimulation} >Start ride</button>
            <button className="change-pwd-btn" onClick={moveBack} >Flytta tillbaka cyklar</button>
        </div>
    )
}
