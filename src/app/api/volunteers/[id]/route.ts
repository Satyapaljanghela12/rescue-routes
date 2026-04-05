import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PATCH update volunteer status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, error: "Status is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    // Get volunteer details before updating
    const volunteer = await db.collection("users").findOne({ _id: new ObjectId(id) });
    
    if (!volunteer) {
      return NextResponse.json({ success: false, error: "Volunteer not found" }, { status: 404 });
    }

    // Update status in users collection
    await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    // Update status in volunteers collection
    await db.collection("volunteers").updateOne(
      { email: volunteer.email },
      { $set: { status, updatedAt: new Date() } }
    );

    // Send email notification if status is Approved
    if (status === "Approved") {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: volunteer.email,
            subject: "🎉 Your Volunteer Account Has Been Approved!",
            type: "volunteer-approval",
            volunteerName: volunteer.name,
          }),
        });
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
        // Don't fail the request if email fails
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return NextResponse.json({ success: false, error: "Failed to update volunteer" }, { status: 500 });
  }
}
