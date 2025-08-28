import { NextResponse } from "next/server";

export async function GET() {
 const userTypeData = [
    { type: 'Farmers', count:  0 , color: '#4CAF50' },
    { type: 'Wholesalers', count:  0 , color: '#2196F3' },
    { type: 'Admins', count: 0 , color: '#FFC107' },
    { type: 'Drivers', count:  0 , color: '#212B36' },
  ];
  return NextResponse.json(userTypeData);
}

