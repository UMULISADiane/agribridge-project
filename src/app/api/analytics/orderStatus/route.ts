import { NextResponse } from "next/server";

export async function GET() {
  const orderStatusData: any[] = [
   
  ];
  return NextResponse.json(orderStatusData);
}
