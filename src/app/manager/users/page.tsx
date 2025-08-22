'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SummaryUser {
  id: number;
  name: string;
  number: number;
}

interface User {
  id: number;
  name: string;
  role: string;
}

export default function UsersPage() {
  const [summaryUsers, setSummaryUsers] = useState<SummaryUser[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users/card')
      .then(res => res.json())
      .then(setSummaryUsers)
      .catch(console.error);

    fetch('/api/users/table')
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/manager/dashboard">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
              ← Go back to the dashboard
            </button>
          </Link>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Agribridge Users Management
        </h1>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Welcome, Manager! Here you can view, add, update, or remove users from the system.
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryUsers.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-6 bg-green-50 shadow-sm flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold text-green-700">{item.name}</h3>
                <p className="text-3xl font-bold text-green-900">{item.number}</p>
              </div>
            ))}
          </div>

          {/* Add User Button */}
          <div className="text-center">
            <Link
              href="/manager/update"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
              Add User
            </Link>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="table-fixed w-full bg-white rounded shadow border border-gray-300">
              <thead>
                <tr className="bg-green-100">
                  <th className="text-left p-4">User</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-200 ${
                      index === users.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.role}</div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link href="/manager/update">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                          Update
                        </button>
                      </Link>
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
