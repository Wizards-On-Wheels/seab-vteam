"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import MapTest from "../../components/MapTest";

import '../user.css';

const profileIcon = new L.Icon({
    iconUrl: "/images/Profile.svg",
    iconSize: [25, 25],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
});

export default function MapTesting() {
    return (
        <>
            <h1>Hello</h1>
            <MapTest />
        </>
    )
    // // const position = [57.707155, 11.966877];
    // const [position, setPosition] = useState([57.704493, 11.918312])
    // const api_key="5b3ce3597851110001cf624867c121a4001444dcbafd925164cfb40e";
    // const start = "11.918312,57.704493";
    // const end = "11.951383,57.720229";
    // const [coordinates, setCoordintes] = useState([]);
    // const longitudes = [];
    // const latitudes = [];

    // const [countdown, setCountdown] = useState(0);

    // useEffect(() => {
    //     getDirections();

    //     // eslint-disable-next-line
    // }, []);

    // useEffect(() => {
    //     for (let i=0; i<coordinates.length; i++) {
    //         console.log(`${coordinates[i][1]},${coordinates[i][0]}`)
    //         longitudes.push(coordinates[i][0]);
    //         latitudes.push(coordinates[i][1]);
    //     }

    //     // eslint-disable-next-line
    // }, [coordinates]);

    // const getDirections = async () => {
    //     let request = new XMLHttpRequest();

    //     request.open('GET', `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${start}&end=${end}`);

    //     request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

    //     request.onreadystatechange = function () {
    //         if (this.readyState === 4) {
    //             const responseText = this.responseText;
    //             const json = JSON.parse(responseText);
    //             const coords = json.features[0].geometry.coordinates;
    //             setCoordintes(coords);
    //         }
    //     };

    //     request.send();
    // }

    // const animation = async () => {
    //     let i = 0;
    //     setInterval(() => {
    //         if (i === latitudes.length) {
    //             return;
    //         }
    //         setPosition([latitudes[i], longitudes[i]]);
    //         i++;
    //     }, 70);
    // }

    // return (
    //     <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
    //         <p>Test-karta</p>
    //         {/* {coordinates ? <div>{JSON.stringify(coordinates)}</div> : <div>Loading...</div>} */}
    //         <button className="change-pwd-btn" onClick={animation} >Start ride</button>
    //         <MapContainer
    //             id="map" // Assign an ID to the map container for DOM manipulation
    //             center={[57.707155, 11.966877]}
    //             zoom={14}
    //             style={{ height: "90%", width: "90%" }}
    //             scrollWheelZoom={true}
    //         >
    //             <TileLayer
    //                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             />
    //             <Marker position={position} icon={profileIcon}>
    //                 <Popup>
    //                 A pretty CSS3 popup. <br /> Easily customizable.
    //                 </Popup>
    //             </Marker>
    //         </MapContainer>
    //     </div>
    // )
}
