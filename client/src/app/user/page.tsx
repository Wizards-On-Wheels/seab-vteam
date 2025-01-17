"use client";

import React from 'react';
import Link from 'next/link';
import './user_webapp.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClockRotateLeft, faCreditCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export default function UserPage() {
  // eslint-disable-next-line
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  if (!localStorage.getItem("token")) {
    window.location.href = "/user/login"
  }

  return (
    <div className='grid min-h-screen grid-rows-[150px_1fr_20px] items-center justify-items-center gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]'>
      <h1 className='text-4xl'>Svenska Elsparkcyklar AB</h1>
      <div className='flex flex-col items-center gap-4'>
        <main className='row-start-2 flex flex-col justify-items-center items-center gap-8 sm:items-start'>
          <p>Inloggad som</p>
          <h1 className='text-4xl'> {localStorage.getItem("user")}</h1>
          <div className='flex gap-4 mt-4'>
            <Link href="/user/profile">
              <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
                <FontAwesomeIcon icon={faUser} className='text-2xl' />
                Profil
              </div>
            </Link>
            <Link href="/user/rental-history">
              <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
                <FontAwesomeIcon icon={faClockRotateLeft} className='text-2xl' />
                Uthyrningshistorik
              </div>
            </Link>
            <Link href="/user/payment">
              <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
                <FontAwesomeIcon icon={faCreditCard} className='text-2xl' />
                Betalning
              </div>
            </Link>

          </div>
          <button onClick={handleSignOut}>
            <div className='flex flex-col items-center justify-items-center gap-4 w-60 h-27 border-solid border-2 py-4'>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-2xl' />
              Logga ut
            </div>
          </button>
        </main>
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
          A project by Wizards on Wheels
        </footer>
      </div>
    </div>
  )
}
