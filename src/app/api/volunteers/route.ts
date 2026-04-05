import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all volunteers (only approved ones for assignment)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyApproved = searchParams.get("approved") === "true";

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const query = onlyApproved ? { status: "Approved" } : {};
    const volunteers = await db.collection("users")
      .find({ role: "volunteer", ...query })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, volunteers });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch volunteers" }, { status: 500 });
  }
}
