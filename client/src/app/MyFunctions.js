import React, { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export function tokenExpired() {
    if (localStorage.getItem("oauth") === "true") return;

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    };

    const signOut = async (email) => {
        await axios.post(`http://localhost:1337/oauth/logout`, {
            email: email
        });

        localStorage.clear();
        window.location.href = "/";
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (isTokenExpired(token)) {
                signOut(localStorage.getItem("email"));
            }
        } else {
            window.location.href = "/";
        }
    }, []);
}
