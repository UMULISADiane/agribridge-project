import { NextResponse } from "next/server";

export async function GET() {
  const radarData = [
    { category: 'Vegetables', farmerA: 0, farmerB: 0, fullMark: 100 },
    { category: 'Fruits', farmerA: 0, farmerB: 0, fullMark: 100 },
    { category: 'Grains', farmerA: 0, farmerB: 0, fullMark: 100 },
    { category: 'Legumes', farmerA: 0, farmerB: 0, fullMark: 100 },
  ];
  return NextResponse.json(radarData);
}


