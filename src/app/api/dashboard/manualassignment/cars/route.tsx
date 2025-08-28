// File: src/app/api/dashboard/manualassignment/cars/route.ts
import { NextResponse } from "next/server";

// Example hardcoded list of cars, replace with DB query later
const cars: any[]  = [];

export async function GET() {
  try {
    return NextResponse.json({ success: true, cars });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
