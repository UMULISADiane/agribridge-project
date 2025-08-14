

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Define the type for a paidToData item
interface PaidToItem {
  recipient: string;
  percentage: number;
  color: string;
}

// Define the type for UserType data
interface UserTypeItem {
  type: string;
  count: number;
  color: string;
}

// Define the type for FormsOfPayment data
interface FormsOfPaymentItem {
  role: string;
  card: number;
  googlePay: number;
  moMo: number;
  cash: number;
}

// Define the type for OverTime data
interface OverTimeItem {
  day: string;
  ordersCompleted: number;
  paymentsReleased: number;
  farmerPayouts: number;
}

// Define the type for OrderStatus data
interface OrderStatusItem {
  status: string;
  orders: number;
  color: string;
}

// Define the type for Radar data
interface RadarItem {
  category: string;
  farmerA: number;
  farmerB: number;
  fullMark: number;
}

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
        <p className="font-semibold text-gray-800">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Bar Charts (including stacked bar)
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Correctly get the data for the stacked bar chart
    const dataEntry = payload[0].payload;
    const total = dataEntry.card + dataEntry.googlePay + dataEntry.moMo + dataEntry.cash;

    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${((entry.value / total) * 100).toFixed(1)}%)`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const tabs = ['Paid To', 'User Types', 'Payment Forms', 'Over Time', 'Order Status', 'Radar'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [visibleDataIndex, setVisibleDataIndex] = useState(-1);

  useEffect(() => {
    if (activeTab === 'Payment Forms') {
      setVisibleDataIndex(-1);
      const timer1 = setTimeout(() => {
        setVisibleDataIndex(0);
      }, 500);
      const timer2 = setTimeout(() => {
        setVisibleDataIndex(1);
      }, 1500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [activeTab]);

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex]);
  };

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[newIndex]);
  };

  // Data for the 'Paid To' tab (Donut Chart and Table)
  const paidToData: PaidToItem[] = [
    { recipient: 'Farmer', percentage: 60, color: '#4CAF50' },
    { recipient: 'Wholesaler', percentage: 20, color: '#2196F3' },
    { recipient: 'Tax (VAT)', percentage: 10, color: '#FFC107' },
    { recipient: 'Platform Fees', percentage: 10, color: '#212B36' },
  ];

  // Data for the 'User Types' tab (Bar Chart and Table)
  const userTypeData: UserTypeItem[] = [
    { type: 'Farmers', count: 200, color: '#4CAF50' },
    { type: 'Wholesalers', count: 50, color: '#2196F3' },
    { type: 'Admins', count: 5, color: '#FFC107' },
    { type: 'Drivers', count: 30, color: '#212B36' },
  ];

  // Data for 'Forms of Payment' (Stacked Bar Chart and Table)
  const formsOfPaymentData: FormsOfPaymentItem[] = [
    { role: 'Farmers', card: 80, googlePay: 40, moMo: 60, cash: 20 },
    { role: 'Wholesalers', card: 30, googlePay: 10, moMo: 20, cash: 15 },
  ];

  // Data for the 'Over Time' tab (Line Chart and Table)
  const overTimeData: OverTimeItem[] = [
    { day: 'Mon', ordersCompleted: 32, paymentsReleased: 30, farmerPayouts: 28 },
    { day: 'Tue', ordersCompleted: 41, paymentsReleased: 38, farmerPayouts: 36 },
    { day: 'Wed', ordersCompleted: 39, paymentsReleased: 36, farmerPayouts: 34 },
    { day: 'Thu', ordersCompleted: 47, paymentsReleased: 45, farmerPayouts: 43 },
    { day: 'Fri', ordersCompleted: 52, paymentsReleased: 50, farmerPayouts: 48 },
    { day: 'Sat', ordersCompleted: 61, paymentsReleased: 59, farmerPayouts: 57 },
    { day: 'Sun', ordersCompleted: 58, paymentsReleased: 55, farmerPayouts: 53 },
  ];

  // Data for the 'Order Status' tab (Horizontal Bar Chart and Table)
  const orderStatusData: OrderStatusItem[] = [
    { status: 'Done Well', orders: 120, color: '#4CAF50' },
    { status: 'Failed', orders: 15, color: '#F44336' },
    { status: 'In Process', orders: 30, color: '#FFC107' },
  ];

  // Data for the 'Radar' tab (Radar Chart and Table)
  const radarData: RadarItem[] = [
    { category: 'Payout', farmerA: 80, farmerB: 70, fullMark: 100 },
    { category: 'Delivery Time', farmerA: 70, farmerB: 80, fullMark: 100 },
    { category: 'Satisfaction', farmerA: 90, farmerB: 85, fullMark: 100 },
    { category: 'Quality', farmerA: 85, farmerB: 80, fullMark: 100 },
    { category: 'Reliability', farmerA: 75, farmerB: 80, fullMark: 100 },
  ];

  const visibleFormsOfPaymentData = formsOfPaymentData.slice(0, visibleDataIndex + 1);

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-indigo-900 text-white py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">AgriConnect Analytics</h1>
      </header>

      <nav className="bg-white shadow-md mt-0">
        <div className="container mx-auto px-4 py-3 flex justify-center space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area: A single flex container to center the card */}
      <div className="flex-grow p-4 flex items-center justify-center">
        {/* The single, main card container */}
        <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl">
          
          {/* Navigation Arrows placed inside the card */}
          <button
            onClick={goToPreviousTab}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors duration-200 z-10"
          >
            <ArrowLeftIcon className="h-6 w-8" />
          </button>
          
          <button
            onClick={goToNextTab}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors duration-200 z-10"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>

          {/* Conditional rendering for each tab's content */}
          {activeTab === 'Paid To' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Percentage of Total Amount Paid To</h2>
              <div className="flex flex-col items-center justify-center h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paidToData}
                      dataKey="percentage"
                      nameKey="recipient"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                    >
                      {paidToData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage (%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paidToData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.recipient}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.percentage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'User Types' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">User Types and Count</h2>
              <div className="flex flex-col items-center justify-center h-[28rem]">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={userTypeData}
                    margin={{
                      top: 20, right: 50, left: 50, bottom: 20,
                    }}
                  >
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8">
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Count
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userTypeData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Payment Forms' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Forms of Payment Used by Who</h2>
              <div className="flex flex-col items-center mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={visibleFormsOfPaymentData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend />
                    <Bar dataKey="card" stackId="a" fill="#4CAF50" name="Card" />
                    <Bar dataKey="googlePay" stackId="a" fill="#2196F3" name="Google Pay" />
                    <Bar dataKey="moMo" stackId="a" fill="#FFC107" name="MoMo" />
                    <Bar dataKey="cash" stackId="a" fill="#212B36" name="Cash" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Card
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Google Pay
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MoMo
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cash
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visibleFormsOfPaymentData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.card}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.googlePay}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.moMo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.cash}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Over Time' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Orders & Payments Over Time</h2>
              <div className="flex flex-col items-center mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={overTimeData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ordersCompleted" stroke="#4CAF50" name="Orders Completed" strokeWidth={2} />
                    <Line type="monotone" dataKey="paymentsReleased" stroke="#2196F3" name="Payments Released" strokeWidth={2} />
                    <Line type="monotone" dataKey="farmerPayouts" stroke="#FFC107" name="Farmer Payouts" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders Completed
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payments Released
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer Payouts
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {overTimeData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.day}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.ordersCompleted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.paymentsReleased}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.farmerPayouts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Order Status' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Orders by Status</h2>
              <div className="flex flex-col items-center mb-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={orderStatusData}
                    layout="vertical"
                    margin={{
                      top: 40, right: 30, left: 100, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="status" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8">
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderStatusData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.orders}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'Radar' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Multi-category Comparison (Radar)</h2>
              <div className="flex flex-col items-center mb-6 h-[32rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} margin={{ top: 200, right: 20, left: 30, bottom: 5 }}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[10, 100]} />
                    <Radar name="Farmer A" dataKey="farmerA" stroke="#cbe2f5ff" fill="#ccdfeeff" fillOpacity={0.3} />
                    <Radar name="Farmer B" dataKey="farmerB" stroke="#a8e6aaff" fill="#99d39bff" fillOpacity={0.3} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        KPI
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer A
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer B
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {radarData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.farmerA}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.farmerB}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

           {/* Navigation Dots at the bottom of the card */}
           <div className="mt-8 flex justify-center items-center space-x-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to ${tab} chart`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}