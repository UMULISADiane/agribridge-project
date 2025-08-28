// File: src/app/api/dashboard/availabledriver/route.ts
import { NextResponse } from "next/server";

const availableDrivers: any[]  = [];

export async function GET() {
  return NextResponse.json({ data: availableDrivers });
}

