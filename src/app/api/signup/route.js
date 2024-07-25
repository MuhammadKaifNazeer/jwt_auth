import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

dbConnect();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the JWT token as a cookie
    const response = NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 },
    );
  }
}
