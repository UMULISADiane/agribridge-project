import { NextResponse } from "next/server";

// GET /api/products
export async function GET() {
  try {
    // Replace this with database call later
    const products = [
      {
        id: 1,
        image: "/image/tomatoes.png",
        title: "Tomatoes",
        description: "Our platform makes it easy to list, sell, and ship your tomatoes",
        time: "harvested: 25 May",
        price: "1000/kg",
      },
      {
        id: 2,
        image: "/image/maize.png",
        title: "Maize",
        description: "High-quality maize, perfect for food and feed.",
        time: "harvested: 25 May",
        price: "800 RWF",
      },
      {
        id: 3,
        image: "/image/pome.png",
        title: "Apples",
        description:
          "Partner with us to grow your business and find the perfect market for every apple harvest",
        time: "harvested: 25 May",
        price: "2000 RWF",
      },
      {
        id: 4,
        image: "/image/mangoes.png",
        title: "Mangoes",
        description:
          "Connect directly with buyers and build your brand as a trusted supplier of premium mangoes",
        time: "harvested: 25 May",
        price: "1000 RWF",
      },
      {
        id: 5,
        image: "/image/carrots.png",
        title: "Carrots",
        description: "Fresh and crunchy carrots for your table",
        time: "harvested: 25 May",
        price: "700/kg",
      },
      {
        id: 6,
        image: "/image/onions.png",
        title: "Onions",
        description: "Get the best possible price for your onions and eliminate waste",
        time: "harvested: 25 May",
        price: "1500/kg",
      },
    ];

    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to load products" }, { status: 500 });
  }
}
