"use client";

import { useState } from 'react'

export default function Profile() {
  const [username, setUsername] = useState("Användarnamn");

  return (
    <div className='grid min-h-screen grid-rows-[500px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-semibold'>{username}s profil</h2>
        <form className='flex flex-col items-center w-80'>
            <label htmlFor='username'></label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Användarnamn"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            <label htmlFor='firstname'></label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Förnamn"
                // value={username}
                // onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            <label htmlFor='lastname'></label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Efternamn"
                // value={username}
                // onChange={(e) => {setUsername(e.target.value)}}
                required
              />
            <label htmlFor='birthday'></label>
              <input
                id="birthday"
                type="text"
                name="birthday"
                placeholder="Födelsedatum"
                //onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            <label htmlFor='address'></label>
              <input
                id="address"
                type="text"
                name="address"
                placeholder="Gatuadress"
                //onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            <label htmlFor='zip-code'></label>
              <input
                id="zip-code"
                type="text"
                name="zip-code"
                placeholder="Postnummer"
                //onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            <label htmlFor='city'></label>
              <input
                id="city"
                type="text"
                name="city"
                placeholder="Ort"
                //onChange={(e) => {setPassword(e.target.value)}}
                required
              />
            <label htmlFor='country'></label>
              <input
                id="country"
                type="text"
                name="country"
                placeholder="Land"
                //onChange={(e) => {setPassword(e.target.value)}}
                required
              />
          <input type="submit" value="Uppdatera kontaktuppgifter" />
        </form>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
