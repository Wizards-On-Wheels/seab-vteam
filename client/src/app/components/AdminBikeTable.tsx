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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
