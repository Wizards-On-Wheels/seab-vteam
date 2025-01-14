"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddParking from "../../components/AddParking";
import RemoveParking from "../../components/RemoveParking";
import CityTable from "../../components/CityTable";

type City = {
  _id: string;
  city: string;
  city_registered: string;
  status: string;
  parking_locations: any[];
};

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:1337/admin/collections/cities/data");
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

      {/* Buttons Section */}
      <div className="text-center mb-4 flex justify-center gap-4">
        <Link href="/admin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Tillbaka
          </button>
        </Link>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Lägg till parkering
        </button>
        <button
          onClick={() => setShowRemoveForm(true)}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Ta bort parkering
        </button>
      </div>

      {/* Add Parking Spot Form Modal */}
      {showAddForm && <AddParking cities={cities} setCities={setCities} setShowAddForm={setShowAddForm} />}

      {/* Remove Parking Spot Form Modal */}
      {showRemoveForm && <RemoveParking cities={cities} setCities={setCities} setShowRemoveForm={setShowRemoveForm} />}

      {/* City Table */}
      <div className="overflow-x-auto">
        <CityTable
          cities={cities}
          expandedCityId={expandedCityId}
          onToggleCityExpand={toggleCityExpand}
        />
      </div>
    </div>
  );
}
