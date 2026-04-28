import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const stories = await db.collection("stories").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, stories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subtitle, description, beforeImage, afterImage } = body;
    if (!name || !description || !beforeImage) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const result = await db.collection("stories").insertOne({
      name, subtitle, description, beforeImage, afterImage: afterImage || null,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true, storyId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create story" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { storyId, name, subtitle, description, beforeImage, afterImage } = body;
    if (!storyId) return NextResponse.json({ success: false, error: "Story ID required" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const update: any = { updatedAt: new Date() };
    if (name) update.name = name;
    if (subtitle !== undefined) update.subtitle = subtitle;
    if (description) update.description = description;
    if (beforeImage) update.beforeImage = beforeImage;
    if (afterImage !== undefined) update.afterImage = afterImage;
    await db.collection("stories").updateOne({ _id: new ObjectId(storyId) }, { $set: update });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update story" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    await db.collection("stories").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete story" }, { status: 500 });
  }
}
