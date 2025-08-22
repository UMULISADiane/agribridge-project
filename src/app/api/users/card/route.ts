import { NextResponse } from "next/server";

export async function GET() {
  const summaryUsers = [
    { id: 1, name: 'Total Users', number: 9 },
    { id: 2, name: 'Drivers', number: 3 },
    { id: 3, name: 'Wholesalers', number: 2 },
    { id: 4, name: 'Farmers', number: 4 },
  ];

  return NextResponse.json(summaryUsers);
}
