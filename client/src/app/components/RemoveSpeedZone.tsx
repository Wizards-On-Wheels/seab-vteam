"use client";

import React, { useState } from "react";

type SpeedZone = {
  address: string;
  city: string;
  longitude: number;
  latitude: number;
  speed_limit: number;
};

type City = {
  _id: string;
  city: string;
  city_registered: string;
  status: string;
  speed_zones: SpeedZone[];
};

type RemoveSpeedZoneProps = {
    cities: City[];
    setCities: React.Dispatch<React.SetStateAction<City[]>>;
    setShowRemoveForm: React.Dispatch<React.SetStateAction<boolean>>;
  };
  

const RemoveSpeedZone: React.FC<RemoveSpeedZoneProps> = ({
  cities,
  setCities,
  setShowRemoveForm,
}) => {
  const [selectedZoneToRemove, setSelectedZoneToRemove] = useState<{
    city: string | null;
    addresses: string[];
  }>({ city: null, addresses: [] });

  const handleZoneSelection = (address: string) => {
    setSelectedZoneToRemove((prevSelected) => {
      const updatedAddresses = prevSelected.addresses.includes(address)
        ? prevSelected.addresses.filter((item) => item !== address)
        : [...prevSelected.addresses, address];

      return { ...prevSelected, addresses: updatedAddresses };
    });
  };

  const handleRemoveSpeedZone = async () => {
    try {
      const { city, addresses } = selectedZoneToRemove;
      if (city && addresses.length > 0) {
        for (const address of addresses) {
          const response = await fetch("http://localhost:1337/admin/removeSpeedZone", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              city,
              address,
            }),
          });

          if (!response.ok) throw new Error(`Failed to remove speed zone at address: ${address}`);
          alert(`Speed zone at ${address} removed successfully!`);
        }

        const refreshedCities = await fetch("http://localhost:1337/admin/collections/cities/data").then((res) =>
          res.json()
        );
        setCities(refreshedCities);
        setShowRemoveForm(false);
        setSelectedZoneToRemove({ city: null, addresses: [] });
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
        <h3 className="text-xl font-semibold mb-4">Ta bort hastighetszon</h3>
        <div className="mb-4">
          <label className="block mb-1">Välj stad</label>
          <select
            value={selectedZoneToRemove.city || ""}
            onChange={(e) => {
              const city = e.target.value;
              setSelectedZoneToRemove({ city, addresses: [] });
            }}
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
          <label className="block mb-1">Välj hastighetszon</label>
          <ul>
            {cities
              .filter((city) => city.city === selectedZoneToRemove.city)
              .flatMap((city) =>
                city.speed_zones.map((zone) => (
                  <li key={zone.address} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedZoneToRemove.addresses.includes(zone.address)}
                      onChange={() => handleZoneSelection(zone.address)}
                      className="mr-2"
                    />
                    {zone.address}
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
            onClick={handleRemoveSpeedZone}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSpeedZone;
