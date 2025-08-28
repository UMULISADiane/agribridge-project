// File: src/app/api/dashboard/manualassignment/order/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return an empty array until DB integration
    const orders: any[] = [];
    
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

