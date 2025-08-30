import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
    }

    // TODO: Process the image (OCR, QR code, or save to DB/cloud)
    // Here we simulate returning a new transaction for demonstration
    const scannedTransaction = {
      id: Math.floor(Math.random() * 1000),
      title: "Scanned Product",
      price: 500,
      qty: 1,
      date: new Date().toISOString().split("T")[0],
      total: 500,
    };

    return NextResponse.json({ success: true, transaction: scannedTransaction });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Scan failed" }, { status: 500 });
  }
}
