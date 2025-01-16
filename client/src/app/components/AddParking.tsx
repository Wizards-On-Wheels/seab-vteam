"use client";

import React, { useState } from "react";

type ParkingLocation = {
  status: string;
  registered: string;
  address: string;
  longitude: number;
  latitude: number;
  charging_station: boolean;
  maintenance: boolean;
};

type City = {
  _id: string;
  city: string;
  city_registered: string;
  status: string;
  parking_locations: ParkingLocation[];
};

type AddParkingProps = {
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddParking: React.FC<AddParkingProps> = ({ cities, setCities, setShowAddForm }) => {
  const [newParking, setNewParking] = useState({
    city: "",
    address: "",
    longitude: "",
    latitude: "",
    chargingStation: "false",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewParking((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddParking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:1337/admin/createParkingLot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newParking),
      });
  
      if (!response.ok) throw new Error("Failed to add parking spot.");
      alert("Parking spot added successfully!");
      setShowAddForm(false);
      setNewParking({
        city: "",
        address: "",
        longitude: "",
        latitude: "",
        chargingStation: "false",
      });
  
      // Refresh cities after adding a parking spot
      const refreshedCities = await fetch("http://localhost:1337/admin/collections/cities/data").then((res) =>
        res.json()
      );
      setCities(refreshedCities);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message); // Now TypeScript knows that err is an instance of Error
      } else {
        alert("Error: An unknown error occurred.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      style={{ zIndex: 1000 }}
    >
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Lägg till parkering</h3>
        <form onSubmit={handleAddParking}>
          <div className="mb-4">
            <label className="block mb-1">Stad</label>
            <select
              name="city"
              value={newParking.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>Välj stad</option>
              {cities.map((city) => (
                <option key={city._id} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Adress</label>
            <input
              type="text"
              name="address"
              value={newParking.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Longitud</label>
            <input
              type="text"
              name="longitude"
              value={newParking.longitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Latitud</label>
            <input
              type="text"
              name="latitude"
              value={newParking.latitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Laddstation</label>
            <select
              name="chargingStation"
              value={newParking.chargingStation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParking;
