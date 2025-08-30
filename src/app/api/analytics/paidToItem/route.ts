import { NextResponse } from "next/server";

export async function GET() {
  const paidToData: any[] = [
  ];
  return NextResponse.json(paidToData);
}
