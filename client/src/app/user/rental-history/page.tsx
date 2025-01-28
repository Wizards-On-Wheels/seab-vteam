"use client";

import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import UserHeader from '../../components/UserHeader';
import { tokenExpired } from '../../MyFunctions.js';
import '../user.css';

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

export default function RentalHistory() {
    tokenExpired();

    const user_id = localStorage.getItem("user_id");

    const [rentals, setRentals] = useState([]);

    const columns = [
        {
            key: "bike",
            label: "CYKEL-ID",
        },
        {
            key: "start",
            label: "START",
        },
        {
            key: "stop",
            label: "STOPP",
        },
        {
            key: "started",
            label: "STARTTID",
        },
        {
            key: "finished",
            label: "SLUTTID",
        },
        {
            key: "price",
            label: "PRIS",
        },
    ];

    const getRentals = () => {
        fetch(`http://localhost:1337/user/details/${user_id}`)
        .then(res => res.json())
        .then(json => setRentals(json.result.ride_log))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getRentals();
        // eslint-disable-next-line
    }, []);


    return (
        <div className="testdiv">
            <UserHeader />
            <main>
            <h2 className='text-2xl font-semibold'>Uthyrningshistorik</h2>
            <Table aria-label="Example table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    {rentals.map((data, i) => (
                        <TableRow
                            key={i}
                            className="row"
                        >
                            <TableCell>{data.bike_id}</TableCell>
                            <TableCell>{data.location.start.latitude},{data.location.start.longitude}</TableCell>
                            <TableCell>{data.location.stop.latitude},{data.location.stop.longitude}</TableCell>
                            <TableCell>{data.time.start}</TableCell>
                            <TableCell>{data.time.stop}</TableCell>
                            <TableCell>{data.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </main>
            <Footer />
        </div>
    )
}
