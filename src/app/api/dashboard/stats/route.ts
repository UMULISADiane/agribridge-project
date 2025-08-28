// /app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    { label: 'Total Users',  },
    { label: 'Total Farmers', },
    { label: 'Total Orders',  },
    { label: 'Payments Made' },
  ];

  // Wrap in { data: ... } so frontend fetch works
  return NextResponse.json({ data: stats });
}

