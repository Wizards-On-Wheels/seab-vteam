"use client";

import React, { useEffect, useState } from "react";
import CityTable from "../../components/CityTable";
import Link from "next/link";

// Define types for City and ParkingLocation
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

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/admin/collections/cities/data"
        );
        if (!response.ok) throw new Error("Failed to fetch cities.");
        const data: City[] = await response.json();
        setCities(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const toggleCityExpand = (cityId: string) => {
    setExpandedCityId((prevId) => (prevId === cityId ? null : cityId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">City Management</h2>

      {/* Back to Admin Button */}
      <div className="text-center mb-4">
        <Link href="/admin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Back
          </button>
        </Link>
      </div>

      <CityTable
        cities={cities}
        expandedCityId={expandedCityId}
        toggleCityExpand={toggleCityExpand}
      />
    </div>
  );
}
