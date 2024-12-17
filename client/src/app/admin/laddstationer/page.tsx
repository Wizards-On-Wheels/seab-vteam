"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function AdminLaddstationer() {
  const columns = [
    {
      key: "id",
      label: "STATION ID",
    },
    {
      key: "location",
      label: "PLATS",
    },
    {
      key: "totalSlots",
      label: "TOTALA PLATSER",
    },
    {
      key: "availableSlots",
      label: "LEDIGA PLATSER",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <div className='grid min-h-screen grid-rows-[200px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      {/* Page Header */}
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-semibold'>Laddstationhantering för Admin</h2>

        {/* Table for displaying charging station details */}
        <Table aria-label="Charging station management table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>STN001</TableCell>
              <TableCell>Stockholm Central</TableCell>
              <TableCell>20</TableCell>
              <TableCell>5</TableCell>
              <TableCell>Aktiv</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>STN002</TableCell>
              <TableCell>Göteborg Centrum</TableCell>
              <TableCell>15</TableCell>
              <TableCell>2</TableCell>
              <TableCell>Underhåll</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>STN003</TableCell>
              <TableCell>Malmö Station</TableCell>
              <TableCell>25</TableCell>
              <TableCell>10</TableCell>
              <TableCell>Aktiv</TableCell>
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
