import { NextResponse } from "next/server";

const assignments: any[]  = [
 
];

export async function GET() {
  try {
    return NextResponse.json({ data: assignments }); // <-- MUST have "data"
  } catch (err) {
    console.error(err);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}


