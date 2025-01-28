"use client";

import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../components/Footer';
import UserHeader from '../components/UserHeader';
import { tokenExpired } from '../MyFunctions.js';

import './user.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faCreditCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function UserPage() {
    tokenExpired();

    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (localStorage.getItem("oauth") === "true") {
            localStorage.clear();
            window.location.reload();
        }

        try {
            await axios.post(`http://localhost:1337/oauth/logout`, {
                email: email
            });

            localStorage.clear();
        } catch (error) {
            console.log(error);
        }

        window.location.reload();
    };

    if (!token) {
        return (
            window.location.href = "/user/login"
        )
    }

    return (
        <div>
            <UserHeader />
            <main>
                <h2 className='text-2xl font-semibold'>Mina sidor</h2>
                <div className="user-div" >
                    <Link href="/user/profile">
                    <div className='user-small-div'>
                        <FontAwesomeIcon icon={faUser} className='text-2xl' />
                        Hantera konto
                    </div>
                    </Link>
                    <Link href="/user/rental-history">
                    <div className="user-small-div">
                        <FontAwesomeIcon icon={faClockRotateLeft} className='text-2xl' />
                        Uthyrningshistorik
                    </div>
                    </Link>
                    <Link href="/user/payment">
                    <div className="user-small-div">
                        <FontAwesomeIcon icon={faCreditCard} className='text-2xl' />
                        Betalning
                    </div>
                    </Link>
                    <button onClick={handleSignOut}>
                        <div className="user-small-div">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-2xl' />
                        Logga ut
                        </div>
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    )
}
