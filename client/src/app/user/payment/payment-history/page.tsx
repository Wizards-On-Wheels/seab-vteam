"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import UserHeader from '../../../components/UserHeader';
import { tokenExpired } from '../../../MyFunctions.js';

import '../../user.css';

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

export default function PaymentHistory() {
    const email = localStorage.getItem("email");

    const [paymentHistory, setPaymentHistory] = useState([]);

    tokenExpired();

    const columns = [
        {
            key: "current_debt",
            label: "SKULD",
        },
        {
            key: "monthly_debt",
            label: "MÅNADSSKULD",
        },
        {
            key: "monthly_paid",
            label: "BETALT DEN HÄR MÅNADEN",
        },
        {
            key: "balance_before",
            label: "SALDO FÖRE",
        },
        {
            key: "balance_after",
            label: "SALDO EFTER",
        },
        {
            key: "date",
            label: "DATUM",
        },
        {
            key: "transaction_type",
            label: "TRANSAKTIONSMETOD",
        },
        {
            key: "notes",
            label: "NOTERING",
        },
    ];

    const getPaymentHistory = () => {
        fetch(`http://localhost:1337/user/details/${email}`)
        .then(res => res.json())
        .then(json => setPaymentHistory(json.result.payment_history))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getPaymentHistory();

    }, []);

    return (
        <div>
            <UserHeader />
            <main>
            <h2 className='text-2xl font-semibold'>Betalningshistorik</h2>
            <Link href="/user/payment">
                <button className="blue-btn">Gå tillbaka</button>
            </Link>
            <Table aria-label="Example table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    {paymentHistory.map((data, i) => (
                        <TableRow
                            key={i}
                            className="row"
                        >
                            <TableCell>{data.current_debt}</TableCell>
                            <TableCell>{data.monthly_debt}</TableCell>
                            <TableCell>{data.monthly_debt_paid}</TableCell>
                            <TableCell>{data.prepaid_balance_before}</TableCell>
                            <TableCell>{data.prepaid_balance_after}</TableCell>
                            <TableCell>{data.timestamp}</TableCell>
                            <TableCell>{data.transaction_type}</TableCell>
                            <TableCell>{data.notes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </main>
            <Footer />
        </div>
    )
}
