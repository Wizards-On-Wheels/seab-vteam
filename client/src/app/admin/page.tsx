"use client"

// Home component (page.tsx)
import React, { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

export default function Home() {
  // Function to check if the token has expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  // Sign out function
  const signOut = async (email) => {
    try {
      await axios.post(`http://localhost:1337/oauth/logout`, { email });
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // useEffect to handle token expiration
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      signOut(localStorage.getItem("email"));
    } else if (!token) {
      window.location.href = "/";
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    const email = localStorage.getItem("email");
    if (email) {
      signOut(email); // Call signOut directly for manual logout
    }
  };

  return (
    <div
      className="grid min-h-screen grid-rows-[auto_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20"
      style={{
        backgroundImage: "url('/images/admin-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl text-white">Svenska Elsparkcyklar AB</h1>
        <h2 className="text-2xl font-semibold text-white">Admin</h2>

        {/* Home Button */}
        <Link href="/">
          <div className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-yellow-500 py-4 hover:bg-yellow-300 text-white transition-all rounded-lg">
            <span className="text-3xl">🏠</span>
            Hem
          </div>
        </Link>

        {/* Other Buttons */}
        <div className="flex gap-4 mt-4">
          <Link href="/admin/bikes">
            <div className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-blue-500 py-4 hover:bg-blue-300 text-white transition-all rounded-lg">
              <span className="text-2xl">🚲</span>
              Cyklar
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-green-500 py-4 hover:bg-green-300 text-white transition-all rounded-lg">
              <span className="text-2xl">👤</span>
              Användare
            </div>
          </Link>
          <Link href="/admin/cities">
            <div className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-purple-500 py-4 hover:bg-purple-300 text-white transition-all rounded-lg">
              <span className="text-2xl">🏙️</span>
              Städer
            </div>
          </Link>
        </div>

        {/* Map Button */}
        <Link href="mobileapp/ride">
          <div className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-red-500 py-4 hover:bg-red-300 text-white transition-all rounded-lg">
            <span className="text-3xl">🗺️</span>
            Map
          </div>
        </Link>

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-4 w-60 h-27 bg-gray-500 py-4 hover:bg-gray-300 text-white transition-all rounded-lg cursor-pointer"
        >
          <span className="text-2xl">🚪</span>
          Logout
        </div>
      </div>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start"></main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 text-white">
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
