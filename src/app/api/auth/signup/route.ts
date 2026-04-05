import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set status based on role
    // Volunteers need admin approval, others are active immediately
    const status = role === "volunteer" ? "Pending" : "Approved";

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // If volunteer, also add to volunteers collection for admin management
    if (role === "volunteer") {
      await db.collection("volunteers").insertOne({
        name,
        email,
        phone,
        status: "Pending",
        createdAt: new Date(),
      });
    }

    return NextResponse.json(
      { 
        message: role === "volunteer" 
          ? "Signup successful! Your account is pending admin approval. You'll receive an email once approved."
          : "User created successfully",
        userId: result.insertedId,
        role,
        status,
        requiresApproval: role === "volunteer"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
