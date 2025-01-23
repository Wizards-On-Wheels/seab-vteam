"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GitHubCallback() {
    const [rerender, setRerender] = useState(false);

    async function getUserData() {
        await fetch("http://localhost:1337/oauth/getUserData", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            localStorage.setItem("user", data.name),
            localStorage.setItem("email", data.login)
        })
    }

    // Add user to database when logging in for the first time
    async function addToDatabaseFirstLogin() {
        try {
            await axios.get(`http://localhost:1337/user/details/${localStorage.getItem("email")}`);

            return;
        } catch (error) {
            try {
                await axios.post(`http://localhost:1337/user/register`, {
                    email: localStorage.getItem("email"),
                    password: "random_password"
                });
                await axios.put(`http://localhost:1337/user/update/name`, {
                    email: localStorage.getItem("email"),
                    name: localStorage.getItem("user")
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function getAccessToken(param: String) {
        await fetch(`http://localhost:1337/oauth/getAccessToken?code=${param}`, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then(async (data) => {
            if (data.access_token) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("oauth", "true");
                await getUserData();
                await addToDatabaseFirstLogin();
                setRerender(!rerender);
                window.location.assign("/user");
            }
        });
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("email");

        if (codeParam && (localStorage.getItem("token") === null)) {
            getAccessToken(codeParam);
        }
        // eslint-disable-next-line
    }, []);

    return <div>Processing GitHub login...</div>;
}
