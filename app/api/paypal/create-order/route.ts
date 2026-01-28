import { NextResponse } from "next/server";
export const runtime = "nodejs";

function getBaseUrl() {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const r = await fetch(`${origin}/api/paypal/access-token`, { method: "POST" });
  const j = await r.json();
  if (!j.access_token) throw new Error("No access token");
  return j.access_token as string;
}

export async function POST(req: Request) {
  try {
    const { price, currency, productName } = await req.json();
    const baseUrl = getBaseUrl();
    const accessToken = await getAccessToken();

    const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: productName,
            amount: { currency_code: currency, value: String(price) },
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "create_order_failed", details: data }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (e: any) {
    return NextResponse.json({ error: "server_error", message: e?.message }, { status: 500 });
  }
}
