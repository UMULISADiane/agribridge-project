

'use client';
import React from 'react';
import Link from 'next/link';

const farmers = [
  {
    name: 'Grace Uwimana',
    product: 'Maize',
    weight: 1200,
    sold: 1000,
    price: 250,
    tax: 25000,
    delivery: 500,
  },
  {
    name: 'Samuel Niyonzima',
    product: 'Tomatoes',
    weight: 800,
    sold: 700,
    price: 180,
    tax: 12600,
    delivery: 700,
  },
  {
    name: 'Chantal Mukamana',
    product: 'Cassava',
    weight: 500,
    sold: 500,
    price: 120,
    tax: 6000,
    delivery: 400,
  },
  {
    name: 'Eric Mugisha',
    product: 'Yam',
    weight: 400,
    sold: 400,
    price: 200,
    tax: 8000,
    delivery: 900,
  },
];

const formatCurrency = (num: number) =>
  `$${num.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

export default function PaymentHistory() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Agribridge Payment History
      </h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Amount Transferred" amount={12500} />
          <SummaryCard title="Total from Wholesalers" amount={10000} />
          <SummaryCard title="Total Sent to Farmers (After Tax)" amount={9000} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard title="Total Tax Paid" amount={1000} />
          <SummaryCard title="Total Delivery Paid" amount={2500} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border border-gray-300 bg-white">
            <thead className="bg-blue-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Farmer</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Weight (kg)</th>
                <th className="px-4 py-2">Amount Sold</th>
                <th className="px-4 py-2">Price ($)</th>
                <th className="px-4 py-2">Amount ($)</th>
                <th className="px-4 py-2">Tax Paid ($)</th>
                <th className="px-4 py-2">Delivery Paid ($)</th>
                <th className="px-4 py-2">Net Received ($)</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((f, i) => {
                const amount = f.sold * f.price;
                const net = amount - f.tax - f.delivery;

                return (
                  <tr
                    key={i}
                    className="even:bg-gray-100 text-center text-sm md:text-base"
                  >
                    <td className="px-4 py-2 text-left font-medium">{f.name}</td>
                    <td className="px-4 py-2">{f.product}</td>
                    <td className="px-4 py-2">{f.weight}</td>
                    <td className="px-4 py-2">{f.sold}</td>
                    <td className="px-4 py-2">{f.price}</td>
                    <td className="px-4 py-2">{formatCurrency(amount)}</td>
                    <td className="px-4 py-2">{formatCurrency(f.tax)}</td>
                    <td className="px-4 py-2">{formatCurrency(f.delivery)}</td>
                    <td className="px-4 py-2 font-semibold text-green-700">
                      {formatCurrency(net)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="mt-6">
     <Link href="/manager/dashboard">
  <button className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
    ← Back to Dashboard
  </button>
</Link>

        </div>
      </div>
    </main>
  );
}

function SummaryCard({ title, amount }: { title: string; amount: number }) {
  return (
    <div className="bg-blue-100 rounded-lg p-6 shadow text-center">
      <p className="text-sm font-medium text-gray-700 mb-2">{title}</p>
      <h3 className="text-2xl font-bold text-green-600">{formatCurrency(amount)}</h3>
    </div>
  );
}