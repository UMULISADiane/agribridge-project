'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,

  XIcon,
  BarcodeIcon,
} from 'lucide-react';
import Barcode from 'react-barcode';

export default function ManagerDashboard() {
  const pathname = usePathname();
  const [showManualAssign, setShowManualAssign] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');

  const handleBarcodeClick = (orderID: string) => {
    setCurrentOrder(orderID);
    setShowBarcode(true);
  };

  const stats = [
    { label: 'Total Users', value: 120, description: '↑ 4 new this month' },
    { label: 'Total Farmers', value: 45, description: '↑ 72% of fleet' },
    { label: 'Total Orders', value: 300, description: '– 28% of fleet' },
    { label: 'Payments Made', value: 155, description: '☆ 4.8+ rating' },
  ];

  const orders = [
    { id: '#ORD-5782', route: 'Seattle, WA → Portland, OR', eta: 'Today, 2:30 PM', priority: 'Priority' },
    { id: '#ORD-5781', route: 'San Francisco, CA → San Jose, CA', eta: 'Today, 4:15 PM', priority: 'Standard' },
    { id: '#ORD-5780', route: 'Miami, FL → Orlando, FL', eta: 'Today, 6:00 PM', priority: 'Standard' },
  ];

  const drivers = [
    { name: 'Michael Chen', status: 'Available' },
    { name: 'Sarah Johnson', status: 'Available' },
    { name: 'David Wilson', status: 'On Break' },
  ];

  const performanceDrivers = [
    { name: 'Emily Rodriguez', id: 'DRV-0042', city: 'San Francisco', completed: '96%', onTime: '92%', rating: '4.9' },
    { name: 'Michael Chen', id: 'DRV-0038', city: 'Seattle', completed: '94%', onTime: '89%', rating: '4.8' },
    { name: 'Mugisha Eddy', id: 'DRV-0050', city: 'Portland', completed: '91%', onTime: '85%', rating: '4.7' },
  ];

  const Footer = () => (
    <footer className="w-full bg-indigo-900 text-white py-12 px-4 font-inter rounded-t-3xl mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">
        © 2026 Fleet Management System. All rights reserved.
        </p>
        <p className="font-bold text-green-700">
          Our mission is to optimize fleet operations and improve driver efficiency.
          </p>
      </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">


      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64  bg-indigo-900 shadow-md border-r border-gray-200">
          <div className="p-6 text-xl font-bold text-green-700">Manager</div>
          <nav className="mt-6 space-y-1">
            <Link href="/manager/dashboard" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">
              Dashboard
            </Link>
            <Link href="/manager/users" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">
             Users
            </Link>
            <Link href="/manager/orders" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">
              Orders
            </Link>
            <Link href="/manager/payment-history" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">
             Payments
            </Link>
            <Link href="/manager/analytics" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">
             Analytics
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
       <main className="flex-1 p-8 overflow-y-auto bg-white">

         

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow border">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Driver Assignment & Pending Orders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow border">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg font-semibold">Driver Assignment</h2>

                  <button className= "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Today</button>
                  <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Auto Assign</button>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      onClick={() => setShowManualAssign(true)}
                    >
                      Manual Assign
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Available Drivers */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Available Drivers</h4>
                    <ul className="space-y-3">
                      {drivers.map((d) => (
                        <li key={d.name} className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                          <UserIcon className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-semibold">{d.name}</p>
                            <p className={`text-sm ${d.status === 'Available' ? 'text-green-500' : 'text-yellow-500'}`}>
                              {d.status}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pending Orders */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-700 mb-2">Pending Orders</h4>
                    <ul className="space-y-3">
                      {orders.map((order) => (
                        <li key={order.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleBarcodeClick(order.id)}>
                              <BarcodeIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
                            </button>
                            <div>
                              <p className="font-bold">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.route}</p>
                              <p className="text-xs text-gray-500">ETA: {order.eta}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.priority === 'Priority' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                            {order.priority}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Sub-card inside Driver Assignment main card */}
<div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
  <div className="flex justify-between items-center mb-2">
    <div>
      <p className="font-semibold">Driver: John Doe</p>
      <p className="text-sm text-gray-500">Order: #12345</p>
    </div>
    <div className="flex space-x-4">
      <button onClick={() => handleBarcodeClick("12345")}>
        <BarcodeIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
      </button>
      <XIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
    </div>
  </div>
  <p>Drag drivers to assign orders</p>
</div>

              </div>
             
            </div>

          {/* Right Column: Driver Performance */}
<div className="bg-white p-6 rounded-2xl shadow border">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-semibold text-gray-900">Driver Performance</h3>
    <select className="bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
      <option>Last 30 days</option>
      <option>Last 7 days</option>
    </select>
  </div>

  <ul className="space-y-3">
    {performanceDrivers.map((d) => (
      <li key={d.id} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
        <UserIcon className="w-5 h-5 text-gray-600" />
        <div>
          <p className="font-semibold">{d.name}</p>
          <p className="text-sm text-gray-600">ID: {d.id} • {d.city}</p>
          <p className="text-xs text-gray-500">Deliveries Completed: {d.completed}</p>
          <p className="text-xs text-gray-500">On-Time Rate: {d.onTime}</p>
        </div>
        <div className="flex items-center text-yellow-400">
          <span className="text-xl font-bold">{d.rating}</span>
          <span>⭐</span>
        </div>
      </li>
    ))}
  </ul>

  {/* Button now inside the card */}
  import Link from 'next/link';

<Link href="/manager/orders">
  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700">
    View Order On Map
  </button>
</Link>

</div>
          </div>

          {/* Summary Section */}

        

          {/* Barcode Modal */}
          {showBarcode && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                  onClick={() => setShowBarcode(false)}
                >
                  <XIcon className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold mb-4">{currentOrder} Barcode</h3>
                <div className="flex justify-center">
                  <Barcode value={currentOrder} />
                </div>
              </div>
            </div>
          )}

          {/* Manual Assignment Modal */}
          {showManualAssign && (
            <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold">Manual Assignment</h3>
                  <button onClick={() => setShowManualAssign(false)}>
                    <XIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Order</option>
                    <option value="order1">Order #1234</option>
                    <option value="order2">Order #5678</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Driver</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Driver</option>
                    <option value="driver1">John Doe</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Car</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Car</option>
                    <option value="car1">Car #001</option>
                  </select>
                </div>
                <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 w-full">
                  Confirm Assignment
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
  

      {/* Summary Section */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

