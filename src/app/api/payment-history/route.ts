// src/app/api/payments/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const totalTax = 0;
  const totalDelivery = 0;

  const payments: any[] = [];

  const summary = [
    { title: "Total Amount Transferred", amount: 0 },
    { title: "Total from Wholesalers", amount: 0 }, // 👈 hardcoded example
    { title: "Total Sent to Farmers (After Tax)", amount: 0 },
    { title: "Total Tax Paid", amount: totalTax },
    { title: "Total Delivery Paid", amount: totalDelivery },
  ];

  return NextResponse.json(
    { success: true, payments, summary },
    { headers: { "Cache-Control": "no-store" } }
  );
}

