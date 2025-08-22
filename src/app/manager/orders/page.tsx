'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch orders from API when page loads
  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Go back button */}
        <div className="flex justify-start mb-6">
          <Link href="/manager/dashboard">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
              ← Go back to the dashboard
            </button>
          </Link>
        </div>

        {/* Top Card - Map */}
        <h2 className="text-2xl font-bold text-green-800 text-center mb-6">
          Orders on the Road (GPS)
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 w-full">
          <div className="w-full h-72 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-500">Map loading...</span>
          </div>
        </div>

        {/* Bottom Cards - Dynamic Orders */}
        <div className="flex flex-wrap gap-6 justify-between">
          {orders.map((order) => (
            <div key={order.id} className="flex-1 min-w-[300px] bg-white border p-4 rounded shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Destination:</strong> {order.destination}</p>
              <p><strong>Driver name:</strong> {order.driverName || "Unassigned"}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
