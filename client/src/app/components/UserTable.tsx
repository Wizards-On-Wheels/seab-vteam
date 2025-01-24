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
  monthly_debt: number;
};

type UserTableProps = {
  userData: User[];
};

export default function UserTable({ userData }: UserTableProps) {
  const [sortedData, setSortedData] = useState<User[]>([]);
  const [nameSortOrder, setNameSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [tempBalances, setTempBalances] = useState<Record<string, number>>({});

  useEffect(() => {
    const sorted = [...userData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedData(sorted);
    const initialBalances = userData.reduce(
      (acc, user) => ({ ...acc, [user._id]: 0 }), // Initialize temp balances to 0
      {}
    );
    setTempBalances(initialBalances);
  }, [userData]);

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

  const handleUpdateBalance = async (userId: string, email: string) => {
    const amount = tempBalances[userId];
    try {
      const response = await fetch("http://localhost:1337/user/update/prepaid", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, amount }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Add the amount to the current balance in the local state
      setSortedData((prevData) =>
        prevData.map((user) =>
          user._id === userId
            ? { ...user, prepaid_balance: user.prepaid_balance + amount }
            : user
        )
      );

      alert("Balance updated successfully!");
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Failed to update balance. Please try again.");
    }
  };

  const filteredData = sortedData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  const columns = [
    { key: "_id", label: "ANVÄNDAR ID" },
    { key: "name", label: "NAMN" },
    { key: "email", label: "E-POST" },
    { key: "prepaid_balance", label: "FÖRBETALT SALDO" },
    { key: "monthly_debt", label: "SKULD"},
    { key: "actions", label: "ÅTGÄRDER" },
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
              <TableCell>{user.monthly_debt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Lägg till saldo.."
                    className="border rounded p-1"
                    value={tempBalances[user._id] || ""}
                    onChange={(e) =>
                      setTempBalances((prev) => ({
                        ...prev,
                        [user._id]: Number(e.target.value),
                      }))
                    }
                  />
                  <button
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleUpdateBalance(user._id, user.email)}
                  >
                    Lägg till
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
