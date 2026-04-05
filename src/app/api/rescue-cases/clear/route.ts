import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// DELETE all rescue cases (use with caution - for development only)
export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    // Delete all rescue cases
    const result = await db.collection("rescue-cases").deleteMany({});
    
    return NextResponse.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} rescue cases`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("Error clearing rescue cases:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear rescue cases" },
      { status: 500 }
    );
  }
}
