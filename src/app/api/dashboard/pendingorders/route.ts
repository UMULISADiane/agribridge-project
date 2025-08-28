import { NextResponse } from "next/server";

// Start with no pending orders
const pendingOrders: any[] = []; 

export async function GET() {
  return NextResponse.json({ data: pendingOrders });
}


