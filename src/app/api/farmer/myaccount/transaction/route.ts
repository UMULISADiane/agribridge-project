import { NextResponse } from "next/server";

// GET /api/account/transactions
export async function GET() {
  try {
    // Normally fetch from database
    const transactions: any[] = [
      // product from my account
     
    ];

    return NextResponse.json({ success: true, transactions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to load transactions" }, { status: 500 });
  }
}
