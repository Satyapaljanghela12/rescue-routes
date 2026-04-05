import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all donations
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    const donations = await db.collection("donations").find({}).sort({ date: -1 }).toArray();
    
    return NextResponse.json({ success: true, donations });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch donations" }, { status: 500 });
  }
}

// POST create new donation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { donorName, email, campaign, amount, paymentStatus } = body;

    if (!donorName || !email || !campaign || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const donation = {
      donorName,
      email,
      campaign,
      amount: Number(amount),
      paymentStatus: paymentStatus || "Completed",
      date: new Date(),
    };

    const result = await db.collection("donations").insertOne(donation);
    
    return NextResponse.json({ success: true, donation: { ...donation, _id: result.insertedId } });
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json({ success: false, error: "Failed to create donation" }, { status: 500 });
  }
}
