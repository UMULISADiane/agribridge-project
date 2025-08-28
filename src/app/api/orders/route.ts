import { NextResponse } from "next/server";

let orders: any[]  = [
 
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
