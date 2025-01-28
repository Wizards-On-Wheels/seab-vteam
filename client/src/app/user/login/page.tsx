"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './login.css';

const loginWithGitHub = () => {
    const clientID = 'Ov23liHp0pUfQ61a3M77';
    const redirectURI = 'http://localhost:3000/user/github/callback';
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`);
};

export default function Login() {
    // Used for login form
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    // eslint-disable-next-line
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

            window.location.href = "/user";

        } catch (error) {
            setMessage(error.response.data.message)
        }
    };

    if (localStorage.getItem("token")) {
        window.location.href = "/user";
    }

    return (
        <div>
            <Header />
            <main>
                <div className='login-div'>
                    <img src="../../images/road.jpg" alt="road image" ></img>
                    <div className="login">
                        <button onClick={loginWithGitHub} className="github_button" >
                            <img src="../../images/github.png" alt="github logo" />
                            Logga in med Github
                        </button>
                        <div className="my-4">
                            <p>Eller</p>
                        </div>
                        <form onSubmit={handleSignIn} className="login-form">
                            <label htmlFor='username'></label>
                            <input
                                id="username"
                                className="input-text-field"
                                type="text"
                                name="username"
                                placeholder="Användarnamn"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                            <label htmlFor='password'></label>
                            <input
                                id="password"
                                className="input-text-field"
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
            </main>
            <Footer />
        </div>
    )
}
