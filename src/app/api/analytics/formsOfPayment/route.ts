import { NextResponse } from "next/server";

export async function GET() {
  const formsOfPaymentData = [
    { role: 'Farmers', card: 80, googlePay: 40, moMo: 60, cash: 20 },
    { role: 'Wholesalers', card: 30, googlePay: 10, moMo: 20, cash: 15 },
  ];
  return NextResponse.json(formsOfPaymentData);
}
