import { NextResponse } from "next/server";

export async function GET() {
  const summaryUsers = [
    { id: 1, name: 'Total Users', number: " "},
    { id: 2, name: 'Drivers', number: " " },
    { id: 3, name: 'Wholesalers', number: " " },
    { id: 4, name: 'Farmers', number: " " },
  ];

  return NextResponse.json(summaryUsers);
}
