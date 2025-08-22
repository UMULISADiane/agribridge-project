import { NextResponse } from "next/server";

const assignments = [
  { driver: "John Doe", orderID: "#12345", route: "Seattle → Portland", eta: "Today, 2:30 PM" },
];

export async function GET() {
  try {
    return NextResponse.json({ data: assignments }); // <-- MUST have "data"
  } catch (err) {
    console.error(err);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}


