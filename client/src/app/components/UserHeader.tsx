"use client";

import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import '../user/user.css';

export default function UserHeader() {
    const email = localStorage.getItem("email");

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

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

    return (
        <div className="user-header" >
            <Link href="/">
                <h1>SEAB.</h1>
            </Link>
            <div className="right-div" >
                <Link href="/user" ><h2><FontAwesomeIcon icon={faUser} className='text-2xl' /> {email}</h2></Link>
                <button onClick={handleSignOut}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-2xl' /><br/>
                    Logga ut
                </button>
            </div>
        </div>
    )
}
