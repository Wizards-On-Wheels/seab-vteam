import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export function tokenExpired() {
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

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                window.location.href = "/user/login";
            }
        } else {
            window.location.href = "/user/login";
        }
    }, []);
}
