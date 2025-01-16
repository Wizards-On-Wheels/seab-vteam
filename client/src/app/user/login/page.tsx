"use client";

import React, { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import './login.css';

import GoogleButton from 'react-google-button'

async function auth() {
    const response = await axios.post('http://localhost:1337/oauth/request')
        .catch((error) => {
            alert(error)
        });

    if (response) {
        window.location.href = response.data.url;
    }
}

export default function Login() {
    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // eslint-disable-next-line
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => { // parameter type correct? React.FormEvent<HTMLFormElement>
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:1337/oauth/login`, {
                email: username,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", username);
            setMessage(response.data.message);

            window.location.href = "/user";

        } catch (error) {
            alert(error)
            // if (error.response) {
            //     setMessage(error.response.data.message)
            // } else {
            //     setMessage("An unexpected error occurred. Please try again.");
            // }
        }
    };

    return (
        <div className='items-center justify-items-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
            <div className='login-div'>
                <img src="../../images/road.jpg"></img>
                <div className="login">
                    <GoogleButton
                        type="dark"
                        label="Logga in med Google"
                        onClick={() => auth()}
                    />
                    <div className="my-4">
                        <p>Eller</p>
                    </div>
                    <form onSubmit={handleSignIn} className="login-form">
                        <label htmlFor='username'></label>
                        <input
                            id="username"
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
                            type="password"
                            name="password"
                            placeholder="Lösenord"
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <input type="submit" value="LOGGA IN" />
                    </form>
                    <p>Inte medlem än? <span className="register"><Link href="/user/register">Registrera dig här</Link></span></p>
                </div>
            </div>
        </div>
    )
}
