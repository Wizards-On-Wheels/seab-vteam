import React, { useEffect } from 'react';
import axios from 'axios';

import '../user/user.css';

export default function RouteGenerator() {
    const api_key="5b3ce3597851110001cf624867c121a4001444dcbafd925164cfb40e";

    const cityLocations = {
        "Stockholm": [
            { latitude: 59.3293, longitude: 18.0686 },//Central Station
            { latitude: 59.3328, longitude: 18.0649 },//Gamla Stan
            { latitude: 59.3428, longitude: 18.0493 },//Odenplan
        ],
        "Göteborg": [
            { latitude: 57.7089, longitude: 11.9746 },//Central Station
            { latitude: 57.7072, longitude: 11.9668 },//Avenyn
            { latitude: 57.7058, longitude: 11.9646 },//Haga
        ],
        "Karlskrona": [
            { latitude: 56.1612, longitude: 15.5869 },//Naval Museum
            { latitude: 56.1608, longitude: 15.5895 },//Stortorget
            { latitude: 56.1624, longitude: 15.5827 },//Campus Gräsvik
        ]
    };

    const addJsonRoute = async (data) => {
        for (let i=0; i<data.length; i++) {
            data[i].reverse();
        }

        try {
            await axios.post("http://localhost:1337/simulation/addjson", {
                data: data
            });

        } catch (error) {
            console.log(error);
        }
        return;
    }

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    useEffect(() => {
        const makeRequests = async () => {
            for (let i = 0; i < 6; i++) {
                //const randomIndex = Math.floor(Math.random() * cityLocations.Göteborg.length);
                const startLocation = cityLocations.Stockholm[2];

                const randomLatitudeOffset = (Math.random() - 0.5) * 0.01;
                const randomLongitudeOffset = (Math.random() - 0.5) * 0.01;
            
                const newLatitude = startLocation.latitude + randomLatitudeOffset;
                const newLongitude = startLocation.longitude + randomLongitudeOffset;
            
                const start = `${startLocation.longitude},${startLocation.latitude}`;
                const stop = `${newLongitude.toFixed(4)},${newLatitude.toFixed(4)}`;
            
                try {
                    await delay(1500);
                    await getDirections(start, stop);
                } catch (error) {
                    console.error("Error in request:", error);
                }
            }
            window.location.reload();
        };

        makeRequests();
    }, []);

    const getDirections = async (start: String, stop: String) => {
        let request = new XMLHttpRequest();

        request.open('GET', `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${api_key}&start=${start}&end=${stop}`);

        request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                const responseText = this.responseText;
                const json = JSON.parse(responseText);
                const coords = json.features[0].geometry.coordinates;
                console.log(coords)
                if (coords) {
                    addJsonRoute(coords);
                }

            }
        };

        request.send();
    }

    return (
        <div className="w-full h-[100vh] rounded-lg overflow-hidden shadow-md z-30 fixed">
        </div>
    )
}
