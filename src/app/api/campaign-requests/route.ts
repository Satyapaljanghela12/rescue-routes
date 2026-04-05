import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - Fetch all campaign participation requests
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const requests = await db.collection("campaign-requests")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching campaign requests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

// POST - Create new campaign participation request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, campaignTitle, volunteerId, volunteerName, volunteerEmail, volunteerPhone } = body;

    if (!campaignId || !campaignTitle || !volunteerId || !volunteerName || !volunteerEmail) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const participationRequest = {
      campaignId,
      campaignTitle,
      volunteerId,
      volunteerName,
      volunteerEmail,
      volunteerPhone: volunteerPhone || "",
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await db.collection("campaign-requests").insertOne(participationRequest);

    return NextResponse.json({
      success: true,
      requestId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating campaign request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create request" },
      { status: 500 }
    );
  }
}

// PATCH - Update campaign request status (approve/reject)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId, status, volunteerEmail, volunteerName, campaignTitle } = body;

    if (!requestId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const result = await db.collection("campaign-requests").updateOne(
      { _id: new ObjectId(requestId) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    // If approved, send email to volunteer
    if (status === "Approved" && volunteerEmail) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: volunteerEmail,
          subject: "Campaign Participation Approved - Rescue Routes",
          type: "campaign-approval",
          campaignTitle,
          volunteerName,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating campaign request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update request" },
      { status: 500 }
    );
  }
}
