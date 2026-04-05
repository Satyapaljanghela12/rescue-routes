import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET - Fetch all rescue alerts
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const alerts = await db.collection("rescue-alerts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, alerts });
  } catch (error) {
    console.error("Error fetching rescue alerts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch alerts" },
      { status: 500 }
    );
  }
}

// POST - Create new rescue alert OR accept alert by volunteer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if this is an accept request
    if (body.action === "accept" && body.alertId && body.volunteerId) {
      const { alertId, volunteerId, volunteerName, volunteerEmail, volunteerPhone } = body;
      
      const client = await clientPromise;
      const db = client.db("rescue-routes");
      
      // Add volunteer to the alert's acceptedVolunteers array
      const result = await db.collection("rescue-alerts").updateOne(
        { _id: new ObjectId(alertId) },
        {
          $addToSet: {
            acceptedVolunteers: {
              volunteerId,
              volunteerName,
              volunteerEmail,
              volunteerPhone,
              acceptedAt: new Date(),
            }
          }
        }
      );
      
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { success: false, error: "Alert not found" },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true });
    }
    
    // Otherwise, create new alert
    const { title, animalType, location, description, urgency, contactPerson, contactPhone } = body;

    if (!title || !animalType || !location || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const alert = {
      title,
      animalType,
      location,
      description,
      urgency: urgency || "Medium",
      contactPerson: contactPerson || "",
      contactPhone: contactPhone || "",
      status: "Active",
      acceptedVolunteers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("rescue-alerts").insertOne(alert);

    return NextResponse.json({
      success: true,
      alertId: result.insertedId,
    });
  } catch (error) {
    console.error("Error in rescue alert operation:", error);
    return NextResponse.json(
      { success: false, error: "Operation failed" },
      { status: 500 }
    );
  }
}

// DELETE - Delete rescue alert
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Alert ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const result = await db.collection("rescue-alerts").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting rescue alert:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete alert" },
      { status: 500 }
    );
  }
}
