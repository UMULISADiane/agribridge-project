import { NextResponse } from 'next/server';

export async function GET() {
  const payments = [
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
    // add more records
  ];

  return NextResponse.json(payments);
}
