"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import MapTest from "../../components/MapTest";

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

    return (
        <>
            <h1>Hello</h1>
            <MapTest />
            {/* <MapTest bikes={bikes} /> */}
        </>
    )
}
