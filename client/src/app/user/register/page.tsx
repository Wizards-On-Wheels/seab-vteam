"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import '../../login.css';

export default function Register() {
    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === repeatedPassword) {
            try {
                const response = await axios.post(`http://localhost:1337/user/register`, {
                    email: username,
                    password: password
                });

                setSuccess(true);
                setPassword("");
                setRepeatedPassword("");
                setMessage(response.data.message);

                // alert(response.data.message);
            } catch (error) {
                setMessage(error.response.data.error);
            }

        } else {
            setMessage("Passwords don't match");
        }
    }

    if (localStorage.getItem("token")) {
        window.location.href = "/user";
    }

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
                            Skapa konto
                        </h2>
                        <img src="../../images/road.jpg" alt="road image" className="w-full h-64 object-cover rounded-t-lg" />
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            id="username"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            name="username"
                            placeholder="Användarnamn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            id="password"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            name="password"
                            placeholder="Lösenord (minst 8 tecken)"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            id="repeat-password"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            name="repeat-password"
                            placeholder="Upprepa lösenord"
                            value={repeatedPassword}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#FE846D] text-white font-bold rounded-lg hover:bg-[#FE846D] transition-colors"
                        >
                            REGISTRERA
                        </button>
                    </form>

                    <p className="text-gray-600 mt-4">
                        Redan medlem? <span className="text-[#FE846D] hover:underline"><Link href="/">Logga in här</Link></span>
                    </p>
                    <p className={success ? 'text-green-600' : 'text-red-600'}>{message}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
