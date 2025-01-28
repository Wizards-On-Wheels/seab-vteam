"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Footer from '../../components/Footer';
import UserHeader from '../../components/UserHeader';
import { tokenExpired } from '../../MyFunctions.js';

import '../user.css';

export default function Profile() {
    const email = localStorage.getItem("email");
    const oauth = localStorage.getItem("oauth");

    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [message, setMessage] = useState("");

    const [success, setSuccess] = useState(false);

    tokenExpired();

    // This function is used when updating username
    // const getUserDetails = async () => {
    //     const details = await axios.get(`http://localhost:1337/user/details/${email}`);
    // }

    // useEffect(() => {
    //     console.log(email)
    //     getUserDetails();
    // }, []);

    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password === repeatedPassword) {
            try {
                const response = await axios.put(`http://localhost:1337/user/update/password`, {
                    email: email,
                    password: password
                });

                setPassword("");
                setRepeatedPassword("");
                setSuccess(true);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.error);
            }

        } else {
            setMessage("Passwords don't match");
        }
    }

    return (
        <div>
            <UserHeader />
            <main>
                {localStorage.getItem("oauth") === "true" &&
                    <p>Sidan är inaktiv eftersom du är inloggad med Github</p>
                }
                {localStorage.getItem("oauth") !== "true" &&
                    <>
                        <h2 className='text-2xl font-semibold'>Uppdatera lösenord</h2>
                        <form onSubmit={handleChangePassword} className="change-password-form" >
                            <label htmlFor='username'></label>
                            <input
                                id="username"
                                className='input-text-field'
                                type="text"
                                name="username"
                                readOnly
                                defaultValue={email}
                            />
                            <label htmlFor='password'></label>
                            <input
                                id="password"
                                className='input-text-field'
                                type="password"
                                name="password"
                                placeholder="Nytt lösenord (minst 8 tecken)"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                            <label htmlFor='repeat-password'></label>
                            <input
                                id="repeat-password"
                                className='input-text-field'
                                type="password"
                                name="repeat-password"
                                placeholder="Upprepa lösenord"
                                value={repeatedPassword}
                                onChange={(e) => { setRepeatedPassword(e.target.value) }}
                                required
                            />
                            <input type="submit" value="Ändra lösenord" className="change-pwd-btn" />
                        </form>
                        <p className={success ? 'success-message' : 'error-message'} >{message}</p>
                    </>
                }
            </main>
            <Footer />
        </div>
    )
}
