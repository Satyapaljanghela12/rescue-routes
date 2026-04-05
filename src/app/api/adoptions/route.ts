import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all adoptions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const adoptions = await db.collection("adoptions").find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, adoptions });
  } catch (error) {
    console.error("Error fetching adoptions:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch adoptions" }, { status: 500 });
  }
}

// POST create new adoption listing
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { animalName, animalType, age, breed, gender, description, medicalHistory, image, status } = body;

    if (!animalName || !animalType || !age || !gender) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const adoption = {
      animalName,
      animalType,
      age,
      breed: breed || "Mixed",
      gender,
      description: description || "",
      medicalHistory: medicalHistory || "",
      image: image || "/dog1.png",
      status: status || "Available",
      applicants: 0,
      createdAt: new Date(),
    };

    const result = await db.collection("adoptions").insertOne(adoption);
    
    return NextResponse.json({ success: true, adoption: { ...adoption, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating adoption:", error);
    return NextResponse.json({ success: false, error: "Failed to create adoption" }, { status: 500 });
  }
}

// DELETE adoption
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { adoptionId } = body;

    if (!adoptionId) {
      return NextResponse.json({ success: false, error: "Adoption ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const result = await db.collection("adoptions").deleteOne({ _id: new ObjectId(adoptionId) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Adoption not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Adoption deleted successfully" });
  } catch (error) {
    console.error("Error deleting adoption:", error);
    return NextResponse.json({ success: false, error: "Failed to delete adoption" }, { status: 500 });
  }
}
