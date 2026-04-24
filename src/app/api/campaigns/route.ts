import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all campaigns
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const campaigns = await db.collection("campaigns").find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({ success: true, campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

// POST create new campaign
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, targetAmount, startDate, endDate, address, image } = body;

    if (!title || !description || !targetAmount || !startDate || !endDate) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const campaign = {
      title,
      description,
      targetAmount: Number(targetAmount),
      raisedAmount: 0,
      startDate,
      endDate,
      address: address || "",
      image: image || "/About1.jpg",
      createdAt: new Date(),
    };

    const result = await db.collection("campaigns").insertOne(campaign);
    
    return NextResponse.json({ success: true, campaign: { ...campaign, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json({ success: false, error: "Failed to create campaign" }, { status: 500 });
  }
}

// DELETE campaign
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Campaign ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const result = await db.collection("campaigns").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    return NextResponse.json({ success: false, error: "Failed to delete campaign" }, { status: 500 });
  }
}

// PUT update campaign
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Campaign ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, targetAmount, startDate, endDate, address, image } = body;

    if (!title || !description || !targetAmount || !startDate || !endDate) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const updateData = {
      title,
      description,
      targetAmount: Number(targetAmount),
      startDate,
      endDate,
      address: address || "",
      image: image || "/About1.jpg",
      updatedAt: new Date(),
    };

    const result = await db.collection("campaigns").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, campaign: { ...updateData, _id: id } });
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json({ success: false, error: "Failed to update campaign" }, { status: 500 });
  }
}
