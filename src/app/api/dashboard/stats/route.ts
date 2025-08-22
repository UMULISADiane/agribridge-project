// /app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    { label: 'Total Users', value: 120, description: '↑ 4 new this month' },
    { label: 'Total Farmers', value: 45, description: '↑ 72% of fleet' },
    { label: 'Total Orders', value: 300, description: '– 28% of fleet' },
    { label: 'Payments Made', value: 155, description: '☆ 4.8+ rating' },
  ];

  // Wrap in { data: ... } so frontend fetch works
  return NextResponse.json({ data: stats });
}

