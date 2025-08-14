'use client';

import React from 'react';


  const summaryUsers = [
    { id: 1, name: 'Total Users', number: '9' },
    { id: 2, name: 'Drivers', number: '3' },
    { id: 3, name: 'Wholesalers', number: '2' },
    { id: 4, name: 'Farmers', number: '4' },
  ];

  const users = [
    { id: 1, name: 'Jean Uwimana', role: 'Farmer' },
    { id: 2, name: 'Amina Kabera', role: 'Buyer' },
    { id: 3, name: 'Eric Dusabe', role: 'Manager' },
    { id: 4, name: 'Grace Uwase', role: 'Driver' },
    { id: 5, name: 'Pauline Mukamana', role: 'Wholesaler' },
    { id: 6, name: 'John Smith', role: 'Farmer' },
    { id: 7, name: 'Mary Jane', role: 'Buyer' },
    { id: 8, name: 'Peter John', role: 'Driver' },
    { id: 9, name: 'Alice Mukasa', role: 'Manager' },
  ];
  import Link from 'next/link';
  
export default function Userspage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
    <div className="p-8 max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto p-10 bg-white rounded-xl shadow-md">
      <Link href="/manager/dashboard">
  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
    ← Go back to the dashboard
  </button>
</Link>


      <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
        Agribridge Users Management
      </h1>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
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
        

        {/* User Management Section */}

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
                   < Link href="/manager/update">
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
    </div>
    </main>
  );
}