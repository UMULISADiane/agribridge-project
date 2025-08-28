// File: src/app/api/dashboard/driverperfomace/route.ts
import { NextResponse } from "next/server";

const performanceDrivers: any[]  = [];

export async function GET() {
  return NextResponse.json({ data: performanceDrivers });
}


