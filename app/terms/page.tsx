export default function Page() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-zinc-600">Operator: Avoidant Workbook · Support: nahijsupport@gmail.com</p>
        <p className="mt-1 text-xs text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-6 text-base leading-7">
          <section>
            <h2 className="text-xl font-semibold">1) Overview</h2>
            <p>
              These Terms govern your access to this website and your purchase and use of any digital product
              (the “Product”). By purchasing, downloading, or using the Product, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2) Digital Product & Delivery</h2>
            <p>
              The Product is delivered digitally (e.g., PDF). No physical items are shipped. Delivery may occur via a
              download link, a confirmation page, email, or another method described at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3) License (Personal Use Only)</h2>
            <p>
              Your purchase grants you a limited, non-exclusive, non-transferable license for personal, non-commercial
              use only. You may not resell, redistribute, share, upload, publicly post, or otherwise make the Product
              available to others (including via file-sharing services, shared drives, or “send to a friend”).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4) No Professional Advice</h2>
            <p>
              The Product is educational and informational content. It is not medical, psychological, psychiatric,
              legal, or other professional advice, and it is not a substitute for therapy, diagnosis, or treatment.
              If you are in crisis or need urgent help, seek immediate assistance from local professionals or emergency
              services in your area.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5) Payments</h2>
            <p>
              Payments are processed by third-party providers (e.g., PayPal, Paddle). We do not store your full payment
              details. Your purchase may be subject to the payment provider’s terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6) Refunds</h2>
            <p>
              Please review our Refund Policy for details. Because the Product is digital and delivered instantly, all
              sales are generally final once access is provided, except in limited cases such as duplicate charges or
              a technical failure we cannot resolve.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7) Intellectual Property</h2>
            <p>
              All materials included in the Product (text, worksheets, templates, design, branding) are owned by the
              operator and protected by intellectual property laws. No rights are granted except as expressly stated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8) Disclaimer of Warranties</h2>
            <p>
              The website and Product are provided “as is” and “as available.” We do not guarantee results, outcomes,
              or uninterrupted availability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">9) Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the Product or website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">10) Changes</h2>
            <p>
              We may update these Terms from time to time. The latest version will be posted on this page with an
              updated “Last updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">11) Contact</h2>
            <p>Support: nahijsupport@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}
