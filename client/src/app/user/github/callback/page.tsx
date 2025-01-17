"use client";

import { useEffect, useState } from 'react';

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
            localStorage.setItem("user", data.name);
        })
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('code');
        // localStorage.removeItem("token");
        // localStorage.removeItem("user");

        if (codeParam && (localStorage.getItem("token") === null)) {
            async function getAccessToken() {
                await fetch(`http://localhost:1337/oauth/getAccessToken?code=${codeParam}`, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then(async (data) => {
                    if (data.access_token) {
                        localStorage.setItem("token", data.access_token);
                        await getUserData();
                        setRerender(!rerender);
                        window.location.assign("/user");
                    }
                });
            }
            getAccessToken();
        }
    }, []);

    return <div>Processing GitHub login...</div>;
}
