const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY!;

export async function getPaymobToken() {
  const res = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
  });
  const data = await res.json();
  return data.token;
}

// Define types at the top of the file:
type PaymobOrderItem = {
  name: string;
  amount_cents: number;
  quantity: number;
};

type PaymobBillingData = {
  apartment: string;
  email: string;
  floor: string;
  first_name: string;
  street: string;
  building: string;
  phone_number: string;
  shipping_method: string;
  postal_code: string;
  city: string;
  country: string;
  last_name: string;
  state: string;
  [key: string]: string; // for flexibility
};

export async function registerOrder(token: string, amountCents: number, items: PaymobOrderItem[]) {
  const res = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: false,
      amount_cents: amountCents,
      currency: "EGP",
      items,
    }),
  });
  const data = await res.json();
  return data.id;
}

export async function getPaymentKey(
  token: string,
  orderId: number,
  amountCents: number,
  billingData: PaymobBillingData
) {
  // Ensure all required fields are present
  const requiredFields = [
    "apartment", "email", "floor", "first_name", "street", "building", "phone_number",
    "shipping_method", "postal_code", "city", "country", "last_name", "state"
  ];
  for (const field of requiredFields) {
    if (!billingData[field]) billingData[field] = "NA";
  }
  if (!billingData.email) billingData.email = "test@example.com";
  if (!billingData.phone_number) billingData.phone_number = "+201234567890";

  const res = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token: token,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: billingData,
      currency: "EGP",
      integration_id: process.env.PAYMOB_INTEGRATION_ID,
      lock_order_when_paid: true,
      redirect_url: process.env.NEXT_PUBLIC_PAYMOB_REDIRECT_URL || "https://yourdomain.com/success"
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Paymob payment key error:", data);
    throw new Error(data.detail || "Paymob payment key request failed");
  }
  return data.token;
} 