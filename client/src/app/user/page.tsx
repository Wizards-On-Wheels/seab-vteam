"use client";

import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';

import './user.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faCreditCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function UserPage() {
    const token = localStorage.getItem("token");

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("oauth");
        localStorage.removeItem("token");

        window.location.reload();
    };

    if (!token) {
        return (
            window.location.href = "/user/login"
        )
    }

    return (
        <div>
            <Header />
            <main>
                <p>Inloggad som</p>
                <h1 className='text-4xl'> {localStorage.getItem("email")}</h1>
                {/* <div className='flex gap-4 mt-4'> */}
                {/* <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'> */}
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
