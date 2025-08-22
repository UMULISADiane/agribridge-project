// Example: src/app/api/analytics/overTime/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const overTimeData = [
    { day: 'Mon', ordersCompleted: 32, paymentsReleased: 30, farmerPayouts: 28 },
    { day: 'Tue', ordersCompleted: 41, paymentsReleased: 38, farmerPayouts: 36 },
    { day: 'Wed', ordersCompleted: 39, paymentsReleased: 36, farmerPayouts: 34 },
    { day: 'Thu', ordersCompleted: 47, paymentsReleased: 45, farmerPayouts: 43 },
    { day: 'Fri', ordersCompleted: 52, paymentsReleased: 50, farmerPayouts: 48 },
    { day: 'Sat', ordersCompleted: 61, paymentsReleased: 59, farmerPayouts: 57 },
    { day: 'Sun', ordersCompleted: 58, paymentsReleased: 55, farmerPayouts: 53 },
  ];
  return NextResponse.json(overTimeData);
}

