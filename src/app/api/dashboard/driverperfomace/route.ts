// File: src/app/api/dashboard/driverperfomace/route.ts
import { NextResponse } from "next/server";

const performanceDrivers = [
  { name: "Emily Rodriguez", id: "DRV-0042", city: "San Francisco", completed: "96%", onTime: "92%", rating: "4.9" },
  { name: "Michael Chen", id: "DRV-0038", city: "Seattle", completed: "94%", onTime: "89%", rating: "4.8" },
  { name: "Mugisha Eddy", id: "DRV-0050", city: "Portland", completed: "91%", onTime: "85%", rating: "4.7" },
];

export async function GET() {
  return NextResponse.json({ data: performanceDrivers });
}


