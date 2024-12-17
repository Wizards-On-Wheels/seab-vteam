"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function AdminCyklar() {
  const columns = [
    {
      key: "id",
      label: "CYKEL ID",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "location",
      label: "PLATS",
    },
    {
      key: "battery",
      label: "BATTERINIVÅ",
    },
    {
      key: "lastRented",
      label: "SENAST UTHYRD",
    },
  ];

  return (
    <div className='grid min-h-screen grid-rows-[200px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      {/* Page Header */}
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-semibold'>Cykelhantering för Admin</h2>

        {/* Table for displaying bike details */}
        <Table aria-label="Bike management table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>CYK001</TableCell>
              <TableCell>Tillgänglig</TableCell>
              <TableCell>Göteborg Central</TableCell>
              <TableCell>85%</TableCell>
              <TableCell>2024-12-15 10:42</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>CYK002</TableCell>
              <TableCell>Underhåll</TableCell>
              <TableCell>Stockholm Station</TableCell>
              <TableCell>50%</TableCell>
              <TableCell>2024-12-14 15:20</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>CYK003</TableCell>
              <TableCell>Uthyrd</TableCell>
              <TableCell>Malmö Centrum</TableCell>
              <TableCell>30%</TableCell>
              <TableCell>2024-12-16 09:10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Main Content */}
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>

      {/* Footer */}
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
