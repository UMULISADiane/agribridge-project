import { NextResponse } from "next/server";

// Example pending orders
const pendingOrders = [
  { id: "#ORD-5782", route: "Seattle, WA → Portland, OR", eta: "Today, 2:30 PM", priority: "Priority" },
  { id: "#ORD-5781", route: "San Francisco, CA → San Jose, CA", eta: "Today, 4:15 PM", priority: "Standard" },
  { id: "#ORD-5780", route: "Miami, FL → Orlando, FL", eta: "Today, 6:00 PM", priority: "Standard" },
];

export async function GET() {
  return NextResponse.json({ data: pendingOrders });
}


