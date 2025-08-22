import { NextResponse } from "next/server";

export async function GET() {
 const userTypeData = [
    { type: 'Farmers', count: 200, color: '#4CAF50' },
    { type: 'Wholesalers', count: 50, color: '#2196F3' },
    { type: 'Admins', count: 5, color: '#FFC107' },
    { type: 'Drivers', count: 30, color: '#212B36' },
  ];
  return NextResponse.json(userTypeData);
}
