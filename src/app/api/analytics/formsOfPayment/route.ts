import { NextResponse } from "next/server";

export async function GET() {
  const formsOfPaymentData = [
    { role: 'Farmers', card: 0, googlePay: 0, moMo: 0, cash: 0 },
    { role: 'Wholesalers', card: 0, googlePay: 0, moMo: 0, cash: 0 },
  ];
  return NextResponse.json(formsOfPaymentData);
}
