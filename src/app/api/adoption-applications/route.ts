import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all adoption applications
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const applications = await db.collection("adoption-applications")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching adoption applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST create new adoption application
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      applicantName, 
      email, 
      phone, 
      address, 
      city,
      state,
      pincode,
      animalPreference,
      experience,
      homeType,
      reason,
      status
    } = body;

    if (!applicantName || !email || !phone || !address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const application = {
      applicantName,
      email,
      phone,
      address,
      city: city || "",
      state: state || "",
      pincode: pincode || "",
      animalPreference: animalPreference || "Any",
      experience: experience || "No",
      homeType: homeType || "Apartment",
      reason: reason || "",
      status: status || "Pending",
      createdAt: new Date(),
    };

    const result = await db.collection("adoption-applications").insertOne(application);
    
    return NextResponse.json({ 
      success: true, 
      application: { ...application, _id: result.insertedId } 
    });
  } catch (error) {
    console.error("Error creating adoption application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create application" },
      { status: 500 }
    );
  }
}

// PATCH update adoption application status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, status, applicantName, email } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const result = await db.collection("adoption-applications").updateOne(
      { _id: new ObjectId(applicationId) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // Send email notification
    if (email && applicantName) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: `Adoption Application ${status} - Rescue Routes`,
          type: "adoption-status",
          applicantName,
          status,
        }),
      });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating adoption application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update application" },
      { status: 500 }
    );
  }
}
