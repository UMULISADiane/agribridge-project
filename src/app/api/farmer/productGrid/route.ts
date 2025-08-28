import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    // Replace this with database call later
    const products = [
      {
        id: 1,
        image: "  ",
        title: "  ",
        description: "  ",
        time: "  ",
        price: "  ",
      },
      {
        id: 2,
        image: "  ",
        title: "  ",
        description: "  ",
        time: "  ",
        price: "  ",
      },
      {
        id: 3,
        image: "  ",
        title: "  ",
        description:
          "  ",
        time: "  ",
        price: "  ",
      },
      {
        id: 4,
        image: "  ",
        title: "  ",
        description:
          "  ",
        time: "  ",
        price: "  ",
      },
      {
        id: 5,
        image: "  ",
        title: "  ",
        description: "  ",
        time: "  ",
        price: "  ",
      },
      {
        id: 6,
        image: "  ",
        title: "  ",
        description: "  ",
        time: "  ",
        price: "  ",
      },
    ];

    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to load products" }, { status: 500 });
  }
}
