import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB with timeout handling
    let client;
    try {
      client = await Promise.race([
        clientPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database connection timeout')), 10000)
        )
      ]) as any;
    } catch (connectionError) {
      console.error("MongoDB connection error:", connectionError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again." },
        { status: 503 }
      );
    }

    const db = client.db("rescue-routes");
    const usersCollection = db.collection("users");

    // Find user
    const user = await usersCollection.findOne({ email, role });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if volunteer account is approved
    if (role === "volunteer" && user.status === "Pending") {
      return NextResponse.json(
        { error: "Your account is pending admin approval. You'll receive an email once approved." },
        { status: 403 }
      );
    }

    // Check if account is rejected
    if (user.status === "Rejected") {
      return NextResponse.json(
        { error: "Your account has been rejected. Please contact admin for more information." },
        { status: 403 }
      );
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "Login successful",
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
