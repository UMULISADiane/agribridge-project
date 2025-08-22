// File: src/app/api/dashboard/availabledriver/route.ts
import { NextResponse } from "next/server";

const availableDrivers = [
  { name: "Emily Rodriguez", status: "Available" },
  { name: "Michael Chen", status: "on-break" },
  { name: "Mugisha Eddy", status: "Available" },
];

export async function GET() {
  return NextResponse.json({ data: availableDrivers });
}

