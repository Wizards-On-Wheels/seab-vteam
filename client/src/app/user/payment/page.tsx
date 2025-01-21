"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import '../user.css';

export default function Payment() {
    const handlePayment = async () => {

    }

    return (
        <div>
            <Header />
            <main>
                <p>Saldo: {0}</p>
                <p>Fyll på med ett engångsbelopp</p>
                <form onSubmit={handlePayment} className="change-password-form" >
                    <label htmlFor='username'></label>
                    <input
                        id="username"
                        className='input-username-password'
                        type="number"
                        name="username"
                        defaultValue="0"
                    />
                    <input type="submit" value="Slutför" disabled />
                </form>
                <div className="my-4">
                    <p>Eller</p>
                </div>
                <button className="monthly-btn">Starta månadsabonnemang</button>
            </main>
            <Footer />
        </div>
    )
}
