"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Footer from '../../components/Footer';
import UserHeader from '../../components/UserHeader';
import { tokenExpired } from '../../MyFunctions.js';

import '../user.css';

export default function Payment() {
    const user_id = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);

    tokenExpired();

    const getUserDetails = async () => {
        // const details = await axios.get(`http://localhost:1337/user/details/${user_id}`);
        const details = await axios.get(`http://localhost:1337/user/details/${user_id}`);
        console.log(details);

        setBalance(details.data.result.prepaid_balance);
    }

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const payment = await axios.put(`http://localhost:1337/user/update/prepaid`, {
                email: email,
                amount: amount
            });

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserDetails();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <UserHeader />
            <main>
                <h2 className='text-2xl font-semibold'>Betalning</h2>
                <p>Saldo: {balance}</p>
                <Link href="/user/payment/transaction-log">
                    <button className="blue-btn">Se betalningshistorik</button>
                </Link>
                <p>Fyll på med ett engångsbelopp</p>
                <form onSubmit={handlePayment} className="change-password-form" >
                    <label htmlFor='username'></label>
                    <input
                        id="amount"
                        className='input-text-field'
                        type="number"
                        name="amount"
                        defaultValue="0"
                        onChange={(e) => {setAmount(e.target.value)}}
                    />
                    <input type="submit" value="Slutför" className="change-pwd-btn" />
                    <div className="my-4">
                        <p>Eller</p>
                    </div>
                    <button className="change-pwd-btn" disabled >Starta månadsabonnemang</button>
                </form>
            </main>
            <Footer />
        </div>
    )
}
