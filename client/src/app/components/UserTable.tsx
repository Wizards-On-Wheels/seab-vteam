"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

type User = {
  _id: string;
  name: string;
  email: string;
  prepaid_balance: number;
};

type UserTableProps = {
  data: User[];
};

export default function UserTable({ data }: UserTableProps) {
  const [sortedData, setSortedData] = useState<User[]>([]);
  const [nameSortOrder, setNameSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const sorted = [...data].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedData(sorted);
  }, [data]);

  const handleNameSort = () => {
    const sorted = [...sortedData].sort((a, b) =>
      nameSortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setSortedData(sorted);
    setNameSortOrder(nameSortOrder === "asc" ? "desc" : "asc");
  };

  const getSortIndicator = () => (nameSortOrder === "asc" ? "▲" : "▼");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData = sortedData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const columns = [
    { key: "_id", label: "ANVÄNDAR ID" },
    { key: "name", label: "NAMN" },
    { key: "email", label: "E-POST" },
    { key: "prepaid_balance", label: "FÖRBETALT SALDO" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Sök efter namn..."
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded p-2 w-full"
        />
      </div>
      <Table aria-label="User management table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              onClick={column.key === "name" ? handleNameSort : undefined}
              style={{
                cursor: column.key === "name" ? "pointer" : "default",
              }}
            >
              {column.label}
              {column.key === "name" && (
                <span style={{ marginLeft: "8px" }}>{getSortIndicator()}</span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {filteredData.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.prepaid_balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
