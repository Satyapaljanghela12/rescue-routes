import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all memberships
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const memberships = await db.collection("memberships")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, memberships });
  } catch (error) {
    console.error("Error fetching memberships:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch memberships" },
      { status: 500 }
    );
  }
}

// POST create new membership
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      country,
      state,
      city,
      address,
      pincode,
      membershipType,
      amount,
      status,
      paymentId,
      orderId
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !membershipType || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    // Create membership
    const result = await db.collection("memberships").insertOne({
      name,
      email,
      phone,
      country,
      state,
      city,
      address,
      pincode,
      membershipType,
      amount,
      status: status || "Active",
      paymentId: paymentId || null,
      orderId: orderId || null,
      emailSent: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Membership created successfully",
        membershipId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create membership" },
      { status: 500 }
    );
  }
}

// PATCH update membership (for email sent status)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { membershipId, emailSent } = body;

    if (!membershipId) {
      return NextResponse.json(
        { success: false, error: "Membership ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const { ObjectId } = require("mongodb");

    const result = await db.collection("memberships").updateOne(
      { _id: new ObjectId(membershipId) },
      { 
        $set: { 
          emailSent: emailSent !== undefined ? emailSent : true,
          emailSentAt: new Date(),
          updatedAt: new Date() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Membership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Membership updated successfully",
    });
  } catch (error) {
    console.error("Error updating membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update membership" },
      { status: 500 }
    );
  }
}

// DELETE membership
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Membership ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const { ObjectId } = require("mongodb");

    const result = await db.collection("memberships").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Membership not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Membership deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting membership:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete membership" },
      { status: 500 }
    );
  }
}
