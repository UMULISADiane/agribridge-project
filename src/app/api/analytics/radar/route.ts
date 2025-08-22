import { NextResponse } from "next/server";

export async function GET() {
  const radarData = [
    { category: 'Vegetables', farmerA: 70, farmerB: 60, fullMark: 100 },
    { category: 'Fruits', farmerA: 80, farmerB: 75, fullMark: 100 },
    { category: 'Grains', farmerA: 65, farmerB: 70, fullMark: 100 },
    { category: 'Legumes', farmerA: 90, farmerB: 85, fullMark: 100 },
  ];
  return NextResponse.json(radarData);
}

