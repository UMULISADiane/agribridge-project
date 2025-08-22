import { NextResponse } from "next/server";

let orders = [
  { id: "AGRO-9821", destination: "Kigali, Rwanda", driverName: "Michael Chen", status: "In Transit" },
  { id: "AGRO-9822", destination: "Huye, Rwanda", driverName: "Shyaka Deric", status: "Delivered" },
  { id: "AGRO-9823", destination: "Musanze, Rwanda", driverName: "Mucyo James", status: "Pending" },
];

// GET all orders
export async function GET() {
  return NextResponse.json(orders);
}

// PUT to update an order (assign driver or change status)
export async function PUT(req: Request) {
  const { id, driverName, status } = await req.json();
  const order = orders.find(o => o.id === id);
  if (order) {
    if (driverName) order.driverName = driverName;
    if (status) order.status = status;
  }
  return NextResponse.json(order);
}
