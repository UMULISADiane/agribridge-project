'use client';
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
  PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, CartesianGrid
} from 'recharts';

// === TYPES ===
interface PaidToItem { recipient: string; percentage: number; color: string; }
interface UserTypeItem { type: string; count: number; color: string; }
interface FormsOfPaymentItem { role: string; card: number; googlePay: number; moMo: number; cash: number; }
interface OverTimeItem { day: string; ordersCompleted: number; paymentsReleased: number; farmerPayouts: number; }
interface OrderStatusItem { status: string; orders: number; color: string; }
interface RadarItem { category: string; farmerA: number; farmerB: number; fullMark: number; }

// === CUSTOM TOOLTIPS ===
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
        <p className="font-semibold text-gray-800">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    const dataEntry = payload[0].payload;
    const total = dataEntry.card + dataEntry.googlePay + dataEntry.moMo + dataEntry.cash;
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${((entry.value / total) * 100).toFixed(1)}%)`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// === MAIN COMPONENT ===
export default function AnalyticsPage() {
  const tabs = ['Paid To', 'User Types', 'Payment Forms', 'Over Time', 'Order Status', 'Radar'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [visibleDataIndex, setVisibleDataIndex] = useState(-1);

  // === STATE FOR API DATA ===
  const [paidToData, setPaidToData] = useState<PaidToItem[]>([]);
  const [userTypeData, setUserTypeData] = useState<UserTypeItem[]>([]);
  const [formsOfPaymentData, setFormsOfPaymentData] = useState<FormsOfPaymentItem[]>([]);
  const [overTimeData, setOverTimeData] = useState<OverTimeItem[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusItem[]>([]);
  const [radarData, setRadarData] = useState<RadarItem[]>([]);

useEffect(() => {
  fetch('/api/analytics/paidToItem').then(res => res.json()).then(setPaidToData).catch(console.error);
  fetch('/api/analytics/userTypes').then(res => res.json()).then(setUserTypeData).catch(console.error);
  fetch('/api/analytics/formsOfPayment').then(res => res.json()).then(setFormsOfPaymentData).catch(console.error);
  fetch('/api/analytics/overTime').then(res => res.json()).then(setOverTimeData).catch(console.error);
  fetch('/api/analytics/orderStatus').then(res => res.json()).then(setOrderStatusData).catch(console.error);
  fetch('/api/analytics/radar').then(res => res.json()).then(setRadarData).catch(console.error);
}, []);


  // === ANIMATION FOR PAYMENT FORMS ===
  useEffect(() => {
    if (activeTab === 'Payment Forms') {
      setVisibleDataIndex(-1);
      const timers = formsOfPaymentData.map((_, i) =>
        setTimeout(() => setVisibleDataIndex(i), (i + 1) * 500)
      );
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [activeTab, formsOfPaymentData]);

  const visibleFormsOfPaymentData = formsOfPaymentData.slice(0, visibleDataIndex + 1);

  // === NAVIGATION HANDLERS ===
  const goToPreviousTab = () => {
    const newIndex = (tabs.indexOf(activeTab) - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[newIndex]);
  };
  const goToNextTab = () => {
    const newIndex = (tabs.indexOf(activeTab) + 1) % tabs.length;
    setActiveTab(tabs[newIndex]);
  };

  // === RENDER ===
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-indigo-900 text-white py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">AgriConnect Analytics</h1>
      </header>

      {/* TABS */}
      <nav className="bg-white shadow-md mt-0">
        <div className="container mx-auto px-4 py-3 flex justify-center space-x-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CARD */}
      <div className="flex-grow p-4 flex items-center justify-center">
        <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-5xl">

          {/* NAV ARROWS */}
          <button onClick={goToPreviousTab} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 z-10">
            <ArrowLeftIcon className="h-6 w-8" />
          </button>
          <button onClick={goToNextTab} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 z-10">
            <ArrowRightIcon className="h-6 w-6" />
          </button>

          {/* === CONDITIONAL TAB CONTENT === */}
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
                      cx="50%" cy="50%"
                      innerRadius={80} outerRadius={100}
                      paddingAngle={5}
                    >
                      {paidToData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'User Types' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">User Types and Count</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={userTypeData}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8">
                    {userTypeData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'Payment Forms' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Forms of Payment Used by Who</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={visibleFormsOfPaymentData}>
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
          )}

          {activeTab === 'Over Time' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Orders & Payments Over Time</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={overTimeData}>
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
          )}

          {activeTab === 'Order Status' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Orders by Status</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={orderStatusData} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="status" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8">
                    {orderStatusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'Radar' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Multi-category Comparison (Radar)</h2>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData} >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Farmer A" dataKey="farmerA" stroke="#cbe2f5ff" fill="#ccdfeeff" fillOpacity={0.3} />
                  <Radar name="Farmer B" dataKey="farmerB" stroke="#a8e6aaff" fill="#99d39bff" fillOpacity={0.3} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* NAVIGATION DOTS */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  activeTab === tab ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
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
