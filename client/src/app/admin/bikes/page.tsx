"use client";

import React, { useEffect, useState } from "react";
import BikeTable from "../../components/BikeTable";
import Link from "next/link";

export default function AdminCyklar() {
  const [bikeData, setBikeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:1337/admin/collections/bikes/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Prepare the bike data by extracting necessary fields
        const formattedData = data.map((bike: any) => {
          const { current_location } = bike;

          return {
            id: bike._id,
            registered: bike.registered,
            city: bike.city,
            current_location: current_location
              ? `${current_location.latitude}, ${current_location.longitude}`
              : "Unknown",
            status: bike.status,
            battery: bike.battery,
            parked: bike.parked ? "Yes" : "No",
            rented: bike.rented ? "Yes" : "No",
          };
        });
        setBikeData(formattedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-2 text-center">Bike Management</h2>

      {/* Back to Admin Button */}
      <div className="text-center mb-4">
        <Link href="/admin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Tillbaka
          </button>
        </Link>
      </div>

      <BikeTable data={bikeData} />
    </div>
  );
}
