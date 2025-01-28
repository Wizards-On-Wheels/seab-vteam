import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useMap } from 'react-leaflet/hooks';
import axios from 'axios';

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import '../user/user.css';

export default function RouteGenerator() {
    // const position = [57.707155, 11.966877];
    const [position, setPosition] = useState([57.704493, 11.918312])
    const api_key="5b3ce3597851110001cf624867c121a4001444dcbafd925164cfb40e";
    const [startPosition, setStartPosition] = useState("");
    const [stopPosition, setStopPosition] = useState("");
    const [coordinates, setCoordinates] = useState({});
    const longitudes = [];
    const latitudes = [];

    const [generate, setGenerate] = useState(false);

    let startAndStop = [];

    // useEffect(() => {
    //     // getDirections();
    //     console.log(startAndStop)

    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        for (let i=0; i<coordinates.length; i++) {
            coordinates[i].reverse();
            longitudes.push(coordinates[i][0]);
            latitudes.push(coordinates[i][1]);
        }

        if (generate) {
            console.log(coordinates)

            addJsonRoute(coordinates);
        }

        // eslint-disable-next-line
    }, [coordinates]);

    const addJsonRoute = async (data) => {
        try {
            const response = axios.post("http://localhost:1337/test/addjson", {
                data: data
            });

            console.log(response)

        } catch (error) {
            console.log(error);
        }
        setGenerate(false);
        return;
    }

    const getDirections = async (start: String, stop: String) => {
        let request = new XMLHttpRequest();

        request.open('GET', `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${start}&end=${stop}`);

        request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                const responseText = this.responseText;
                const json = JSON.parse(responseText);
                const coords = json.features[0].geometry.coordinates;
                // console.log(coords);
                setGenerate(true);
                setCoordinates(({
                    coordinates: coords
                }));
            }
        };

        request.send();
    }

    const MyComponent = () => {
        const map = useMap(); // behövs den här?
        const mapEvent = useMapEvents({
            click: (e) => {
                startAndStop.push(e.latlng);
                console.log(startAndStop)
                if (startAndStop.length === 2) {
                    const startString = `${startAndStop[0].lng},${startAndStop[0].lat}`;
                    const stopString = `${startAndStop[1].lng},${startAndStop[1].lat}`;
                    getDirections(startString, stopString);
                    //console.log(startAndStop[0])
                }
                // const { lat, lng } = e.latlng;
                // setStopPosition(`${lng.toString()},${lat.toString()}`);
                // startRide();
                // startRide((e.latlng.lng).toFixed(4).toString(), (e.latlng.lat).toFixed(4).toString());
                // L.marker([lat, lng], { profileIcon }).addTo(map);
            }
        });

        return null
    }


    const animation = async () => {
        let i = 0;
        setInterval(() => {
            if (i === latitudes.length) {
                console.log("stop")
                return;
            }
            setPosition([latitudes[i], longitudes[i]]);
            i++;
        }, 500);
    }

    return (
        <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
            <MapContainer
                id="map" // Assign an ID to the map container for DOM manipulation
                center={[57.707155, 11.966877]}
                zoom={14}
                style={{ height: "100%", width: "90%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyComponent />
            </MapContainer>
        </div>
    )
}
