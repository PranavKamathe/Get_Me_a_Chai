import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const POST = async (req) => {
  await connectDb();

  // If your client sends JSON
  const body = await req.json();

  // Find the payment by order id
  const payment = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!payment) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  // Fetch the secret of the user receiving the payment
  const user = await User.findOne({ username: payment.to_user });
  const secret = user.razorpaysecret;

  // Verify payment
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (isValid) {
    // Update payment status
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({ success: false, message: "Payment Verification Failed" });
  }
};
