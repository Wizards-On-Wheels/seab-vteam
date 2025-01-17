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

const loginWithGitHub = () => {
    const clientID = 'Ov23liHp0pUfQ61a3M77';
    const redirectURI = 'http://localhost:3000/user/github/callback';
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`);
};

export default function Login() {
    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // eslint-disable-next-line
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setMessage(error.response.data.message)
        }
    };

    return (
        <div className='items-center justify-items-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
            <Link href="/" >
                <h1 className='text-3xl'>Svenska Elsparkcyklar AB</h1>
            </Link>
            <div className='login-div'>
                <img src="../../images/road.jpg" alt="road image" ></img>
                <div className="login">
                    <button onClick={loginWithGitHub} className="github_button" >
                        <img src="../../images/github.png" alt="github logo" />
                        Logga in med Github
                    </button>
                    {/* <GoogleButton
                        type="dark"
                        label="Logga in med Google"
                        onClick={() => auth()}
                    /> */}
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
                    <p>Inte medlem än? <span className="register"><Link href="/user/register" >Registrera dig här</Link></span></p>
                    <p className="error-message" >{message}</p>
                </div>
            </div>
        </div>
    )
}
