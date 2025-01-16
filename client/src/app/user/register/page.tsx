"use client";

import React, { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';

import '../login/login.css';

export default function Register() {
    // Used for login form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    // Message when login fails
    const [message, setMessage] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === repeatedPassword) {
            try {
                const response = await axios.post(`http://localhost:1337/user/register`, {
                    email: username,
                    password: password
                });

                alert(response.data.message);
            } catch (error) {
                alert(error); // fix this
                // if (error.response) {
                //     setMessage(error.response.data.message)
                // }
            }

        } else {
            setMessage("Passwords don't match");
        }
    }

    return (
        <div className='items-center justify-items-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
            <div className='login-div'>
                <img src="../../images/road.jpg"></img>
                <div className="login">
                    <div className="my-4">
                        <h2>Skapa konto</h2>
                    </div>
                    <form onSubmit={handleRegister} className="login-form">
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
                            placeholder="Lösenord (minst 8 tecken)"
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                        <label htmlFor='repeat-password'></label>
                        <input
                            id="repeat-password"
                            type="password"
                            name="repeat-password"
                            placeholder="Upprepa lösenord"
                            value={repeatedPassword}
                            onChange={(e) => {setRepeatedPassword(e.target.value)}}
                            required
                        />
                        <input type="submit" value="REGISTRERA" />
                    </form>
                    <p>Redan medlem? <span className="register"><Link href="/user/login">Logga in här</Link></span></p>
                </div>
            </div>
        </div>
    )
}
