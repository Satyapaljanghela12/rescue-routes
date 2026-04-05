import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorData, membershipData } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const client = await clientPromise;
      const db = client.db("rescue-routes");
      
      // If it's a donation
      if (donorData) {
        const donation = {
          donorName: donorData.name,
          email: donorData.email,
          phone: donorData.phone,
          campaign: donorData.campaign,
          amount: donorData.amount,
          paymentStatus: "Completed",
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          date: new Date(),
        };

        await db.collection("donations").insertOne(donation);
      }
      
      // If it's a membership (handled separately in membership page)
      // Just verify the payment, membership will be saved by the calling code

      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ success: false, error: "Failed to verify payment" }, { status: 500 });
  }
}
