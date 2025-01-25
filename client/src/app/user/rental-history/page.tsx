"use client";

import Footer from '../../components/Footer';
import Header from '../../components/Header';
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

    const columns = [
        {
            key: "bike",
            label: "CYKEL",
        },
        {
            key: "start",
            label: "START",
        },
        {
            key: "stop",
            label: "SLUT",
        },
        {
            key: "datetime",
            label: "STARTTID",
        },
        {
            key: "duration",
            label: "VARAKTIGHET",
        },
        {
            key: "price",
            label: "PRIS",
        },
    ];

    return (
        <div className="testdiv">
            <Header />
            <main>
            <h2 className='text-2xl font-semibold'>Uthyrningshistorik för {localStorage.getItem("email")}</h2>
            <Table aria-label="Example table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>100000</TableCell>
                        <TableCell>xxx</TableCell>
                        <TableCell>yyy</TableCell>
                        <TableCell>2024-12-11 08:54</TableCell>
                        <TableCell>15 min</TableCell>
                        <TableCell>35 kr</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>100001</TableCell>
                        <TableCell>xxx</TableCell>
                        <TableCell>yyy</TableCell>
                        <TableCell>2024-12-13 11:13</TableCell>
                        <TableCell>17 min</TableCell>
                        <TableCell>40 kr</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </main>
            <Footer />
        </div>
    )
}
