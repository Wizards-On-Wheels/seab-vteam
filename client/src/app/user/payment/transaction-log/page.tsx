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

export default function TransactionLog() {
    const email = localStorage.getItem("email");

    const [transactions, setTransactions] = useState([]);

    tokenExpired();

    const columns = [
        {
            key: "amount",
            label: "SUMMA",
        },
        {
            key: "note",
            label: "NOTERING",
        },
        {
            key: "timestamp",
            label: "TIDSSTÄMPEL",
        },
        {
            key: "transaction_type",
            label: "TRANSAKTIONSTYP",
        },
    ];

    const getTransactions = () => {
        fetch(`http://localhost:1337/user/details/${email}`)
        .then(res => res.json())
        .then(json => setTransactions(json.result.transaction_log))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getTransactions();

    }, []);

    return (
        <div>
            <UserHeader />
            <main>
            <h2 className='text-2xl font-semibold'>Transaktionslogg</h2>
            <Link href="/user/payment">
                <button className="blue-btn">Gå tillbaka</button>
            </Link>
            <Table aria-label="Example table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    {transactions.map((data, i) => (
                        <TableRow
                            key={i}
                            className="row"
                        >
                            <TableCell>{data.amount_increased}</TableCell>
                            <TableCell>{data.notes}</TableCell>
                            <TableCell>{data.timestamp}</TableCell>
                            <TableCell>{data.transaction_type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </main>
            <Footer />
        </div>
    )
}
