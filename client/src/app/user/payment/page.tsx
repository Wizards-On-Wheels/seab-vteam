"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Footer from '../../components/Footer';
import UserHeader from '../../components/UserHeader';
import { tokenExpired } from '../../MyFunctions.js';

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

import '../user.css';

export default function Payment() {
    const user_id = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    const [balance, setBalance] = useState(0);
    const [debt, setDebt] = useState(0);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");

    const columns = [
        {
            key: "description",
            label: "TYP",
        },
        {
            key: "sek",
            label: "SEK"
        },
        {
            key: "action",
            label: "ÅTGÄRD"
        }
    ];

    tokenExpired();

    const getUserDetails = async () => {
        const response = await axios.get(`http://localhost:1337/user/details/${user_id}`);
        console.log(response.data.result)

        setBalance(response.data.result.prepaid_balance);
        setDebt(response.data.result.monthly_debt);
    }

    const handlePrepaid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:1337/user/update/prepaid`, {
                email: email,
                amount: amount
            });

            alert(response.data.message);

            window.location.reload();
        } catch (error) {
            setMessage(error.response.data.error);
            console.log(error);
        }
    }

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:1337/user/${email}/pay/prepaid`);

            alert(response.data.message);

            window.location.reload();
        } catch (error) {
            setMessage(error.response.data.error);
            console.log(error);
        }
    }

    const handleStartMonthlyPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:1337/user/${email}/pay/bill`);

            console.log(response.data.message);

            window.location.reload();
        } catch (error) {
            setMessage(error.response.data.error);
            console.log(error);
        }
    }

    useEffect(() => {
        getUserDetails();

    }, []);

    return (
        <div>
            <UserHeader />
            <main>
                <h2 className='text-2xl font-semibold'>Betalning</h2>
                <div className="btns-div">
                    <Link href="/user/payment/transaction-log">
                        <button className="blue-btn">Se transaktionslogg</button>
                    </Link>
                    <Link href="/user/payment/payment-history">
                        <button className="blue-btn">Se betalda fakturor</button>
                    </Link>
                    <button className="blue-btn" onClick={handleStartMonthlyPayment} >Starta abonnemang</button>
                </div>

                <Table aria-label="Example table" className="w-[40vw]">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            key={1}
                            className="row"
                        >
                            <TableCell>Saldo</TableCell>
                            <TableCell>{balance}</TableCell>
                            <TableCell>
                                <form onSubmit={handlePrepaid} className="payment-form">
                                    <input type="submit" value="Fyll på" className="payment-btn" />
                                    <input
                                        id="amount"
                                        className='input-text-field'
                                        type="number"
                                        name="amount"
                                        defaultValue="0"
                                        onChange={(e) => {setAmount(e.target.value)}}
                                    />
                                </form>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            key={2}
                            className="row"
                        >
                            <TableCell>Skuld</TableCell>
                            <TableCell>{debt}</TableCell>
                            <TableCell>
                                <button className="payment-btn" onClick={handlePayment} >Betala faktura</button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <p className='error-message' >{message}</p>

                {/* <form onSubmit={handlePayment} className="change-password-form" >
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
                </form> */}
            </main>
            <Footer />
        </div>
    )
}
