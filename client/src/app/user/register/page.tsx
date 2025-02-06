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
        <div>
            <Header />
            <main>
                <div className='login-div'>
                    <img src="../../images/road.jpg"></img>
                    <div className="login">
                        <div className="my-4">
                            <h2 className='text-2xl font-semibold'>Skapa konto</h2>
                        </div>
                        <form onSubmit={handleRegister} className="login-form">
                            <label htmlFor='username'></label>
                            <input
                                id="username"
                                className="input-text-field"
                                type="text"
                                name="username"
                                placeholder="Användarnamn"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}
                                required
                            />
                            <label htmlFor='password'></label>
                            <input
                                id="password"
                                className="input-text-field"
                                type="password"
                                name="password"
                                placeholder="Lösenord (minst 8 tecken)"
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                            <label htmlFor='repeat-password'></label>
                            <input
                                id="repeat-password"
                                className="input-text-field"
                                type="password"
                                name="repeat-password"
                                placeholder="Upprepa lösenord"
                                value={repeatedPassword}
                                onChange={(e) => {setRepeatedPassword(e.target.value)}}
                                required
                            />
                            <input type="submit" value="REGISTRERA" />
                        </form>
                        <p>Redan medlem? <span className="register"><Link href="/">Logga in här</Link></span></p>
                        <p className={success ? 'success-message' : 'error-message'} >{message}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
