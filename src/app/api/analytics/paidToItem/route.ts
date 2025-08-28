import { NextResponse } from "next/server";

export async function GET() {
  const paidToData = [
    { recipient: 'Farmer', percentage: 0 , color: '#4CAF50' },
    { recipient: 'Wholesaler', percentage:  0 , color: '#2196F3' },
    { recipient: 'Tax (VAT)', percentage: 0 , color: '#FFC107' },
    { recipient: 'Platform Fees', percentage:  0 , color: '#212B36' },
  ];
  return NextResponse.json(paidToData);
}
