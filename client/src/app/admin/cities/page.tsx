"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddParking from "../../components/AddParking";
import RemoveParking from "../../components/RemoveParking";
import CityTable from "../../components/CityTable";
import AddSpeedZone from "../../components/AddSpeedZone";
import RemoveSpeedZone from "../../components/RemoveSpeedZone";

type City = {
  _id: string;
  city: string;
  city_registered: string;
  status: string;
  parking_locations: any[];
  speed_zones?: any[];
};

type Bike = {
  _id: string;
  registered: string;
  city: string;
  current_location: { longitude: number; latitude: number };
  parked: boolean;
  battery: number;
  status: string;
};

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddSpeedZoneForm, setShowAddSpeedZoneForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [showRemoveSpeedZoneForm, setShowRemoveSpeedZoneForm] = useState(false);

  // Fetch Cities and Bikes
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

    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:1337/admin/collections/bikes/data");
        if (!response.ok) throw new Error("Failed to fetch bikes.");
        const data: Bike[] = await response.json();
        setBikes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCities();
    fetchBikes();
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
        <button
          onClick={() => setShowAddSpeedZoneForm(true)}
          className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Lägg till hastighetszon
        </button>
        <button
          onClick={() => setShowRemoveSpeedZoneForm(true)}
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          Ta bort hastighetszon
        </button>
      </div>

      {/* Add Parking Spot Form Modal */}
      {showAddForm && (
        <AddParking cities={cities} setCities={setCities} setShowAddForm={setShowAddForm} />
      )}

      {/* Add Speed Zone Form Modal */}
      {showAddSpeedZoneForm && (
        <AddSpeedZone
          cities={cities}
          setCities={setCities}
          setShowAddForm={setShowAddSpeedZoneForm} // Reusing setShowAddSpeedZoneForm
        />
      )}

      {/* Remove Parking Spot Form Modal */}
      {showRemoveForm && (
        <RemoveParking cities={cities} setCities={setCities} setShowRemoveForm={setShowRemoveForm} />
      )}

      {/* Remove Speed Zone Form Modal */}
      {showRemoveSpeedZoneForm && (
        <RemoveSpeedZone
          cities={cities}
          setCities={setCities}
          setShowRemoveForm={setShowRemoveSpeedZoneForm} // Reusing setShowRemoveSpeedZoneForm
        />
      )}

      {/* City Table */}
      <div className="overflow-x-auto">
        <CityTable
          cities={cities}
          bikes={bikes} // Pass bikes to CityTable
          expandedCityId={expandedCityId}
          onToggleCityExpand={toggleCityExpand}
        />
      </div>
    </div>
  );
}
