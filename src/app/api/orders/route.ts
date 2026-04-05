import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all orders or filter by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("rescue-routes");
    
    const query = email ? { email } : {};
    
    const orders = await db.collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      firstName,
      lastName,
      company,
      country,
      streetAddress,
      apartment,
      city,
      state,
      pinCode,
      phone,
      email,
      orderNotes,
      productId, 
      productName, 
      productPrice,
      quantity,
      size,
      paymentMethod,
      razorpayPaymentId,
      razorpayOrderId,
      paymentStatus
    } = body;

    if (!firstName || !lastName || !email || !phone || !streetAddress || !city || !state || !pinCode || !country || !productId || !productName || !productPrice || !quantity || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const totalAmount = Number(productPrice) * Number(quantity);

    // Construct full address
    const fullAddress = `${streetAddress}${apartment ? ', ' + apartment : ''}, ${city}, ${state} - ${pinCode}, ${country}`;

    const result = await db.collection("orders").insertOne({
      firstName,
      lastName,
      userName: `${firstName} ${lastName}`,
      company: company || null,
      country,
      streetAddress,
      apartment: apartment || null,
      city,
      state,
      pinCode,
      phone,
      email,
      orderNotes: orderNotes || null,
      address: fullAddress,
      productId,
      productName,
      productPrice: Number(productPrice),
      quantity: Number(quantity),
      size: size || null,
      totalAmount,
      paymentMethod,
      razorpayPaymentId: razorpayPaymentId || null,
      razorpayOrderId: razorpayOrderId || null,
      paymentStatus: paymentStatus || (paymentMethod === "COD" ? "Pending" : "Paid"),
      status: "Pending",
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        orderId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// DELETE order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const result = await db.collection("orders").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

// PATCH update order status and tracking
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, trackingId, courierName, estimatedDeliveryDate } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rescue-routes");

    const updateData: any = {};
    if (status) updateData.status = status;
    if (trackingId !== undefined) updateData.trackingId = trackingId;
    if (courierName !== undefined) updateData.courierName = courierName;
    if (estimatedDeliveryDate !== undefined) updateData.estimatedDeliveryDate = estimatedDeliveryDate;
    updateData.updatedAt = new Date();

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}
