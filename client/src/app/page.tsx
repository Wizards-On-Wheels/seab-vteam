"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';

const loginWithGitHub = () => {
    const clientID = 'Ov23liHp0pUfQ61a3M77';
    const redirectURI = 'http://localhost:3000/user/github/callback';
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`);
};

export default function Home() {
    // Used for login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Ensure localStorage is clear
        const token = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email");

        // If no token, do nothing and stay on the login page
        if (!token) return;

        // Redirect based on token and email
        if (storedEmail && storedEmail.toLowerCase() === "admin1") {
            window.location.href = "/admin";
        } else {
            window.location.href = "/user";
        }
    }, []); // Empty dependency array ensures this runs only once when component mounts

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:1337/oauth/login`, {
                email: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email);
            localStorage.setItem("user_id", response.data._id);
            setMessage(response.data.message);
            setSuccess(true);

            // Redirect based on email check
            if (email.toLowerCase() === "admin1") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/user";
            }

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: "url('/images/admin-background.jpg')" }}
        >
            <Header />
            <main className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md bg-white bg-opacity-80 p-6 rounded-lg shadow-xl">
                    <div className="relative mb-6">
                    <h2 className="text-3xl font-semibold text-[#FE846D] text-center mb-4">
                Svenska Elsparkcyklar AB
                    </h2>
                        <img src="../../images/road.jpg" alt="road image" className="w-full h-64 object-cover rounded-t-lg" />
                    </div>

                    <div className="text-center mb-6">
                    <button
                    onClick={loginWithGitHub}
                      className="flex items-center justify-center gap-3 bg-gray-800 text-white py-3 px-6 rounded-lg w-full mb-4 hover:bg-gray-700 transition-colors"
                    >
                    <img src="../../images/github.png" alt="github logo" className="w-6 h-6 rounded-full" />
                    Logga in med Github
                    </button>
                        <p className="my-4 text-gray-600">Eller</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-4">
                        <input
                            id="username"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="username"
                            placeholder="Användarnamn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            id="password"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            name="password"
                            placeholder="Lösenord"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#FE846D] text-white font-bold rounded-lg hover:bg-[#FE946D] transition-colors"
                        >
                            LOGGA IN
                        </button>
                    </form>

                    <p className="text-gray-600 mt-4">
                        Inte medlem än? <span className="text-[#FE846D] hover:underline"><Link href="/user/register">Registrera dig här</Link></span>
                    </p>
                    <p className={success ? 'text-green-600' : 'text-red-600'}>{message}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
