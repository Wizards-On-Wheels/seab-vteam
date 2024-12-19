"use client";
import { useState } from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import Map from "../components/Map";


const links = [
  { label: "Börja Åka!", href: "/" },
  { label: "Våra Sparkcyklar", href: "/info" },
  { label: "Min Profil", href: "/profile" },
  { label: "Priser Och Åkpass", href: "/price" },
];


export default function Info() {
  

  return (
    <div className="">
      <div className="">
      <HamburgerMenu links={links} />
      </div>
      <main className="">
      <Map />
        
      </main>
    </div>
  );
}
