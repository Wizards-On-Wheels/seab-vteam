"use client";

import React, { useState } from "react";

type AddSpeedZoneProps = {
  cities: any[]; // Define the City type more specifically if possible
  setCities: React.Dispatch<React.SetStateAction<any[]>>;
  setShowAddForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSpeedZone: React.FC<AddSpeedZoneProps> = ({
  cities,
  setCities,
  setShowAddForm,
}) => {
  const [newSpeedZone, setNewSpeedZone] = useState({
    city: "",
    address: "",
    longitude: "",
    latitude: "",
    speedLimit: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSpeedZone((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpeedZone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        city: newSpeedZone.city,
        address: newSpeedZone.address,
        longitude: parseFloat(newSpeedZone.longitude),
        latitude: parseFloat(newSpeedZone.latitude),
        speedLimit: parseInt(newSpeedZone.speedLimit, 10),
      };

      console.log("Payload being sent:", JSON.stringify(payload, null, 2)); // Debug log

      const response = await fetch(
        "http://localhost:1337/admin/createSpeedZone",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed to add speed zone.");
      alert("Speed zone added successfully!");
      setShowAddForm(false);
      setNewSpeedZone({
        city: "",
        address: "",
        longitude: "",
        latitude: "",
        speedLimit: "",
      });

      // Refresh cities after adding a speed zone
      const refreshedCities = await fetch(
        "http://localhost:1337/admin/collections/cities/data"
      ).then((res) => res.json());
      setCities(refreshedCities);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
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
        <h3 className="text-xl font-semibold mb-4">Lägg till hastighetszon</h3>
        <form onSubmit={handleAddSpeedZone}>
          <div className="mb-4">
            <label className="block mb-1">
              Stad 
              {/* <span className="text-red-500">*</span> */}
            </label>
            <select
              name="city"
              value={newSpeedZone.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Välj stad
              </option>
              {cities.map((city) => (
                <option key={city._id} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">

              Adress 
              {/* <span className="text-red-500">*</span> */}
            </label>
            <input
              type="text"
              name="address"
              value={newSpeedZone.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Longitud 
              {/* <span className="text-red-500">*</span> */}
            </label>
            <input
              type="text"
              name="longitude"
              value={newSpeedZone.longitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Latitud 
              {/* <span className="text-red-500">*</span> */}
            </label>
            <input
              type="text"
              name="latitude"
              value={newSpeedZone.latitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Hastighetsbegränsning (km/h) 
              {/* <span className="text-red-500">*</span> */}
            </label>
            <input
              type="number"
              name="speedLimit"
              value={newSpeedZone.speedLimit}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
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

export default AddSpeedZone;
