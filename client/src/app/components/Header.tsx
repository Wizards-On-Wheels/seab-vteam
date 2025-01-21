"use client";

import React from 'react';
import Link from 'next/link';

import '../header.css';

export default function Header() {
    return (
        <div className="header" >
            <Link href="/">
                <h1>Svenska Elsparkcyklar AB</h1>
            </Link>
        </div>
    )
}
