"use client";
import { useEffect, useState, useCallback } from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import BikeMap from "../components/Map";


const links = [
  { label: "Börja Åka!", href: "/ride" },
  { label: "Våra Sparkcyklar", href: "/info" },
  { label: "Min Profil", href: "/profile" },
  { label: "Priser Och Åkpass", href: "/price" },
];


export default function Ride() {
  const [bikeData, setBikeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBikes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:1337/admin/collections/bikes/data");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
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
  }, []);

  useEffect(() => {
    fetchBikes();
  }, [fetchBikes]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <div className="">
        <HamburgerMenu links={links} />
      </div>
      <main className="p-0 z-30">
        <BikeMap bikes={bikeData} />
      </main>
    </div>
  );
}
