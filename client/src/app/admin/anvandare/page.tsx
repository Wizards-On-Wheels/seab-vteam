"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function AdminAnvandare() {
  const columns = [
    {
      key: "id",
      label: "ANVÄNDAR ID",
    },
    {
      key: "name",
      label: "NAMN",
    },
    {
      key: "email",
      label: "E-POST",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "created",
      label: "SKAPAD",
    },
  ];

  return (
    <div className='grid min-h-screen grid-rows-[200px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      {/* Page Header */}
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-semibold'>Användarhantering för Admin</h2>

        {/* Table for displaying user details */}
        <Table aria-label="User management table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>USR001</TableCell>
              <TableCell>Anna Svensson</TableCell>
              <TableCell>anna.svensson@example.com</TableCell>
              <TableCell>Aktiv</TableCell>
              <TableCell>2024-01-15</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>USR002</TableCell>
              <TableCell>Erik Johansson</TableCell>
              <TableCell>erik.johansson@example.com</TableCell>
              <TableCell>Avstängd</TableCell>
              <TableCell>2024-02-10</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>USR003</TableCell>
              <TableCell>Karin Karlsson</TableCell>
              <TableCell>karin.karlsson@example.com</TableCell>
              <TableCell>Aktiv</TableCell>
              <TableCell>2024-03-05</TableCell>
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
