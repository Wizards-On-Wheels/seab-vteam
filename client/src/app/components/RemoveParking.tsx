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

type RemoveParkingProps = {
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  setShowRemoveForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const RemoveParking: React.FC<RemoveParkingProps> = ({ cities, setCities, setShowRemoveForm }) => {
  const [selectedParkingToRemove, setSelectedParkingToRemove] = useState<{
    city: string | null;
    addresses: string[];
  }>({ city: null, addresses: [] });

  const handleParkingSelection = (address: string) => {
    setSelectedParkingToRemove((prevSelected) => {
      const updatedAddresses = prevSelected.addresses.includes(address)
        ? prevSelected.addresses.filter((item) => item !== address)
        : [...prevSelected.addresses, address];

      return { ...prevSelected, addresses: updatedAddresses };
    });
  };

  const handleRemoveParking = async () => {
    try {
      const { city, addresses } = selectedParkingToRemove;
      if (city && addresses.length > 0) {
        for (const address of addresses) {
          const response = await fetch("http://localhost:1337/admin/removeParkingLot", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              city,
              address,
            }),
          });
  
          if (!response.ok) throw new Error(`Failed to remove parking at address: ${address}`);
          alert(`Parking spot at ${address} removed successfully!`);
        }
  
        const refreshedCities = await fetch("http://localhost:1337/admin/collections/cities/data").then((res) =>
          res.json()
        );
        setCities(refreshedCities);
        setShowRemoveForm(false);
        setSelectedParkingToRemove({ city: null, addresses: [] });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error: " + err.message);
      } else {
        alert("Error: An unknown error occurred.");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" style={{ zIndex: 1000 }}>
    <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Ta bort parkeringsplats</h3>
        <div className="mb-4">
        <label className="block mb-1">Välj stad</label>
        <select
            value={selectedParkingToRemove.city || ""}
            onChange={(e) => {
            const city = e.target.value;
            setSelectedParkingToRemove({ city, addresses: [] });
            }}
            className="w-full px-3 py-2 border rounded-md"
            required
        >
            <option value="" disabled>
            Select a city
            </option>
            {cities.map((city) => (
            <option key={city._id} value={city.city}>
                {city.city}
            </option>
            ))}
        </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Välj parkering</label>
          <ul>
            {cities
              .filter((city) => city.city === selectedParkingToRemove.city)
              .flatMap((city) =>
                city.parking_locations.map((location) => (
                  <li key={location.address} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedParkingToRemove.addresses.includes(location.address)}
                      onChange={() => handleParkingSelection(location.address)}
                      className="mr-2"
                    />
                    {location.address}
                  </li>
                ))
              )}
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowRemoveForm(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleRemoveParking}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveParking;
