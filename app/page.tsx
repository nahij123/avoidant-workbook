"use client";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function Home() {
  // 기본값(나중에 .env로 바꿔도 됨)
  const productName =
    process.env.NEXT_PUBLIC_PRODUCT_NAME ?? "Avoidant Attachment Recovery Workbook";
  const currency = process.env.NEXT_PUBLIC_CURRENCY ?? "USD";
  const price = process.env.NEXT_PUBLIC_PRICE_USD ?? "19.00";

  // PayPal은 지금 “버튼이 뜨는지”만 확인용 (이미 됐으니, 디자인 먼저)
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

  const [status, setStatus] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  const nav = useMemo(
    () => [
      { id: "overview", label: "Home" },
      { id: "inside", label: "Inside" },
      { id: "foryou", label: "For you" },
      { id: "faq", label: "FAQ" },
      { id: "buy", label: "Buy" },
    ],
    []
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // PayPal SDK 로드 (버튼 영역을 “살아있게” 유지)
  useEffect(() => {
    if (!clientId) return; // clientId 없으면 디자인만 보여주고 결제는 나중에
    const scriptId = "paypal-sdk";
    if (document.getElementById(scriptId)) {
      setSdkReady(true);
      return;
    }
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(
      clientId
    )}&currency=${encodeURIComponent(currency)}`;
    s.async = true;
    s.onload = () => setSdkReady(true);
    s.onerror = () => setStatus("Failed to load PayPal SDK (adblock/network?)");
    document.body.appendChild(s);
  }, [clientId, currency]);

  // PayPal 버튼 렌더 (API 3개 파일이 있으니 결제도 됨)
  useEffect(() => {
    if (!clientId) return;
    if (!sdkReady) return;
    if (!window.paypal) return;

    const container = document.getElementById("paypal-buttons");
    if (!container) return;
    if (container.childNodes.length > 0) return;

    window.paypal
      .Buttons({
        style: { layout: "vertical", shape: "rect", label: "paypal" },
        createOrder: async () => {
          setStatus("Creating order…");
          const r = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price, currency, productName }),
          });
          const j = await r.json();
          if (!j?.id) {
            console.log("create-order response:", j);
            throw new Error("No order id");
          }
          setStatus("");
          return j.id;
        },
        onApprove: async (data: any) => {
          setStatus("Capturing payment…");
          const r = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID }),
          });
          const j = await r.json();
          if (j?.status === "COMPLETED") setStatus("Payment completed ✅ (delivery next)");
          else {
            setStatus("Payment not completed (check console).");
            console.log("capture-order response:", j);
          }
        },
        onError: (err: any) => {
          console.error(err);
          setStatus("PayPal error (check console).");
        },
      })
      .render("#paypal-buttons");
  }, [clientId, sdkReady, currency, price, productName]);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#fbfaf7]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <button onClick={() => scrollTo("overview")} className="group flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-zinc-900/70 group-hover:bg-zinc-900" />
            <span className="text-sm font-semibold tracking-tight">NAHIJ</span>
          </button>

          <nav className="hidden items-center gap-4 md:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("buy")}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Buy · {currency} {price}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        {/* Hero */}
        <section id="overview" className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500">
              DIGITAL WORKBOOK
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
              {productName}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-700">
              A warm, structured workbook for people who pull away when closeness feels too much.
              No shame. No labels. Just clarity and practice.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["PDF", "Self-paced", "Gentle prompts", "Practical scripts"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-zinc-200 bg-white/60 px-3 py-1 text-xs text-zinc-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo("buy")}
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Get the workbook
              </button>
              <button
                onClick={() => scrollTo("inside")}
                className="rounded-2xl border border-zinc-300 bg-white/70 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-white"
              >
                See what’s inside
              </button>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              Educational content only. Not medical advice.
            </p>
          </div>

          {/* Warm card */}
          <div className="rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-sm">
            <div className="text-sm font-semibold">A small promise</div>
            <p className="mt-3 text-sm leading-6 text-zinc-700">
              You don’t have to become “someone else.” You’ll learn to recognize your patterns,
              regulate your body, and choose one small step toward secure connection.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                ["Pattern map", "Name the loop."],
                ["Trigger tracker", "Body → thought → action."],
                ["Regulation tools", "Calm without forcing."],
                ["Scripts", "What to say instead."],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="rounded-2xl border border-zinc-200 bg-[#fbfaf7] p-4"
                >
                  <div className="text-sm font-semibold">{a}</div>
                  <div className="mt-1 text-sm text-zinc-700">{b}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-zinc-600">Price</span>
                <span className="text-lg font-semibold">
                  {currency} {price}
                </span>
              </div>
              <button
                onClick={() => scrollTo("buy")}
                className="mt-4 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Go to checkout
              </button>
            </div>
          </div>
        </section>

        {/* Inside */}
        <section id="inside" className="mt-14">
          <h2 className="text-xl font-semibold">What’s inside</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">
            Built like a calm studio session: simple, repeatable, and honest.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["The Avoidant Loop Map", "Spot your most common cycle and what it protects."],
              ["Trigger & Body Worksheet", "Track sensation → emotion → story → behavior."],
              ["Regulation Routines", "Short sequences for shutdown, anxiety, and numbness."],
              ["Connection Scripts", "Gentle sentences to stay present instead of disappearing."],
              ["30+ Prompts", "Journaling without spiraling."],
              ["14-Day Plan", "Micro-steps you can actually complete."],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-sm"
              >
                <div className="text-sm font-semibold">{title}</div>
                <div className="mt-2 text-sm text-zinc-700">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* For you */}
        <section id="foryou" className="mt-14">
          <h2 className="text-xl font-semibold">For you</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-sm">
              <div className="text-sm font-semibold">This is for you if…</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• You go quiet when things get emotionally close</li>
                <li>• You “know what to do” but can’t do it in the moment</li>
                <li>• You want structure, not vague advice</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-sm">
              <div className="text-sm font-semibold">This is not for you if…</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• You need crisis support (please seek local professionals)</li>
                <li>• You want a diagnosis or therapy replacement</li>
                <li>• You want instant fixes without practice</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white/70 p-5">
            <div className="text-sm font-semibold">Tone & ethics</div>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              This is educational content. It’s designed to help you notice patterns and choose
              kinder, steadier responses — not to label you.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-14">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            {[
              ["Is this therapy?", "No. It’s a self-guided workbook. It can complement therapy, not replace it."],
              ["How do I receive it?", "We’ll add automatic download/email delivery once the PDF is ready."],
              ["Can I use it on mobile?", "Yes. It’s designed for phone/tablet/desktop."],
              ["Refunds?", "We’ll add a clear policy before launch (important for digital products)."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-3xl border border-zinc-200 bg-white/75 p-5 shadow-sm">
                <div className="text-sm font-semibold">{q}</div>
                <div className="mt-2 text-sm text-zinc-700">{a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Buy */}
        <section id="buy" className="mt-14">
          <div className="rounded-3xl border border-zinc-200 bg-white/75 p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Checkout</h2>
                <p className="mt-1 text-sm text-zinc-700">
                  {currency} {price} · PayPal
                </p>
              </div>
              <div className="text-right text-sm text-zinc-600">{status ? status : "Ready"}</div>
            </div>

            <div className="mt-5 max-w-md">
              {!clientId ? (
                <div className="rounded-2xl border border-zinc-200 bg-[#fbfaf7] p-4 text-sm text-zinc-700">
                  PayPal 연결은 되어있지만, 지금은 디자인 먼저 보는 중이라 버튼을 숨겼어.
                  나중에 `.env.local`의 `NEXT_PUBLIC_PAYPAL_CLIENT_ID`가 있으면 버튼이 자동으로 보여.
                </div>
              ) : (
                <div id="paypal-buttons" />
              )}

              <p className="mt-3 text-xs text-zinc-500">
                Educational content only. Not medical advice.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t pt-6 text-xs text-zinc-500">
  <div className="flex flex-wrap gap-4 justify-center">
    <a href="/terms" className="hover:text-zinc-900">Terms</a>
    <a href="/privacy" className="hover:text-zinc-900">Privacy</a>
    <a href="/refunds" className="hover:text-zinc-900">Refunds</a>
    <span>© {new Date().getFullYear()} Avoidant Workbook</span>
  </div>
</footer>
      </main>
    </div>
  );
}

