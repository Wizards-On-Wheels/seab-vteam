"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link';
import axios from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import '../user.css';

export default function Profile() {
    const email = localStorage.getItem("email");
    const oauth = localStorage.getItem("oauth");

    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [message, setMessage] = useState("");

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
            <Header />
            <main>
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
                <p className="error-message" >{message}</p>
            </main>
            <Footer />
        </div>
    )
}
