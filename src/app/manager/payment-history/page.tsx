'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type FarmerPayment = {
  id: number;
  name: string;
  product?: string;
  weight?: number;
  sold?: number;
  price?: number;
  tax?: number;
  delivery?: number;
  amount?: number; // for summary list
};

type SummaryItem = {
  title: string;
  amount?: number;
};
const defaultSummary: SummaryItem[] = [
  { title: "Total Amount Transferred" },
  { title: "Total from Wholesalers" },
  { title: "Total Sent to Farmers (After Tax)" },
  { title: "Total Tax Paid" },
  { title: "Total Delivery Paid" },
];



const formatCurrency = (num?: number) =>
  num !== undefined ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 0 })}` : '-';

export default function PaymentHistory() {
  const [payments, setPayments] = useState<FarmerPayment[]>([]);
  const [summary, setSummary] = useState<SummaryItem[]>(defaultSummary);
useEffect(() => {
  fetch('/api/payment-history')
    .then(res => res.json())
    .then((data) => {
      const payments: FarmerPayment[] = data.payments || [];

      // Calculate totals
    const totalTransferred =
  payments.reduce(
    (sum, f: FarmerPayment) => sum + ((f.sold || 0) * (f.price || 0)),
    0
  );

const totalTax =
  payments.reduce((sum, f: FarmerPayment) => sum + (f.tax || 0), 0);

const totalDelivery =
  payments.reduce((sum, f: FarmerPayment) => sum + (f.delivery || 0), 0);

const totalToFarmers = totalTransferred - totalTax - totalDelivery;


      setPayments(payments);
      setSummary([
        { title: "Total Amount Transferred", amount: totalTransferred },
        { title: "Total from Wholesalers", amount: data.summary?.[1]?.amount || 0 },
        { title: "Total Sent to Farmers (After Tax)", amount: totalToFarmers },
        { title: "Total Tax Paid", amount: totalTax },
        { title: "Total Delivery Paid", amount: totalDelivery },
      ]);
    })
    .catch(console.error);
}, []);


  return (
       <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
  <header className="bg-[#1C2340] text-white py-6 shadow-lg w-full">
        <h1 className="text-3xl font-bold text-center">Agribridge Payment History</h1>
      </header>
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
       <div className="mt-6">
        <Link href="/manager/dashboard">
          <button className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Summary Cards */}
       <div className="bg-white rounded-xl shadow-lg p-10 space-y-8">
      <div className="p-8 max-w-6xl mx-auto">
      <div className=" bg-gray grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {summary.map((item, idx) => (
          <div key={idx} className="bg-blue-200 p-4 shadow rounded-lg text-center">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-green-600 font-bold text-xl">{formatCurrency(item.amount)}</p>
          </div>
        ))}
      </div>

     

      {/* Payments Table */}
      <div className="overflow-x-auto rounded-lg shadow mb-6">
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
            {payments.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  No payments available
                </td>
              </tr>
            ) : (
              payments.map((f, i) => {
                const amount = (f.sold || 0) * (f.price || 0);
                const net = amount - (f.tax || 0) - (f.delivery || 0);
                return (
                  <tr key={i} className="even:bg-gray-100 text-center text-sm md:text-base">
                    <td className="px-4 py-2 text-left font-medium">{f.name || '-'}</td>
                    <td className="px-4 py-2">{f.product || '-'}</td>
                    <td className="px-4 py-2">{f.weight || '-'}</td>
                    <td className="px-4 py-2">{f.sold || 0}</td>
                    <td className="px-4 py-2">{f.price || 0}</td>
                    <td className="px-4 py-2">{formatCurrency(amount)}</td>
                    <td className="px-4 py-2">{formatCurrency(f.tax || 0)}</td>
                    <td className="px-4 py-2">{formatCurrency(f.delivery || 0)}</td>
                    <td className="px-4 py-2 font-semibold text-green-700">{formatCurrency(net)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
     
      </div>
      </div>
    
     
  
  
    </main>
      <footer className="w-full bg-[#1C2340] text-white py-12 px-4 font-inter rounded-t-3xl mt-12">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">© 2026 Fleet Management System. All rights reserved.</p>
        <p className="font-bold text-green-700">
          Our mission is to optimize fleet operations and improve driver efficiency.
        </p>
      </div>
    </footer>
    </div>
     
  );
}



