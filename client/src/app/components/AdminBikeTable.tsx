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
  status: string;
  city: string;
  current_location: string;
  battery: number;
  parked: string;
  rented: string;
  registered: string;
};

type BikeTableProps = {
  data: Bike[];
};

export default function BikeTable({ data }: BikeTableProps) {
  const [sortedData, setSortedData] = useState<Bike[]>([]);
  const [batterySortOrder, setBatterySortOrder] = useState<"asc" | "desc">("asc");
  const [locationSortOrder, setLocationSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const sorted = [...data].sort((a, b) => a.city.localeCompare(b.city));
    setSortedData(sorted);
  }, [data]);

  const handleBatterySort = () => {
    const sorted = [...sortedData].sort((a, b) =>
      batterySortOrder === "asc" ? a.battery - b.battery : b.battery - a.battery
    );
    setSortedData(sorted);
    setBatterySortOrder(batterySortOrder === "asc" ? "desc" : "asc");
  };

  const handleLocationSort = () => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a.city && b.city) {
        return locationSortOrder === "asc"
          ? a.city.localeCompare(b.city)
          : b.city.localeCompare(a.city);
      }
      return 0; // Handle undefined city gracefully
    });
    setSortedData(sorted);
    setLocationSortOrder(locationSortOrder === "asc" ? "desc" : "asc");
  };

  const getSortIndicator = (columnKey: "battery" | "city") => {
    if (columnKey === "battery") {
      return batterySortOrder === "asc" ? "▲" : "▼";
    }
    if (columnKey === "city") {
      return locationSortOrder === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter bikes by ID based on search query
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
  ];

  const noWrapStyle = {
    whiteSpace: "nowrap", // Prevent text from wrapping
    overflow: "hidden",   // Hide overflowing text
    textOverflow: "ellipsis", // Display ellipsis (...) for overflowed text
  };

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
      <Table aria-label="Bike management table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              onClick={
                column.key === "battery"
                  ? handleBatterySort
                  : column.key === "city"
                  ? handleLocationSort
                  : undefined
              }
              style={{
                cursor: ["battery", "city"].includes(column.key)
                  ? "pointer"
                  : "default",
              }}
            >
              {column.label}
              {["battery", "city"].includes(column.key) && (
                <span style={{ marginLeft: "8px" }}>
                  {getSortIndicator(column.key as "battery" | "city")}
                </span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {filteredData.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell style={noWrapStyle}>{bike.id}</TableCell>
              <TableCell style={noWrapStyle}>{bike.registered}</TableCell>
              <TableCell style={noWrapStyle}>{bike.city}</TableCell>
              <TableCell style={noWrapStyle}>{bike.current_location}</TableCell>
              <TableCell style={noWrapStyle}>{bike.status}</TableCell>
              <TableCell style={noWrapStyle}>{bike.battery}%</TableCell>
              <TableCell style={noWrapStyle}>{bike.parked}</TableCell>
              <TableCell style={noWrapStyle}>{bike.rented}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
