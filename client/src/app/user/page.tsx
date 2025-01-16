"use client";

import React from 'react';
import './user_webapp.css';

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
        <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
          <h1>Inloggad!</h1>
          <button onClick={handleSignOut} id="sign-out-btn">Sign out</button>
        </main>
        <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
          A project by Wizards on Wheels
        </footer>
      </div>
    </div>
  )
}
