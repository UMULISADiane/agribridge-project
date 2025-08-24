import { NextResponse } from "next/server";

// GET /api/account/transactions
export async function GET() {
  try {
    // Normally fetch from database
    const transactions = [
      { id: 1, title: "Maize (Corn)", price: 250, qty: 4, date: "2024-06-01", total: 1000 },
      { id: 2, title: "Tomatoes", price: 180, qty: 2, date: "2024-06-03", total: 360 },
      { id: 3, title: "Cassava", price: 120, qty: 5, date: "2024-06-05", total: 600 },
      { id: 4, title: "Yam", price: 200, qty: 2, date: "2024-06-07", total: 400 },
    ];

    return NextResponse.json({ success: true, transactions });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to load transactions" }, { status: 500 });
  }
}
