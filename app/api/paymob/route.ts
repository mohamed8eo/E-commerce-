import { NextRequest, NextResponse } from "next/server";
import { getPaymobToken, registerOrder, getPaymentKey } from "@/lib/paymob";

export async function POST(req: NextRequest) {
  const { cart, billingData } = await req.json();
  const amountCents = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) * 100;

  const token = await getPaymobToken();
  const orderId = await registerOrder(token, amountCents, cart.map((item: any) => ({
    name: item.name,
    amount_cents: item.price * 100,
    quantity: item.quantity,
  })));
  const paymentKey = await getPaymentKey(token, orderId, amountCents, billingData);

  // Redirect user to Paymob iframe
  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
  return NextResponse.json({ url: iframeUrl });
} 