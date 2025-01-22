"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

export default function RentalHistory() {
  const columns = [
    {
      key: "bike",
      label: "CYKEL",
    },
    {
      key: "start",
      label: "START",
    },
    {
      key: "stop",
      label: "SLUT",
    },
    {
      key: "datetime",
      label: "STARTTID",
    },
    {
      key: "duration",
      label: "VARAKTIGHET",
    },
    {
      key: "price",
      label: "PRIS",
    },
  ];

  return (
    <div className='grid min-h-screen grid-rows-[200px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='flex flex-col items-center gap-4'>
        <h2 className='text-2xl font-semibold'>Uthyrningshistorik för --användarnamn--</h2>
        <Table aria-label="Example table">
          <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>100000</TableCell>
              <TableCell>xxx</TableCell>
              <TableCell>yyy</TableCell>
              <TableCell>2024-12-11 08:54</TableCell>
              <TableCell>15 min</TableCell>
              <TableCell>35 kr</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>100001</TableCell>
              <TableCell>xxx</TableCell>
              <TableCell>yyy</TableCell>
              <TableCell>2024-12-13 11:13</TableCell>
              <TableCell>17 min</TableCell>
              <TableCell>40 kr</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
      </main>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        A project by Wizards on Wheels
      </footer>
    </div>
  )
}
