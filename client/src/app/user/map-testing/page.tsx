"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import MapTest from "../../components/MapTest";
import MapTestOld from "../../components/MapTestOld";

import '../user.css';

export default function MapTesting() {
    const [bikes, setBikes] = useState([]);

    const getBikes = async () => {
        fetch(`http://localhost:1337/admin/collections/bikes/data`)
        .then(res => res.json())
        .then(json => setBikes(json))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getBikes();
    }, []);

    // function MyComponent() {
    //     const map = useMap();
    //     const mapEvent = useMapEvents({
    //         click: (e) => {
    //             const { lat, lng } = e.latlng;
    //             console.log(e.latlng)
    //             L.marker([lat, lng], { profileIcon }).addTo(map);
    //         }
    //     });
    //     return null
    // }

    // return (
    //     <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
    //         <MapContainer
    //             id="map" // Assign an ID to the map container for DOM manipulation
    //             center={[56.162856, 15.586438]}
    //             zoom={14}
    //             style={{ height: "90%", width: "90%" }}
    //             scrollWheelZoom={true}
    //         >
    //         <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />
    //             <MyComponent />
    //         </MapContainer>
    //     </div>
    // )

    return (
        <>
            {/* <MapTestOld /> */}
            <MapTest />
        </>
    )
}
