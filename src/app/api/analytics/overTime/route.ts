
import { NextResponse } from "next/server";

export async function GET() {
  const overTimeData = [
    { day: 'Mon', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Tue', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Wed', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Thu', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Fri', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Sat', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
    { day: 'Sun', ordersCompleted: 0, paymentsReleased: 0, farmerPayouts: 0 },
  ];
  return NextResponse.json(overTimeData);
}


