import { NextResponse } from "next/server";

export async function GET() {
  const formsOfPaymentData: any[] = [
    
  ];
  return NextResponse.json(formsOfPaymentData);
}
