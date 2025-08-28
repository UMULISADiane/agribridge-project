import { NextResponse } from "next/server";

export async function GET() {
  const orderStatusData = [
    { status: 'Done Well', orders: 0, color: '#4CAF50' },
    { status: 'Failed', orders: 0, color: '#F44336' },
    { status: 'In Process', orders: 0, color: '#FFC107' },
  ];
  return NextResponse.json(orderStatusData);
}
