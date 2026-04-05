import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all rescue cases
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const rescueCases = await db.collection("rescue-cases").find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, rescueCases, cases: rescueCases });
  } catch (error) {
    console.error("Error fetching rescue cases:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch rescue cases" }, { status: 500 });
  }
}

// POST create new rescue case
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      animalType, 
      location, 
      description, 
      medicalUpdates, 
      assignedVolunteer, 
      volunteerName,
      volunteerEmail,
      volunteerPhone,
      status,
      alertId
    } = body;

    if (!animalType || !location || !description) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const rescueCase = {
      animalType,
      location,
      description,
      medicalUpdates: medicalUpdates || "",
      assignedVolunteer: assignedVolunteer || "Unassigned",
      volunteerName: volunteerName || "",
      volunteerEmail: volunteerEmail || "",
      volunteerPhone: volunteerPhone || "",
      status: status || "In Treatment",
      alertId: alertId || null,
      createdAt: new Date(),
    };

    const result = await db.collection("rescue-cases").insertOne(rescueCase);
    
    return NextResponse.json({ success: true, case: { ...rescueCase, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating rescue case:", error);
    return NextResponse.json({ success: false, error: "Failed to create rescue case" }, { status: 500 });
  }
}

// PATCH update rescue case status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { caseId, status } = body;

    if (!caseId || !status) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const result = await db.collection("rescue-cases").updateOne(
      { _id: new ObjectId(caseId) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Rescue case not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating rescue case:", error);
    return NextResponse.json({ success: false, error: "Failed to update rescue case" }, { status: 500 });
  }
}
