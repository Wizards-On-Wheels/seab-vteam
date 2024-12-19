"use client";

import React from "react";
import BikeTable from "../../components/AdminBikeTable";

export default function AdminCyklar() {
  const bikeData = [
    { id: "CYK001", status: "Tillgänglig", location: "Göteborg Central", battery: 85, lastRented: "2024-12-15 10:42" },
    { id: "CYK002", status: "Underhåll", location: "Stockholm Centrum", battery: 50, lastRented: "2024-12-14 15:20" },
    { id: "CYK003", status: "Uthyrd", location: "Malmö Centrum", battery: 30, lastRented: "2024-12-16 09:10" },
    { id: "CYK004", status: "Tillgänglig", location: "Stockholm Centrum", battery: 75, lastRented: "2024-12-12 14:35" },
    { id: "CYK005", status: "Tillgänglig", location: "Lund Station", battery: 90, lastRented: "2024-12-10 08:50" },
    { id: "CYK006", status: "Underhåll", location: "Lund Station", battery: 40, lastRented: "2024-12-13 18:25" },
    { id: "CYK007", status: "Uthyrd", location: "Göteborg Central", battery: 55, lastRented: "2024-12-14 16:10" },
    { id: "CYK008", status: "Tillgänglig", location: "Helsingborg Centrum", battery: 20, lastRented: "2024-12-12 11:05" },
    { id: "CYK009", status: "Underhåll", location: "Helsingborg Centrum", battery: 60, lastRented: "2024-12-15 13:40" },
    { id: "CYK010", status: "Tillgänglig", location: "Stockholm Centrum", battery: 45, lastRented: "2024-12-11 09:15" },
    { id: "CYK011", status: "Uthyrd", location: "Helsingborg Centrum", battery: 70, lastRented: "2024-12-10 17:20" },
    { id: "CYK012", status: "Underhåll", location: "Malmö Centrum", battery: 25, lastRented: "2024-12-09 14:45" },
  ];

  return (
    <div className="grid min-h-screen grid-rows-[200px_1fr_20px] items-start justify-items-center gap-8 p-8 pt-16 sm:p-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Cykelhantering för Admin</h2>
      </div>

      {/* BikeTable */}
      <div className="w-full max-w-5xl">
        <BikeTable data={bikeData} />
      </div>

      {/* Footer */}
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
