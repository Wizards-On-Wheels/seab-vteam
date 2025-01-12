"use client";

import { useEffect, useState } from "react";
import UserTable from "../../components/UserTable";
import Link from "next/link";

type User = {
  _id: string;
  name: string;
  email: string;
  prepaid_balance: number;
};

export default function AdminAnvandare() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASEURL = "http://localhost:1337";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASEURL}/admin/collections/users/data`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredData: User[] = data.filter(
          (user: any) => user.email && user.prepaid_balance !== undefined
        );
        setUsers(filteredData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center gap-6 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      {/* Title */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Användarhantering för Admin</h2>
      </div>

      {/* Back to Admin Button */}
      <div className="text-center mb-4">
        <Link href="/admin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Back
          </button>
        </Link>
      </div>

      {/* UserTable Wrapper */}
      <div className="w-full max-w-5xl mt-4">
        <UserTable data={users} />
      </div>

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center justify-center gap-6">
        A project by Wizards on Wheels
      </footer>
    </div>
  );
}
