import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const user = {
      username: data.get("username"),
      password: data.get("password"),
      role: data.get("role"),
      phone: data.get("phone"),
      idPhoto: data.get("idPhoto"), // file (handle later, e.g., upload to cloud)
      bank: data.get("bank"),
    };

    console.log("New user created:", user);

    // TODO: Save `user` to database here (MongoDB, PostgreSQL, etc.)

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
