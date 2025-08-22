import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: 1, name: 'Jean Uwimana', role: 'Farmer' },
    { id: 2, name: 'Amina Kabera', role: 'Buyer' },
    { id: 3, name: 'Eric Dusabe', role: 'Manager' },
    { id: 4, name: 'Grace Uwase', role: 'Driver' },
    { id: 5, name: 'Pauline Mukamana', role: 'Wholesaler' },
    { id: 6, name: 'John Smith', role: 'Farmer' },
    { id: 7, name: 'Mary Jane', role: 'Buyer' },
    { id: 8, name: 'Peter John', role: 'Driver' },
    { id: 9, name: 'Alice Mukasa', role: 'Manager' },
  ];

  return NextResponse.json(users);
}
