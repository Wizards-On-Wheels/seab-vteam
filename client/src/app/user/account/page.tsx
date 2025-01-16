"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faCreditCard } from '@fortawesome/free-solid-svg-icons';

export default function UserAccount() {
  const [token, setToken] = useState("");

  // kontroll om tokens finns, i så fall visas profilen
  // om det inte finns token så skickas man tillbaka till login-sidan
  // if admin, href "/admin"

  if (!token) {
    window.location.href = "/user-webapp"
  }

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
        <h2 className='text-2xl font-semibold'>Konto för --användarnamn--</h2>
        <div className='flex gap-4 mt-4'>
          User account
        </div>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <div className='flex gap-4 mt-4'>
          <Link href="/user-webapp/profile">
            <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
              <FontAwesomeIcon icon={faUser} className='text-2xl' />
              Profil
            </div>
          </Link>
          <Link href="/user-webapp/rental-history">
            <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
              <FontAwesomeIcon icon={faClockRotateLeft} className='text-2xl' />
              Uthyrningshistorik
            </div>
          </Link>
          <Link href="/user-webapp/payment">
            <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
              <FontAwesomeIcon icon={faCreditCard} className='text-2xl' />
              Betalning
            </div>
          </Link>
        </div>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
