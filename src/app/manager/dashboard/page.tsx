'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon, XIcon, BarcodeIcon } from 'lucide-react';
import Barcode from 'react-barcode';
import { CalendarDays } from "lucide-react";
import { Zap } from "lucide-react";


interface Stat { label: string; value: number; description: string; }
interface Driver { name: string; status: string; }
interface Order { id: string; route: string; eta: string; priority: string; }
interface PerformanceDriver { name: string; id: string; city: string; completed: string; onTime: string; rating: string; }
interface Assignment { driver: string; orderID: string; route: string; eta: string; }

export default function ManagerDashboard() {
  const pathname = usePathname();
  const [showManualAssign, setShowManualAssign] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');

  // Data states
  const [stats, setStats] = useState<Stat[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [performanceDrivers, setPerformanceDrivers] = useState<PerformanceDriver[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const handleBarcodeClick = (orderID: string) => {
    setCurrentOrder(orderID);
    setShowBarcode(true);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const safeJson = async (res: Response) => {
        try { return await res.json(); } 
        catch { return null; }
      };

      try {
        const [statsRes, driversRes, ordersRes, perfRes, assignRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/availabledriver'),
          fetch('/api/dashboard/pendingorders'),
          fetch('/api/dashboard/driverperfomace'),
          fetch('/api/dashboard/assignments')
        ]);

        const [statsData, driversData, ordersData, perfData, assignData] = await Promise.all([
          safeJson(statsRes),
          safeJson(driversRes),
          safeJson(ordersRes),
          safeJson(perfRes),
          safeJson(assignRes)
        ]);

        // Use fallback empty arrays if any API fails
       setStats(statsData?.data || []);
setDrivers(driversData?.data || []);
setOrders(ordersData?.data || []);           // ← fixed
setPerformanceDrivers(perfData?.data || []);
setAssignments(assignData?.data || []);


      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboard();
  }, []);

  const Footer = () => (
    <footer className="w-full bg-indigo-100 text-white py-12 px-4 font-inter rounded-t-3xl mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">© 2026 Fleet Management System. All rights reserved.</p>
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
        <aside className="w-64 bg-indigo-100  border-gray-200">
          <div className="p-6 text-xl font-bold text-green-700">Manager</div>
          <nav className="mt-6 space-y-1">
            <Link href="/manager/dashboard" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">Dashboard</Link>
            <Link href="/manager/users" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">Users</Link>
            <Link href="/manager/orders" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">Orders</Link>
            <Link href="/manager/payment-history" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">Payments</Link>
            <Link href="/manager/analytics" className="flex items-center px-6 py-3 text-sm font-medium hover:bg-green-100 text-gray-400">Analytics</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
          {/* Stats Cards */}
           <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Manage drivers, assignment and perfomance metrics.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-blue-200 p-6 rounded-2xl shadow border">
                <p className="text-white-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Driver Assignment & Pending Orders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow border">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h2 className="text-lg font-semibold">Driver Assignment</h2>
                 <button className="flex items-center gap-2 bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
  <CalendarDays className="w-5 h-5" />
  Today
</button>

                  <div className="flex space-x-4">
                    <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
        <Zap className="w-5 h-5" />
        Auto-Assignment
      </button>
                    <button className="bg-green-300 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={() => setShowManualAssign(true)}>Manual Assign</button>
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
                            <p className={`text-sm ${d.status === 'Available' ? 'text-green-500' : 'text-yellow-500'}`}>{d.status}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pending Orders */}
                  <div>
      <h4 className="text-md font-semibold text-gray-700 mb-2">Pending Orders</h4>
      <ul className="space-y-3">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending orders</p>
        ) : (
          orders.map((order) => (
            <li
              key={order.id}
              className="p-3 bg-gray-50 rounded-md flex justify-between items-start"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => console.log(order.id)}>
                  <BarcodeIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
                </button>
                <div>
                  <p className="font-bold">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.route}</p>
                  <p className="text-xs text-gray-500">ETA: {order.eta}</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  order.priority === "Priority"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {order.priority}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>

                {/* Sub-cards for assignments */}
                {assignments.map((item) => (
                  <div key={item.orderID} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-semibold">Driver: {item.driver}</p>
                        <p className="text-sm text-gray-500">Order: {item.orderID}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button onClick={() => handleBarcodeClick(item.orderID)}>
                          <BarcodeIcon className="w-5 h-5 text-green-500 hover:text-green-700" />
                        </button>
                        <XIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                      </div>
                    </div>
                    <p>Route: {item.route}</p>
                    <p>ETA: {item.eta}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>

            {/* Driver Performance */}
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
                      <span className="text-xl font-bold">{d.rating}</span>⭐
                    </div>
                  </li>
                ))}
              </ul>

              <Link href="/manager/orders">
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700">
                  View Order On Map
                </button>
              </Link>
            </div>
          </div>

          {/* Barcode Modal */}
          {showBarcode && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={() => setShowBarcode(false)}>
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
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
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
                    {orders.map(o => <option key={o.id} value={o.id}>{o.id}</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Driver</label>
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Driver</option>
                    {drivers.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
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
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
