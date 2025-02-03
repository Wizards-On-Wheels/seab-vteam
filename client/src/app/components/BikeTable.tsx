import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

type Bike = {
  id: string;
  registered: string;
  city: string;
  current_location: string;
  status: string;
  battery: number;
  parked: string;
  rented: string;
  disabled: boolean;
};

type BikeTableProps = {
  data: Bike[];
};

export default function BikeTable({ data }: BikeTableProps) {
  const [sortedData, setSortedData] = useState<Bike[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMoveBikeModalOpen, setMoveBikeModalOpen] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string | null>(null);
  const [chargingStations, setChargingStations] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Hämta laddstationer och städer
  useEffect(() => {
    const fetchChargingStations = async () => {
      try {
        const response = await fetch("http://localhost:1337/admin/collections/cities/data");
        if (!response.ok) {
          throw new Error("Failed to fetch cities data");
        }
        const cities = await response.json();
        setChargingStations(cities);
      } catch (error) {
        console.error("Error fetching charging stations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChargingStations();
  }, []);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => a.city.localeCompare(b.city));
    setSortedData(sorted);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDisableBike = async (bikeId: string) => {
    try {
      const response = await fetch(
        `http://localhost:1337/admin/bike/${bikeId}/disable`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSortedData((prevData) =>
        prevData.map((bike) =>
          bike.id === bikeId ? { ...bike, disabled: true } : bike
        )
      );

      alert(`Bike ${bikeId} has been disabled.`);
    } catch (error) {
      console.error("Error disabling bike:", error);
      alert("Failed to disable the bike. Please try again.");
    }
  };

  const handleEnableBike = async (bikeId: string) => {
    try {
      const response = await fetch(
        `http://localhost:1337/admin/bike/${bikeId}/enable`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSortedData((prevData) =>
        prevData.map((bike) =>
          bike.id === bikeId ? { ...bike, disabled: false } : bike
        )
      );

      alert(`Bike ${bikeId} has been enabled.`);
    } catch (error) {
      console.error("Error enabling bike:", error);
      alert("Failed to enable the bike. Please try again.");
    }
  };

  const handleMoveBikeClick = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    setMoveBikeModalOpen(true);
  };

  const handleCloseModal = () => {
    setMoveBikeModalOpen(false);
    setSelectedBikeId(null);
    setSelectedCity(null);
    setSelectedStation(null);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    setSelectedStation(null); // Reset station when city is changed
  };

  const handleBikeMoved = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `http://localhost:1337/bike/${selectedBikeId}/position/${longitude}/${latitude}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSortedData((prevData) =>
        prevData.map((bike) =>
          bike.id === selectedBikeId
            ? { ...bike, current_location: `${latitude}, ${longitude}` }
            : bike
        )
      );

      alert(`Bike ${selectedBikeId} has been moved.`);
    } catch (error) {
      console.error("Error moving bike:", error);
      alert("Failed to move the bike. Please try again.");
    }
  };

  const filteredData = sortedData.filter((bike) =>
    bike.id.toLowerCase().includes(searchQuery)
  );

  const columns = [
    { key: "id", label: "CYKEL ID" },
    { key: "registered", label: "REGISTERAD" },
    { key: "city", label: "STAD" },
    { key: "current_location", label: "PLATS" },
    { key: "status", label: "STATUS" },
    { key: "battery", label: "BATTERI" },
    { key: "parked", label: "PARKERAD" },
    { key: "rented", label: "UTHYRD" },
    { key: "actions", label: "ÅTGÄRDER" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Sök efter cykel ID..."
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded p-2 w-full"
        />
      </div>
      <Table aria-label="Bike management table" className="w-full">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {filteredData.map((bike) => (
            <TableRow
              key={bike.id}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              <TableCell>{bike.id}</TableCell>
              <TableCell>{bike.registered}</TableCell>
              <TableCell>{bike.city}</TableCell>
              <TableCell>{bike.current_location}</TableCell>
              <TableCell>{bike.status}</TableCell>
              <TableCell>{bike.battery}%</TableCell>
              <TableCell>{bike.parked}</TableCell>
              <TableCell>{bike.rented}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 flex-wrap">
                  {bike.disabled ? (
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleEnableBike(bike.id)}
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDisableBike(bike.id)}
                    >
                      Disable
                    </button>
                  )}
                  <button
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleMoveBikeClick(bike.id)}
                  >
                    Move
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isMoveBikeModalOpen && selectedBikeId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Flytta cykel</h3>
            {loading ? (
              <p>Laddar laddstationer...</p>
            ) : (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block mb-1">Välj stad:</label>
                  <select
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Välj en stad</option>
                    {chargingStations.map((city, index) => (
                      <option key={index} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCity && (
                  <div className="mb-4">
                    <label className="block mb-1">Välj en laddstation:</label>
                    <select
                      onChange={(e) => {
                        const cityData = chargingStations.find(
                          (city) => city.city === selectedCity
                        );
                        const station = cityData?.parking_locations.find(
                          (spot) => spot.address === e.target.value
                        );
                        setSelectedStation(station || null);
                      }}
                      value={selectedStation ? selectedStation.address : ""}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Välj en laddstation</option>
                      {chargingStations
                        .find((city) => city.city === selectedCity)
                        ?.parking_locations.filter(
                          (spot) => spot.charging_station === true
                        )
                        .map((station, index) => (
                          <option key={index} value={station.address}>
                            {station.address}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  >
                    Stäng
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedStation) {
                        handleBikeMoved(selectedStation.latitude, selectedStation.longitude);
                        handleCloseModal();
                      } else {
                        alert("Vänligen välj en laddstation innan du flyttar cykeln.");
                      }
                    }}
                    disabled={!selectedStation}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Flytta cykel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
