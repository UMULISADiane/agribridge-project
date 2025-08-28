import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
const user = {
  username: data.get("username"),
  password: data.get("password"),
  confirmpassword: data.get("confirmpassword"), // ✅ match the actual field name
  role: data.get("role"),
  phone: data.get("phone"),
  idPhoto: data.get("idPhoto"), // will need special handling if it’s a File
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
