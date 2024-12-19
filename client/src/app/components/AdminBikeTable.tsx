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
  location: string;
  battery: number;
  lastRented: string;
};

type BikeTableProps = {
  data: Bike[];
};

export default function BikeTable({ data }: BikeTableProps) {
  const [sortedData, setSortedData] = useState<Bike[]>([]);
  const [batterySortOrder, setBatterySortOrder] = useState<"asc" | "desc">("asc");
  const [locationSortOrder, setLocationSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // Sort the data by location alphabetically on initial render
    const sorted = [...data].sort((a, b) =>
      a.location.localeCompare(b.location)
    );
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
    const sorted = [...sortedData].sort((a, b) =>
      locationSortOrder === "asc"
        ? a.location.localeCompare(b.location)
        : b.location.localeCompare(a.location)
    );
    setSortedData(sorted);
    setLocationSortOrder(locationSortOrder === "asc" ? "desc" : "asc");
  };

  const getSortIndicator = (columnKey: "battery" | "location") => {
    if (columnKey === "battery") {
      return batterySortOrder === "asc" ? "▲" : "▼";
    }
    if (columnKey === "location") {
      return locationSortOrder === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const columns = [
    { key: "id", label: "CYKEL ID" },
    { key: "status", label: "STATUS" },
    { key: "location", label: "PLATS" },
    { key: "battery", label: "BATTERINIVÅ" },
    { key: "lastRented", label: "SENAST UTHYRD" },
  ];

  return (
    <div className="overflow-x-auto">
      <Table aria-label="Bike management table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              onClick={
                column.key === "battery"
                  ? handleBatterySort
                  : column.key === "location"
                  ? handleLocationSort
                  : undefined
              }
              style={{
                cursor: ["battery", "location"].includes(column.key)
                  ? "pointer"
                  : "default",
              }}
            >
              {column.label}
              {["battery", "location"].includes(column.key) && (
                <span style={{ marginLeft: "8px" }}>
                  {getSortIndicator(column.key as "battery" | "location")}
                </span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.battery}%</TableCell>
              <TableCell>{row.lastRented}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
