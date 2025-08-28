import { NextResponse } from "next/server";

export async function GET() {
  const users: any[]  = [
    //add list of user here
  ];

  return NextResponse.json(users);
}
